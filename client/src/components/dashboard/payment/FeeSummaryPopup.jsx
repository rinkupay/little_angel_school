
import './FeeSummaryPopup.css';

const FeeSummaryPopup = ({ receipt, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="top-close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          <div><strong>Name:</strong> {receipt?.studentName}</div>
          <div><strong>Roll No:</strong> {receipt?.rollNo}</div>
          <div><strong>Class:</strong> {receipt?.std}</div>
          <div><strong>Month:</strong> {receipt?.month}</div>
        </div>
        <div className="modal-body">
          <h3>Fee Summary</h3>
          <table className="fee-table">
            <tbody>
                   <tr><td>Admission Fee</td><td>{receipt?.admissionFee || 0}</td></tr>
              <tr><td>Tuition Fee</td><td>{receipt?.tutionFee || 0}</td></tr>
              <tr><td>Hostel Fee</td><td>{receipt?.hostelFee || 0}</td></tr>
              <tr><td>Bus Fee</td><td>{receipt?.busFee || 0}</td></tr>
              <tr><td>Exam Fee</td><td>{receipt?.examFee || 0}</td></tr>
              <tr><td>Medical Fee</td><td>{receipt?.medicalFee || 0}</td></tr>
              <tr><td>Late Fee</td><td>{receipt?.lateFee || 0}</td></tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td>
                  <strong>
                    {(receipt?.tutionFee || 0) +
                      (receipt?.hostelFee || 0) +
                      (receipt?.busFee || 0) +
                      (receipt?.examFee || 0) +
                      (receipt?.medicalFee || 0) +
                      (receipt?.lateFee || 0)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeSummaryPopup;
