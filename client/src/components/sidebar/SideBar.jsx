import { Fragment } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboardCustomize } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoMdPersonAdd } from "react-icons/io";
import { logoutAdmin, logout } from "../../features/userSlice";
import { IoStatsChart } from "react-icons/io5";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { TbTransactionRupee, TbSettingsDollar, TbHomeCog } from "react-icons/tb";
import { FaChalkboardTeacher, FaPeopleArrows } from "react-icons/fa";
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { HiInformationCircle } from "react-icons/hi";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { BsRepeat } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";

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
  const handlePasswordChange = () => {
    navigate(`/password-change/${data._id}`);
    setIsMenu(false);
  };
  const logoutUser = async () => {
    await dispatch(logoutAdmin());
    await dispatch(logout());
  };

  const handleStudentEnquiry = () => {
    navigate("/student-enquiry");
    setIsMenu(false);
  };
  const handleNewAdmission = () => {
    navigate("/register-student");
    setIsMenu(false);
  };
  const handleSearchStudent = () => {
    navigate("/search-student");
    setIsMenu(false);
  };
  const handleActiveStudent = () => {
    navigate("/students-active");
    setIsMenu(false);
  };
  const handlePromote = () => {
    navigate("/student-progression");
    setIsMenu(false);
  };
  const handleTransaction = () => {
    navigate("/transaction");
    setIsMenu(false);
  };
  const handleTransactionRollback = () => {
    navigate("/transaction-rollback");
    setIsMenu(false);
  };
  const handleStatics = () => {
    navigate("/statistics");
    setIsMenu(false);
  };
  const handleAddTeacher = () => {
    navigate("/add-teacher");
    setIsMenu(false);
  };
  const handleAllTeacher = () => {
    navigate("/teachers");
    setIsMenu(false);
  };
  const handleAllTeacherTransaction = () => {
    navigate("/teacher-transactions");
    setIsMenu(false);
  };
  const handleAllAdmins = () => {
    navigate("/all-admins");
    setIsMenu(false);
  };
  const handleFeeSettings = () => {
    navigate("/fee-settings");
    setIsMenu(false);
  };
  const handleSchoolDetails = () => {
    navigate(`/school-details`);
    setIsMenu(false);
  };
  const handleActivation = () => {
    navigate("/emp-activation");
    setIsMenu(false);
  };
  const handleSectionShift = () => {
    navigate("/section-shift");
    setIsMenu(false);
  };
  const handleFinancialReport = () => {
    navigate("/financial-report");
    setIsMenu(false);
  };


  // Notifications
  const goToAddNotifications = ()=>{
    navigate("/add-notifications");
    setIsMenu(false);
  }

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <div className="sidebar-heading">
          <MdDashboardCustomize size={20} />
          <span className="sidebar-heading-head">DASHBOARD</span>
        </div>

        <div className="sidebar-menues">
          <span className="menu-title module">Statistics</span>
          <div className="sidebar-menu" onClick={handleStatics}>
            <IoStatsChart size={20} />
            <span className="menu-title">Statistics</span>
          </div>

          <span className="menu-title module">Student Module</span>
          <div className="sidebar-menu" onClick={handleStudentEnquiry}>
            <HiInformationCircle size={20} />
            <span className="menu-title">Student Enquiry</span>
          </div>

          <div className="sidebar-menu" onClick={handleNewAdmission}>
            <IoMdPersonAdd size={20} />
            <span className="menu-title">New Admission</span>
          </div>

          <div className="sidebar-menu" onClick={handleSearchStudent}>
            <BiSearchAlt2 size={20} />
            <span className="menu-title">Search Student</span>
          </div>

          <div className="sidebar-menu" onClick={handleActiveStudent}>
            <FaPeopleGroup size={20} />
            <span className="menu-title">All Students</span>
          </div>

          <div className="sidebar-menu" onClick={handleTransaction}>
            <GrTransaction size={20} />
            <span className="menu-title">Transactions</span>
          </div>

          <div className="sidebar-menu" onClick={handleTransactionRollback}>
            <MdOutlineSettingsBackupRestore size={20} />
            <span className="menu-title">Roll Back Payment</span>
          </div>

          <span className="menu-title module">Progression Module</span>
          <div className="sidebar-menu" onClick={handlePromote}>
            <FaPeopleArrows size={20} />
            <span className="menu-title">Student Progression</span>
          </div>

          <div className="sidebar-menu" onClick={handleSectionShift}>
            <BsRepeat size={20} />
            <span className="menu-title">Section Shift</span>
          </div>

          <span className="menu-title module">Generate Report</span>
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

          <span className="menu-title module">Employee Module</span>
          <div className="sidebar-menu" onClick={handleAddTeacher}>
            <PiChalkboardTeacherThin size={20} />
            <span className="menu-title">Add Employee</span>
          </div>

          <div className="sidebar-menu" onClick={handleAllTeacher}>
            <FaChalkboardTeacher size={20} />
            <span className="menu-title">All Employees</span>
          </div>

          <div className="sidebar-menu" onClick={handleActivation}>
            <TbTransactionRupee size={20} />
            <span className="menu-title">Activation</span>
          </div>

          <div className="sidebar-menu" onClick={handleAllTeacherTransaction}>
            <TbTransactionRupee size={20} />
            <span className="menu-title">Payment History</span>
          </div>

          {data?.role === "super" && (
            <>
              <span className="menu-title module">Admin Module</span>
              <div className="sidebar-menu" onClick={handleAllAdmins}>
                <FaChalkboardTeacher size={20} />
                <span className="menu-title">All Users</span>
              </div>
            </>
          )}


{/* WEBSITE NOTIFICATION  */}

{data.role === "super" && (<Fragment>
<span className="menu-title module">Web Notifications</span>
 <SimpleTreeView sx={{ fontSize: "6.2rem" }}>
            <TreeItem
              itemId="grid"
              label="Notice"
              sx={{ fontSize: "1.2rem", color: "white", margin: "12px" }}
            >
              <TreeItem
                itemId="grid-notify"
                label="Notificatons"
                onClick={goToAddNotifications}
                sx={{ fontSize: "1.2rem", color: "white", margin: "10px" }}
              />
              
            </TreeItem>
          </SimpleTreeView>

</Fragment>)}




          {data.role === "super" && (
            <Fragment>
              <span className="menu-title module">Settings</span>
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

              <div className="sidebar-menu" onClick={handleFeeSettings}>
                <TbSettingsDollar size={20} />
                <span className="menu-title">Fee Settings</span>
              </div>

              <div className="sidebar-menu" onClick={handleSchoolDetails}>
                <TbHomeCog size={20} />
                <span className="menu-title">School Settings</span>
              </div>
            </Fragment>
          )}

          <SimpleTreeView sx={{ fontSize: "6.2rem" }}>
            <TreeItem
              itemId="grid"
              label="Profile Settings"
              sx={{ fontSize: "1.2rem", color: "white", margin: "8px" }}
            >
              <TreeItem
                itemId="grid-community"
                label="My Profile"
                onClick={goToProfile}
              />
              <TreeItem
                itemId="password-change"
                label="Change Password"
                onClick={handlePasswordChange}
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
