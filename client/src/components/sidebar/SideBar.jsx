import  { Fragment } from "react";
import "./SideBar.css";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboardCustomize } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoMdPersonAdd } from "react-icons/io";
import { logoutAdmin } from "../../features/userSlice";
import { IoStatsChart } from "react-icons/io5";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { TbTransactionRupee } from "react-icons/tb";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { TbSettingsDollar } from "react-icons/tb";
import { HiInformationCircle } from "react-icons/hi";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaPeopleArrows } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { logout } from "../../features/userSlice";
import { BsRepeat } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbHomeCog } from "react-icons/tb";

const SideBar = ({ setIsMenu }) => {
  const { adminDetails } = useSelector((state) => state.user);
  const data = adminDetails?.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToDueReport = () => {
    navigate("/due-reports");
    setIsMenu(false);
  };
  const goToProfile = () => {
    navigate(`/profile/${data._id}`);
    setIsMenu(false);
  };

  const goToStudentReport = () => {
    navigate("/student-reports");
    setIsMenu(false);
  };
  const goToEmailSmsSettings = () => {
    navigate("/email-sms-settings");
    setIsMenu(false);
  };
  const handlePasswordCgange = () => {
    navigate(`/password-change/${data._id}`);
    setIsMenu(false);
  };



  const logoutUser = async () => {
   await dispatch(logoutAdmin());
   await dispatch(logout());
  };

  const handleStudentEnquiry = () => {
    navigate("/student-enquiry")
    setIsMenu(false);
  };
  const handleNewAdmission = () => {
    navigate("/register-student")
    setIsMenu(false);
  };
  const handleSearchStudent = () => {
    navigate("/search-student")
    setIsMenu(false);
  };
  const handleActiveStudent = () => {
    navigate("/students-active")
    setIsMenu(false);
  };

  const handlePromote = () => {
    navigate("/student-progression")
    setIsMenu(false);
  };
  const handleTransaction = () => {
    navigate("/transaction")
    setIsMenu(false);
  };
  const handleTransactionRollback = () => {
    navigate("/transaction-rollback")
    setIsMenu(false);
  };
  const handleStatics = () => {
    navigate("/statistics")
    setIsMenu(false);
  };
  const handleAddTeacher = () => {
    navigate("/add-teacher")
    setIsMenu(false);
  };
  const handleAllTeacher = () => {
    navigate("/teachers")
    setIsMenu(false);
  };
  const handleAllTeacherTransaction = () => {
    navigate("/teacher-transactions")
    setIsMenu(false);
  };
  const handleAllAdmins = () => {
    navigate("/all-admins")
    setIsMenu(false);
  };
  const handleFeeSettings = () => {
    navigate("/fee-settings")
    setIsMenu(false);
  };
    const handleSchoolDetails = () => {
    navigate(`/school-details`);
    setIsMenu(false);
  };
  const handleActivation = () => {
    navigate("/emp-activation")
    setIsMenu(false);
  };
  const handleSectionShift = () => {
    navigate("/section-shift")
    setIsMenu(false);
  };
  const handleFinancialReport = () => {
    navigate("/financial-report")
    setIsMenu(false);
  };

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <div className="sidebar-heading">
          <MdDashboardCustomize size={20} />{" "}
          <p className="sidebar-heading-head">DASHBOARD</p>
        </div>

        <div className="sidebar-menues">
          <p className="menu-title module">Statistics</p>
          <p
            className="sidebar-menu"
            // to="/statistics"
            onClick={handleStatics}
          >
            <IoStatsChart size={20} /> <p className="menu-title">Statistics</p>
          </p>

          <p className="menu-title module">Student Module </p>
          <p
            className="sidebar-menu"
            // to="/student-enquiry"
            onClick={handleStudentEnquiry}
          >
            <HiInformationCircle size={20} />{" "}
            <p className="menu-title">Student Enquiry </p>
          </p>

          <p
            className="sidebar-menu"
            // to="/register-student"
            onClick={handleNewAdmission}
          >
            <IoMdPersonAdd size={20} />{" "}
            <p className="menu-title">New Admisson </p>
          </p>

          <p
            className="sidebar-menu"
            // to="/search-student"
            onClick={handleSearchStudent}
          >
            <BiSearchAlt2 size={20} />{" "}
            <p className="menu-title">Search Student </p>
          </p>

          <p
            className="sidebar-menu"
            // to="/students-active"
            onClick={handleActiveStudent}
          >
            <FaPeopleGroup size={20} />{" "}
            <p className="menu-title">All Students </p>
          </p>

          <p
            className="sidebar-menu"
            // to="/transaction"
            onClick={handleTransaction}
          >
            <GrTransaction size={20} />{" "}
            <p className="menu-title">Transactions</p>
          </p>

          <p
            className="sidebar-menu"
            // to="/transaction-rollback"
            onClick={handleTransactionRollback}
          >
            <MdOutlineSettingsBackupRestore size={20} />{" "}
            <p className="menu-title">Roll Back Payment</p>
          </p>

          <p className="menu-title module">Progression Module</p>
          <p
            className="sidebar-menu"
            // to="/student-progression"
            onClick={handlePromote}
          >
            <FaPeopleArrows size={20} />{" "}
            <p className="menu-title">Student Progression</p>
          </p>

          {/* SECTION SHIFT */}
          <p
            className="sidebar-menu"
            // to="/section-shift"
            onClick={handleSectionShift}
          >
            <BsRepeat size={20} /> <p className="menu-title">Section Shift</p>
          </p>

          <p className="menu-title module">Generate Report</p>

          {/* REPORT NAVIGATION */}
          <SimpleTreeView sx={{ fontSize: "6.2rem" }}>
            <TreeItem
              itemId="grid"
              label="Reports"
              sx={{ fontSize: "1.2rem", color: "white", margin: "12px" }}
            >
              <TreeItem
                itemId="grid-community"
                label="Due Fees"
                onClick={goToDueReport}
                sx={{ fontSize: "1.2rem", color: "white", margin: "10px" }}
              />

              <TreeItem
                itemId="grid-student-repo"
                label="Student Reports"
                onClick={goToStudentReport}
                sx={{ fontSize: "1.2rem", color: "white", margin: "10px" }}
              />

              <TreeItem
                itemId="grid-student-fin-repo"
                label="Financial Reports"
                onClick={handleFinancialReport}
                sx={{ fontSize: "1.2rem", color: "white", margin: "10px" }}
              />



            </TreeItem>
          </SimpleTreeView>

          {/* <NavLink
            className="sidebar-menu"
            to="/financial-report"
            onClick={handleFinancialReport}
          >
            <PiChalkboardTeacherThin size={20} />{" "}
            <p className="menu-title">Financial Report</p>
          </NavLink> */}

          <p className="menu-title module">Employee Module</p>

          <p
            className="sidebar-menu"
            // to="/add-teacher"
            onClick={handleAddTeacher}
          >
            <PiChalkboardTeacherThin size={20} />{" "}
            <p className="menu-title">Add Employee</p>
          </p>

          <p
            className="sidebar-menu"
            // to="/teachers"
            onClick={handleAllTeacher}
          >
            <FaChalkboardTeacher size={20} />{" "}
            <p className="menu-title">All Employees</p>
          </p>

          <p
            className="sidebar-menu"
            // to="/emp-activation"
            onClick={handleActivation}
          >
            <TbTransactionRupee size={20} />{" "}
            <p className="menu-title">Activation</p>
          </p>

          <p
            className="sidebar-menu"
            // to="/teacher-transactions"
            onClick={handleAllTeacherTransaction}
          >
            <TbTransactionRupee size={20} />{" "}
            <p className="menu-title">Payment History</p>
          </p>

          {/* ADMIN MODULE RENDER ONLY ADMIN CAN ACCESS*/}

          {data?.role === "super" && (
            <>
              <p className="menu-title module">Admin Module</p>
              <p
                className="sidebar-menu"
                // to="/all-admins"
                onClick={handleAllAdmins}
              >
                <FaChalkboardTeacher size={20} />{" "}
                <p className="menu-title">All Users</p>
              </p>
            </>
          )}

          {/* SMS AND EMAIL SETTINGS NAVIGATION */}

          {data.role === "super" ? (
            <Fragment>
              <p className="menu-title module">Settings</p>
              <SimpleTreeView sx={{ fontSize: "6.2rem" }}>
                <TreeItem
                  itemId="grid"
                  label="Email & SMS Settings"
                  sx={{ fontSize: "1.2rem", color: "white", margin: "12px" }}
                >
                  <TreeItem
                    itemId="grid-community"
                    label="Email&SMS"
                    onClick={goToEmailSmsSettings}
                    sx={{ fontSize: "1.2rem", color: "white", margin: "12px" }}
                  />
                </TreeItem>
              </SimpleTreeView>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}

          {data.role === "super" && (
            <Fragment>
              <p
                className="sidebar-menu"
                // to="/fee-settings"
                onClick={handleFeeSettings}
              >
                <TbSettingsDollar size={20} />{" "}
                <p className="menu-title">Fee Settings</p>
              </p>

              <p
                className="sidebar-menu"
                // to="/school-details"
                onClick={handleSchoolDetails}
              >
                <TbHomeCog size={20} />{" "}
                <p className="menu-title">School Settings</p>
              </p>
            </Fragment>
          )}

          <p className="menu-title module"></p>
          <SimpleTreeView sx={{ fontSize: "6.2rem" }}>
            <TreeItem
              itemId="grid"
              label="Profile Settings"
              sx={{ fontSize: "1.2rem", color: "white", margin: "8px" }}
            >
              <TreeItem
                itemId="grid-community"
                label="My Profile"
                onClick={() => goToProfile()}
              />
              <TreeItem
                itemId="password-change"
                label=" Change Password"
                onClick={() => handlePasswordCgange()}
              />
              <TreeItem itemId="logout" label="Logout" onClick={logoutUser} />
            </TreeItem>
          </SimpleTreeView>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
