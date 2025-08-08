import  { useState } from "react";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./SearchByName.module.css"; // Import CSS module
import "../Dashboard.css";
import toast from "react-hot-toast";

const SearchByName = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        setStudents([]);
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/studentByName?name=${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
        setStudentData(null);
      } else {
        setStudents([]);
      }
    } catch (error) {
      toast.error("Error fetching students by name.");
    }
  };

  const handleSearchById = async (searchId) => {
    try {
      if (searchId.trim() === "") {
        setStudentData(null);
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/studentBySchoolId?schoolId=${searchId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStudentData(data.student);
        setStudents([]);
      } else {
        setStudentData(null);
      }
    } catch (error) {
      toast.error("Error fetching student by ID.");
    }
  };

  const handleSearchByAadhar = async (aadharNumber) => {
    try {
      if (aadharNumber.trim() === "") {
        setStudentData(null);
        return;
      }

      const response = await fetch(
        `${baseUrl}/api/v1/studentByAadhar?aadhar=${aadharNumber}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data)

      if (data.success) {
        setStudentData(data.student);
        setStudents([]);
      } else {
        setStudentData(null);
      }
    } catch (error) {
      toast.error("Error fetching student by Aadhar.");
    }
  };

  const handleProfile = (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">SEARCH STUDENT</h2>

        <div className={styles.ssearchWrapper}>
          <div className={styles.ssearchItem}>
            <select
              className={styles.ssearchName}
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name">Search by Name</option>
              <option value="id">Search by Admission No.</option>
              <option value="aadhar">Search by Aadhar</option>
            </select>
          </div>

          {searchType === "name" && (
            <div className={styles.ssearchItem}>
              <input
                type="text"
                className={styles.ssearchName}
                placeholder="Enter student name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles.ssearchBtn} onClick={handleSearch}>
                Search
              </button>
            </div>
          )}

          {searchType === "id" && (
            <div className={styles.ssearchItem}>
              <input
                type="text"
                className={styles.ssearchName}
                placeholder="Enter student ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                className={styles.ssearchBtn}
                onClick={() => handleSearchById(searchId)}
              >
                Search
              </button>
            </div>
          )}

          {searchType === "aadhar" && (
            <div className={styles.ssearchItem}>
              <input
                type="text"
                className={styles.ssearchName}
                placeholder="Enter Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
              <button
                className={styles.ssearchBtn}
                onClick={() => handleSearchByAadhar(aadhar)}
              >
                Search
              </button>
            </div>
          )}
        </div>

        <div className={styles.sstudentTable}>
          <table className={styles.sstudentTable}>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Admission No.</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>

            {students && students.length > 0 && (
              <tbody>
                {students.map((student, index) => (
                  <tr className={styles.sstudentRow} key={student._id}>
                    <td className={styles.sstudentData}>{index + 1}</td>
                    <td className={styles.sstudentData}>{student.admissionNo}</td>
                    <td className={styles.sstudentData}>
                      {student.personalInfo.fullName}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.personalInfo.fatherName}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.rollNo}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.std}
                    </td>
                    <td className={styles.sstudentData}>
                      {student.academicInfo.section}
                    </td>
                    <td
                      className={styles.sstudentData}
                      onClick={() => handleProfile(student._id)}
                    >
                      <IoEye className={styles.sviewIcon} size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}

            {studentData && (
              <tbody>
                <tr className={styles.sstudentRow}>
                  <td className={styles.sstudentData}>1</td>
                  <td className={styles.sstudentData}>
                    {studentData.admissionNo}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData.personalInfo?.fullName}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData.personalInfo?.fatherName}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData.academicInfo?.rollNo}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData.academicInfo?.std}
                  </td>
                  <td className={styles.sstudentData}>
                    {studentData.academicInfo?.section}
                  </td>
                  <td
                    className={styles.sstudentData}
                    onClick={() => handleProfile(studentData._id)}
                  >
                    <IoEye className={styles.sviewIcon} size={20} />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchByName;
