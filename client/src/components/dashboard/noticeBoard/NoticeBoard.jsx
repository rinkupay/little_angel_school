import React, { useState, useEffect } from "react";
import "./NoticeBoard.css";

const NoticeBoard = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "", type: "General" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL; // Example: http://localhost:5000

  console.log(formData)

  // Fetch notifications
  useEffect(() => {
    fetch(`${baseURL}/api/notifications`)
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error("Error fetching notifications:", err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await fetch(`${baseURL}/api/notifications/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`${baseURL}/api/notifications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      if (res.ok) {
        const updatedList = await fetch(`${baseURL}/api/notifications`).then(r => r.json());
        setNotifications(updatedList);
        setFormData({ title: "", message: "", type: "General" });
        setEditingId(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  const handleEdit = (notif) => {
    setFormData({ title: notif.title, message: notif.message, type: notif.type });
    setEditingId(notif._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await fetch(`${baseURL}/api/notifications/${id}`, { method: "DELETE" });
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <div className="dashboard-header">
          <h2 className="dashboard-heading">Notifications</h2>
         
        </div>

        <div className="hearder-btn">
           <button className="add-btn" onClick={() => { setEditingId(null); setShowModal(true); }}>
            + Add New
          </button>
        </div>

        <div className="notification-list">
          {notifications.length === 0 && <p>No notifications found.</p>}
          {notifications.map((notif) => (
            <div key={notif._id} className="notification-card">
              <div className="notification-header">
                <h4>{notif.title}</h4>
                <span className={`badge ${notif.type.replace(" ", "-").toLowerCase()}`}>
                  {notif.type}
                </span>
              </div>
              <p>{notif.message}</p>
              <small>{new Date(notif.date).toLocaleDateString()}</small>
              <div className="notification-actions">
                <button onClick={() => handleEdit(notif)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(notif._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Holiday">Holiday</option>
                <option value="Fee Payment">Fee Payment</option>
                <option value="General">General</option>
              </select>
              <div className="modal-actions">
                <button type="submit">{editingId ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
