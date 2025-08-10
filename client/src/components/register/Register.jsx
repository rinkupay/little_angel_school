import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { registerUser } from "../../features/userRegisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadAdmin } from '../../features/userSlice';
import { BsEyeSlash } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.registerUser);

  const verifyPassCode = "WES123";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passCode, setPassCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassCode, setShowPassCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !mobile || !password || !passCode) {
      toast.error("All fields are required");
      return;
    }

    if (passCode !== verifyPassCode) {
      toast.error("Please enter a valid passcode");
      return;
    }

    const registrationData = {
      userName,
      email,
      mobile,
      password,
      passCode,
    };

    await dispatch(registerUser(registrationData));
    navigate('/');
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(loadAdmin());
    }
  }, [status, dispatch]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className='register-heading'>Register Admin</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="register-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div className="register-form-group password-input">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsEyeSlash size={20} /> : <IoEyeOutline size={20} />}
          </span>
        </div>

        <div className="register-form-group password-input">
          <label htmlFor="passcode">Passcode:</label>
          <input
            type={showPassCode ? "text" : "password"}
            id="passcode"
            value={passCode}
            onChange={(e) => setPassCode(e.target.value)}
            required
          />
          <span
            className="show-password"
            onClick={() => setShowPassCode(!showPassCode)}
          >
            {showPassCode ? <BsEyeSlash size={20} /> : <IoEyeOutline size={20} />}
          </span>
        </div>

        <button type="submit" className="register-button">Register</button>
        <div className="login-redirect">
          <p>Already have an account? <span onClick={() => navigate('/')}>Login</span></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
