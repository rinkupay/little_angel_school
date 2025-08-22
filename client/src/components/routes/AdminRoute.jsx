// AdminRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, adminDetails } = useSelector((state) => state.user);

  const data = adminDetails?.user || {};

  useEffect(() => {
    if (!isLoggedIn || !adminDetails) {
      navigate("/");
    } else if (data?.isEmailVerified === false) {
      navigate("/verify-email");
    } else if (data?.role !== "admin" && data?.role !== "super") {
      navigate(`/profile/${data?._id}`);
      toast.error("Access denied");
    }
  }, [isLoggedIn, adminDetails, data?.isEmailVerified, data?.role, navigate]);

  return children;
};

export default AdminRoute;
