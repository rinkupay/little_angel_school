// ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, adminDetails } = useSelector((state) => state.user);

  const data = adminDetails?.user || {};

  useEffect(() => {
    if (!isLoggedIn || !adminDetails) {
      navigate("/");
    } 
     if (data?.isEmailVerified === false) {
      navigate("/verify-email");
    }
  }, [isLoggedIn, adminDetails, data?.isEmailVerified, navigate]);

  return children;
};

export default ProtectedRoute;
