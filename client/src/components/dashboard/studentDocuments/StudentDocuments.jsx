import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDocuments.css";
import "../Dashboard.css";
import NavButton from "../navbutton/NavButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDocument } from "../../../features/studentDocumentSlice";
import Loader from "../../loader/Loader";
import { checkFileSize } from "../../../utils/checkImageSize";

// Reusable DocumentRow Component
const DocumentRow = ({
  label,
  name,
  documentPreview,
  documentUrl,
  handleFileChange,
  openModal,
}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>
        <input type="file" name={name} onChange={handleFileChange} />
      </td>
      <td>
        {(documentPreview || documentUrl) && (
          <img
            src={documentPreview || documentUrl}
            alt={`${label} Preview`}
            className="document-preview-d"
            onClick={() => openModal(documentPreview || documentUrl)} // Open modal on image click
          />
        )}
      </td>
    </tr>
  );
};

const StudentDocuments = () => {
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const { studentDocument, loading } = useSelector(
    (state) => state.studentDocument
  );

  const [documents, setDocuments] = useState({
    aadhar: null,
    tc: null,
    cc: null,
    rc: null,
    admission: null,
    admissionReceipt: null,
    other: null,
    issuedtc: null,
    issuedcc: null,
  });

  const [documentPreviews, setDocumentPreviews] = useState({
    aadhar: null,
    tc: null,
    cc: null,
    rc: null,
    admission: null,
    admissionReceipt: null,
    other: null,
    issuedtc: null,
    issuedcc: null,
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Modal state for image preview
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Fetch documents on load
  useEffect(() => {
    dispatch(fetchStudentDocument(id));
  }, [dispatch, id]);

  // Set document previews after fetching
  useEffect(() => {
    if (studentDocument) {
      setDocumentPreviews({
        aadhar: `${baseURL}/${studentDocument.aadhar}`,
        tc: `${baseURL}/${studentDocument.tc}`,
        cc: `${baseURL}/${studentDocument.cc}`,
        rc: `${baseURL}/${studentDocument.rc}`,
        admission: `${baseURL}/${studentDocument.admission}`,
        admissionReceipt: `${baseURL}/${studentDocument.admissionReceipt}`,
        issuedtc: `${baseURL}/${studentDocument.issuedtc}`,
        issuedcc: `${baseURL}/${studentDocument.issuedcc}`,
        other: `${baseURL}/${studentDocument.other}`,
      });
    }
  }, [studentDocument]);

  // HANDLE CHANGE FILES
  const handleFileChange = async (e, fieldName, msg, setError) => {
    const { files } = e.target;
    const file = files[0];
    if (!checkFileSize(file, msg, setError)) return;

    //   Update document state
    setDocuments((prev) => ({ ...prev, [fieldName]: file }));

    // Show Preview if it's an image
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
    try {
      setError(null);
      setMessage(null);

      const formData = new FormData();
      formData.append(fieldName, file);

      await axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`${msg} uploaded successfully.`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  // Handle file changes for Aadhar upload
  // const handleAadharChange = (e) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const message = "Aadhar Card";
  //   if (!checkFileSize(file, message,setError)) return;

  //   setDocuments((prev) => ({ ...prev, aadhar: file }));

  //   if (file && file.type.startsWith("image")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setDocumentPreviews((prev) => ({ ...prev, aadhar: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }

  //   try {
  //     setError(null);
  //     setMessage(null);

  //     const formData = new FormData();
  //     formData.append("aadhar", file);

  //     axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("Aadhar Card uploaded successfully.");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Something went wrong.");
  //   }
  // };

  // Handle file changes for TC upload
  //   const handleTcChange = (e) => {
  //     const { files } = e.target;
  //     const file = files[0];
  //     const message = "TC";
  //  if (!checkFileSize(file, message,setError)) return;
  //     setDocuments((prev) => ({ ...prev, tc: file }));

  //     if (file && file.type.startsWith("image")) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setDocumentPreviews((prev) => ({ ...prev, tc: reader.result }));
  //       };
  //       reader.readAsDataURL(file);
  //     }

  //     try {
  //       setError(null);
  //       setMessage(null);

  //       const formData = new FormData();
  //       formData.append("tc", file);

  //       axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       setMessage("TC uploaded successfully.");
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Something went wrong.");
  //     }
  //   };

  // Handle file changes for CC upload
  // const handleCcChange = (e) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const message = "CC";
  //    if (!checkFileSize(file, message,setError)) return;
  //   setDocuments((prev) => ({ ...prev, cc: file }));

  //   if (file && file.type.startsWith("image")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setDocumentPreviews((prev) => ({ ...prev, cc: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   try {
  //     setError(null);
  //     setMessage(null);

  //     const formData = new FormData();
  //     formData.append("cc", file);

  //     axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("CC uploaded successfully.");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Something went wrong.");
  //   }
  // };

  // Handle file changes for RC upload
  //   const handleRcChange = (e) => {
  //     const { files } = e.target;
  //     const file = files[0];
  //     const message = "RC";
  //  if (!checkFileSize(file, message,setError)) return;
  //     setDocuments((prev) => ({ ...prev, rc: file }));

  //     if (file && file.type.startsWith("image")) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setDocumentPreviews((prev) => ({ ...prev, rc: reader.result }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //     try {
  //       setError(null);
  //       setMessage(null);

  //       const formData = new FormData();
  //       formData.append("rc", file);

  //       axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       setMessage("RC uploaded successfully.");
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Something went wrong.");
  //     }
  //   };

  // Handle file changes for Admission Form upload
  // const handleAdmissionFormChange = (e) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const message = "Admission Form";
  //  if (!checkFileSize(file, message,setError)) return;
  //   setDocuments((prev) => ({ ...prev, admission: file }));

  //   if (file && file.type.startsWith("image")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setDocumentPreviews((prev) => ({ ...prev, admission: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   try {
  //     setError(null);
  //     setMessage(null);

  //     const formData = new FormData();
  //     formData.append("admission", file);

  //     axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("Admission form uploaded successfully.");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Something went wrong.");
  //   }
  // };

  // Handle file changes for Admission Receipt upload
  // const handleAdmissionReceiptChange = (e) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const message = "Admission Receipt";
  //   if (!checkFileSize(file, message,setError)) return;
  //   setDocuments((prev) => ({ ...prev, admissionReceipt: file }));

  //   if (file && file.type.startsWith("image")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setDocumentPreviews((prev) => ({ ...prev, admissionReceipt: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   try {
  //     setError(null);
  //     setMessage(null);

  //     const formData = new FormData();
  //     formData.append("admissionReceipt", file);

  //     axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("Admission Receipt uploaded successfully.");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Something went wrong.");
  //   }
  // };

  // Handle file changes for Admission Receipt upload
  // const handleOtherChange = (e) => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const message = "OthersS Receipt";
  //    if (!checkFileSize(file, message,setError)) return;
  //   setDocuments((prev) => ({ ...prev, other: file }));

  //   if (file && file.type.startsWith("image")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setDocumentPreviews((prev) => ({ ...prev, other: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   try {
  //     setError(null);
  //     setMessage(null);

  //     const formData = new FormData();
  //     formData.append("other", file);

  //     axios.post(`${baseURL}/api/v1/student-documents/${id}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("Other Receipt uploaded successfully.");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Something went wrong.");
  //   }
  // };

  // Function to open the modal
  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="dashboard-wrapper">
      {loading && <Loader />}
      <div className="dashboard-right">
        <h2 className="dashboard-heading">DOCUMENTS</h2>
        <NavButton id={id} />

        <div>
          {/* Display success or error message */}
          {error && <div className="error-d">{error}</div>}
          {message && <div className="success-d">{message}</div>}

          <form className="student-document-form">
            <table className="document-table-d">
              <thead>
                <tr>
                  <th>Required Documents</th>
                  <th>Upload</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                <DocumentRow
                  label="Aadhar Card"
                  name="aadhar"
                  documentPreview={documentPreviews.aadhar}
                  documentUrl={`${baseURL}/${studentDocument.aadhar}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "aadhar", "Aadhar Card", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
                {/* <DocumentRow
                  label="Transfer Certificate (TC)"
                  name="tc"
                  documentPreview={documentPreviews.tc}
                  documentUrl={`${baseURL}/${studentDocument.tc}`}
                  handleFileChange={handleTcChange} // Pass individual handler
                  openModal={openModal}
                /> */}

                <DocumentRow
                  label="Transfer Certificate (TC)"
                  name="tc"
                  documentPreview={documentPreviews.tc}
                  documentUrl={`${baseURL}/${studentDocument.tc}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "tc", "Transfer Certificate", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Character Certificate (CC)"
                  name="cc"
                  documentPreview={documentPreviews.cc}
                  documentUrl={`${baseURL}/${studentDocument.cc}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "cc", "Character Certificate", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Residential Certificate (RC)"
                  name="rc"
                  documentPreview={documentPreviews.rc}
                  documentUrl={`${baseURL}/${studentDocument.rc}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "rc", "Residential Certificate", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
              </tbody>
            </table>
          </form>

          <form>
            <table className="document-table-d">
              <thead>
                <tr>
                  <th>Issued Documents</th>
                  <th>Upload</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                <DocumentRow
                  label="Aamission Form"
                  name="admission"
                  documentPreview={documentPreviews.admission}
                  documentUrl={`${baseURL}/${studentDocument.admission}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "admission", "Aamission Form", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
                <DocumentRow
                  label="Admission Receipt"
                  name="admissionReceipt"
                  documentPreview={documentPreviews.admissionReceipt}
                  documentUrl={`${baseURL}/${studentDocument.admissionReceipt}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "admissionReceipt", "Admission Receipt", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />

                <DocumentRow
                  label="Issued TC"
                  name="issuedtc"
                  documentPreview={documentPreviews.issuedtc}
                  documentUrl={`${baseURL}/${studentDocument.issuedtc}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "issuedtc", "Issued TC", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />

                <DocumentRow
                  label="Issued CC"
                  name="issuedcc"
                  documentPreview={documentPreviews.issuedcc}
                  documentUrl={`${baseURL}/${studentDocument.issuedcc}`}
                  handleFileChange={(e) =>
                    handleFileChange(e, "issuedcc", "Issued CC", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />

                <DocumentRow
                  label="Others"
                  name="other"
                  documentPreview={documentPreviews.other}
                  documentUrl={`${baseURL}/${studentDocument.other}`}
                   handleFileChange={(e) =>
                    handleFileChange(e, "other", "Others", setError)
                  } // Pass individual handler
                  openModal={openModal}
                />
              </tbody>
            </table>
          </form>
        </div>
      </div>

      {/* Modal for image preview */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              X
            </span>
            <img src={modalImage} alt="Modal Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDocuments;
