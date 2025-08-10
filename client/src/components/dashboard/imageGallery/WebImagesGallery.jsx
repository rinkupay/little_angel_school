import { useEffect, useState } from "react";
import axios from "axios";
import { MdClose, MdOutlineDriveFolderUpload } from "react-icons/md";
import toast from "react-hot-toast";
import "./WebImagesGallery.css";

// ==========================
// 📌 API Base URL
// ==========================
const API_BASE = import.meta.env.VITE_BASE_URL;

const WebImagesGallery = () => {
  // ==========================
  // 📌 State Management
  // ==========================
  const [images, setImages] = useState([]);                 // All uploaded images
  const [selectedFiles, setSelectedFiles] = useState([]);   // Files selected for upload
  const [previewImage, setPreviewImage] = useState(null);   // Preview modal image
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Delete confirmation modal
  const [uploadProgress, setUploadProgress] = useState(0);  // Upload percentage
  const [isUploading, setIsUploading] = useState(false);    // Upload status
  const [category, setCategory] = useState("");             // Selected category

  // ==========================
  // 📌 Handlers: Category Change
  // ==========================
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // ==========================
  // 📌 Fetch Images from API
  // ==========================
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/v1/images`);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ==========================
  // 📌 File Selection Handler
  // ==========================
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      toast.error("You can select a maximum of 10 images at a time.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // ==========================
  // 📌 Remove Selected Image
  // ==========================
  const handleRemoveSelected = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ==========================
  // 📌 Upload Images
  // ==========================
  const handleUpload = async () => {
    if (!selectedFiles.length) return toast.error("Select images first");
    if (category === "") return toast.error("Please Select Category");

    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("images", file);
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const res = await axios.post(`${API_BASE}/api/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { category },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });

      setImages((prev) => [...res.data.images, ...prev]);
      setSelectedFiles([]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // ==========================
  // 📌 Confirm Delete Image
  // ==========================
const confirmDelete = async () => {
  try {
    await axios.delete(`${API_BASE}/api/v1/images/${confirmDeleteId}`);
    setImages((prev) => prev.filter((img) => img._id !== confirmDeleteId));
    toast.success("Image deleted successfully");
    setConfirmDeleteId(null);
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete image");
  }
};


  // ==========================
  // 📌 Render Component
  // ==========================
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">Web Images Gallery</h2>

        {/* ================= UPLOAD SECTION ================= */}
        <div className="gallery-container">
          <div className="upload-section">
            <div className="upload-btn-btn">
              {/* File Input */}
              <input
                id="fileInput"
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input"
              />

              {/* Category Dropdown */}
              <div className="category-container">
                <label className="category-styl label" htmlFor="category">
                  Category
                </label>
                <select
                  className="category-styl"
                  name="category"
                  id="category"
                  onChange={handleCategoryChange}
                  value={category}
                >
                  <option value="">Select</option>
                  <option value="dance">Dance</option>
                  <option value="singing">Singing</option>
                  <option value="annual function">Annual Function</option>
                  <option value="sports">Sports</option>
                  <option value="visitors">Visitors</option>
                </select>
              </div>

              {/* Choose Files Button */}
              <label htmlFor="fileInput" className="choose-file-btn">
                📂 Choose Files
              </label>

              {/* Upload Button */}
              <button className="upload-btn" onClick={handleUpload}>
                <MdOutlineDriveFolderUpload size={18} /> <span>Upload</span>
              </button>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="upload-progress-container">
                <div
                  className="upload-progress-bar"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span className="upload-progress-text">{uploadProgress}%</span>
              </div>
            )}

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="selected-preview-scroll">
                {selectedFiles.map((file, idx) => {
                  const objectURL = URL.createObjectURL(file);
                  return (
                    <div key={idx} className="selected-image-card">
                      <img
                        src={objectURL}
                        alt="Selected preview"
                        className="selected-image"
                        onClick={() => setPreviewImage(objectURL)}
                      />
                      <button
                        className="remove-selected-btn"
                        onClick={() => handleRemoveSelected(idx)}
                      >
                        <MdClose size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= IMAGE GRID ================= */}
          <div className="image-grid">
            {images.length === 0 ? (
              <p className="no-images">No images uploaded yet.</p>
            ) : (
              images.map((img) => (
                <div key={img._id} className="image-card">
                  <img
                    src={`${API_BASE}${img.url}`}
                    alt="Uploaded"
                    className="gallery-image"
                    onClick={() => setPreviewImage(`${API_BASE}${img.url}`)}
                  />

                  {/* Category Overlay */}
                  <div className="category-overlay">{img.category}</div>

                  {/* Delete Button */}
                  <button
                    className="delete-btn-btn"
                    onClick={() => setConfirmDeleteId(img._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {previewImage && (
        <div className="preview-modal" onClick={() => setPreviewImage(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="Preview" className="preview-image" />
            <button className="close-btn" onClick={() => setPreviewImage(null)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {confirmDeleteId && (
        <div className="confirm-modal" onClick={() => setConfirmDeleteId(null)}>
          <div className="confirm-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Image?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebImagesGallery;
