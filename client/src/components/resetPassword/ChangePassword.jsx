import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChangePassword.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { userPasswordChange } from "../../features/resetPasswordSlice";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { status, errorMessage } = useSelector(
    (state) => state.resetPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messageSuccess, setMessageSuccess] = useState("");
  const [error, setError] = useState("");

  // Separate toggle states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleUpdate = () => {
    if (!newPassword) {
      toast.error("New password is required");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(userPasswordChange({ formData: { password: newPassword, confirmPassword }, token }));
  };

  const goToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setMessageSuccess("Passwords match");
        setError("");
      } else {
        setMessageSuccess("");
        setError("Passwords do not match");
      }
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Password changed successfully");
      setMessageSuccess("Password changed successfully");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [status, errorMessage]);

  return (
    <div className="change-password-wrapper1">
      <div className="change-password-container1">
        <h2 className="change-password-heading">PASSWORD RESET</h2>
        <div className="change-password-wrapper2">
          <div className="change-password-container2">
            
            {/* New Password */}
            <div className="change-password-menu">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span className="show-password" onClick={toggleNewPassword}>
                  {showNewPassword ? <BsEyeSlash size={20} /> : <IoEyeOutline size={20} />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="change-password-menu">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="show-password" onClick={toggleConfirmPassword}>
                  {showConfirmPassword ? <BsEyeSlash size={20} /> : <IoEyeOutline size={20} />}
                </span>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {messageSuccess && <p className="success-message">{messageSuccess}</p>}

            {status !== "fulfilled" && (
              <button className="update-btn" onClick={handleUpdate}>
                Submit
              </button>
            )}

            {status === "fulfilled" && (
              <p className="alternate-login" onClick={goToLogin}>
                Login
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
