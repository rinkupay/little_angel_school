import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAdmin } from "../../features/userSlice";
import "./VerifyEmail.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailVerify() {
  const { isLoggedIn, adminDetails } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);

  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(""); // "success" | "error" | ""

  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  // Prefill email from store
  useEffect(() => {
    if (isLoggedIn && adminDetails?.user?.email) {
      setEmail(adminDetails.user.email);
    }
  }, [isLoggedIn, adminDetails]);

  // Cooldown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const otp = useMemo(() => otpDigits.join(""), [otpDigits]);
  const canSend = useMemo(
    () => EMAIL_RE.test(email) && !sending && cooldown === 0,
    [email, sending, cooldown]
  );

  // ---- Helpers ----
  function setUserMessage(type, text) {
    setVariant(type);
    setMessage(text);
  }

  async function parseJsonSafe(res) {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }

  // ---- Send OTP ----
  async function handleSendOtp() {
    setUserMessage("", "");
    if (!EMAIL_RE.test(email)) {
      setUserMessage("error", "Please enter a valid email address.");
      return;
    }
    if (!baseUrl) {
      setUserMessage("error", "API base URL is not configured.");
      return;
    }
    if (!canSend) return;

    setSending(true);
    try {
      const res = await fetch(`${baseUrl}/api/v1/send-otp-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        const errMsg =
          data?.message ||
          data?.error ||
          `Failed to send OTP (status ${res.status}).`;
        setUserMessage("error", errMsg);
        return;
      }

      // success
      setOtpDigits(Array(6).fill(""));
      setOtpSent(true);
      setUserMessage("success", data?.message || "OTP sent to your email.");
      // Prefer server-provided cooldown if present (seconds)
      const serverCooldown =
        Number(data?.cooldownSeconds ?? data?.retryAfter ?? 0) || 30;
      setCooldown(serverCooldown);
    } catch {
      setUserMessage("error", "Network error. Please try again.");
    } finally {
      if (mountedRef.current) setSending(false);
    }
  }

  // ---- Verify OTP ----
  async function handleVerifyOtp() {
    setUserMessage("", "");
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setUserMessage("error", "Please enter the 6-digit OTP.");
      return;
    }
    if (!baseUrl) {
      setUserMessage("error", "API base URL is not configured.");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch(`${baseUrl}/api/v1/verify-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), otp }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        const errMsg =
          data?.message ||
          data?.error ||
          (res.status === 400 ? "Invalid or expired OTP." : "Verification failed.");
        setUserMessage("error", errMsg);
        return;
      }

      setUserMessage("success", data?.message || "Email verified successfully!");
      // Load admin and navigate
      dispatch(loadAdmin());
      navigate("/dashboard");
    } catch {
      setUserMessage("error", "Network error. Please try again.");
    } finally {
      if (mountedRef.current) setVerifying(false);
    }
  }

  // ---- OTP input UX (boxes) ----
  function handleOtpChange(idx, val) {
    const v = val.replace(/\D/g, "").slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
    if (v && idx < 5) {
      const nextEl = document.getElementById(`otp-${idx + 1}`);
      nextEl?.focus();
    }
  }

  function handleOtpKeyDown(idx, e) {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      const prevEl = document.getElementById(`otp-${idx - 1}`);
      prevEl?.focus();
    }
  }

  function handleOtpPaste(e) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const arr = Array(6)
      .fill("")
      .map((_, i) => text[i] ?? "");
    setOtpDigits(arr);
    // focus last filled
    const last = Math.min(text.length - 1, 5);
    const el = document.getElementById(`otp-${Math.max(last, 0)}`);
    el?.focus();
    e.preventDefault();
  }

  return (
    <div className="ev-container">
      <div className="ev-card" role="region" aria-label="Email verification">
        <h2 className="ev-title">Verify Your Email</h2>
        <p className="ev-subtitle">
          Enter your email to receive a one-time passcode (OTP).
        </p>

        <div className="ev-input">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={email ? !EMAIL_RE.test(email) : false}
          />
          <div className="ev-hint">
            {email
              ? EMAIL_RE.test(email)
                ? cooldown > 0
                  ? `You can resend OTP in ${cooldown}s.`
                  : "Ready to send OTP."
                : "Please enter a valid email."
              : "We’ll send an OTP to this address."}
          </div>
        </div>

        <button
          className="ev-button"
          onClick={handleSendOtp}
          disabled={!canSend}
          aria-disabled={!canSend}
        >
          {sending ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
        </button>

        {otpSent && (
          <>
            <div className="ev-divider" />
            <div className="ev-input">
              <label htmlFor="otp-0">Enter OTP</label>
              <div
                className="ev-otp-inputs"
                onPaste={handleOtpPaste}
                role="group"
                aria-label="6-digit OTP"
              >
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="ev-otp-box"
                    value={d}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  />
                ))}
              </div>
              <div className="ev-hint">Didn’t get it? Check spam.</div>
            </div>

            <button
              className="ev-button ev-verify"
              onClick={handleVerifyOtp}
              disabled={verifying || otp.length !== 6}
              aria-disabled={verifying || otp.length !== 6}
            >
              {verifying ? "Verifying…" : "Verify OTP"}
            </button>

            <button
              className="ev-resend"
              onClick={handleSendOtp}
              disabled={!canSend}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
            </button>
          </>
        )}

        {message && (
          <div
            className={`ev-message ${variant || "info"}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
