import React, { useState, useEffect } from "react";
import "./NoticeBoard.css";
import toast from "react-hot-toast";

const NoticeBoard = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "General",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${baseURL}/api/v1/notifications`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${text}`);
      }
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      toast.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        messageTitle: formData.title,
        messageContent: formData.message,
        messageType: formData.type,
      };

      let res;
      if (editingId) {
        res = await fetch(`${baseURL}/api/v1/notifications/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      } else {
        res = await fetch(`${baseURL}/api/v1/notifications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      }

      if (res.ok) {
        await fetchNotifications();
        setFormData({ title: "", message: "", type: "General" });
        setEditingId(null);
        setShowModal(false);
        toast.success(editingId ? "Notification updated!" : "Notification added!");
      } else {
        const errorText = await res.text();
        console.error("Error saving notification:", errorText);
        toast.error("Failed to save notification");
      }
    } catch (error) {
      console.error("Error saving notification:", error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (notif) => {
    setFormData({
      title: notif.messageTitle,
      message: notif.messageContent,
      type: notif.messageType,
    });
    setEditingId(notif._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;
    try {
      const res = await fetch(`${baseURL}/api/v1/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setNotifications(notifications.filter((n) => n._id !== id));
        toast.success("Notification deleted");
      } else {
        const errorText = await res.text();
        console.error("Error deleting notification:", errorText);
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <div className="dashboard-header">
          <h2 className="dashboard-heading">Notifications</h2>
        </div>

        <div className="hearder-btn">
          <button
            className="add-btn"
            onClick={() => {
              setEditingId(null);
              setFormData({ title: "", message: "", type: "General" });
              setShowModal(true);
            }}
          >
            + Add New
          </button>
        </div>

        <div className="notification-list">
          {notifications.length === 0 && <p>No notifications found.</p>}
          {notifications.map((notif) => (
            <div key={notif._id} className="notification-card">
              <div className="notification-header">
                <h4>{notif.messageTitle}</h4>
                <span
                  className={`badge ${notif.messageType
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {notif.messageType}
                </span>
              </div>
              <p>{notif.messageContent}</p>
              <small>
                {new Date(notif.createdAt).toLocaleDateString()}{" "}
                {new Date(notif.createdAt).toLocaleTimeString()}
              </small>
              <div className="notification-actions">
                <button onClick={() => handleEdit(notif)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(notif._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{editingId ? "Edit Notification" : "Add Notification"}</h3>
            <form className="notification-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Notification Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Notification Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Holiday">Holiday</option>
                <option value="Fee Payment">Fee Payment</option>
                <option value="General">General</option>
              </select>
              <div className="modal-actions">
                <button type="submit">
                  {editingId ? "Update" : "Post"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
