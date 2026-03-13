import React, { useState, useEffect } from "react";
import "./BookingModal.css";
import { useAuth } from "../../Context/AuthContext";

const BookingModal = ({ isOpen, onClose, doctor }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user session
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setShowLoginModal(true);
      }
    };

    checkUserSession();
  }, []);

  const { handleBooking } = useAuth();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    fee: 10,
    doctorId: doctor?.id || "",
    doctorName: doctor?.name || "",
    appointmentType: "video",
    date: "",
    time: "",
    reason: "",
    symptoms: "",
    isFirstVisit: true,
    insuranceProvider: "",
    insuranceId: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const availableDates = [
    "2024-03-20",
    "2024-03-21",
    "2024-03-22",
    "2024-03-23",
    "2024-03-24",
  ];

  const availableTimes = {
    "2024-03-20": [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ],
    "2024-03-21": ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
    "2024-03-22": ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
    "2024-03-23": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
    "2024-03-24": ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!bookingData.appointmentType) {
      newErrors.appointmentType = "Please select appointment type";
    }
    if (!bookingData.date) {
      newErrors.date = "Please select a date";
    }
    if (!bookingData.time) {
      newErrors.time = "Please select a time";
    }
    if (!bookingData.reason) {
      newErrors.reason = "Please provide a reason for visit";
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!bookingData.emergencyContact) {
      newErrors.emergencyContact = "Emergency contact name is required";
    }
    if (!bookingData.emergencyPhone) {
      newErrors.emergencyPhone = "Emergency contact phone is required";
    }
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = step === 1 ? validateStep1() : validateStep2();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    localStorage.setItem("bookingdata", JSON.stringify(bookingData));

    setTimeout(() => {
      console.log(bookingData);
      handleBooking(bookingData);
    }, 1500);
  };

  const getProgressWidth = () => {
    return `${(step / 3) * 100}%`;
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div
        className="booking-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="booking-modal-close" onClick={onClose}>
          ×
        </button>

        {/* Progress Bar */}
        <div className="booking-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: getProgressWidth() }}
            ></div>
          </div>
          <div className="progress-steps">
            <span className={`step ${step >= 1 ? "active" : ""}`}>
              1. Appointment Details
            </span>
            <span className={`step ${step >= 2 ? "active" : ""}`}>
              2. Patient Information
            </span>
            <span className={`step ${step >= 3 ? "active" : ""}`}>
              3. Confirmation
            </span>
          </div>
        </div>

        {/* Doctor Info Summary */}
        <div className="doctor-summary">
          <div className="doctor-avatar">{doctor?.image || "👨‍⚕️"}</div>
          <div className="doctor-info">
            <h3>{doctor?.name}</h3>
            <p>
              {doctor?.specialty} • {doctor?.experience} experience
            </p>
            <p className="doctor-fee">
              Consultation Fee: {doctor?.fee || "$120"}
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="booking-step">
            <h3>Appointment Details</h3>

            <div className="form-group">
              <label>Appointment Type *</label>
              <div className="appointment-type-grid">
                <label
                  className={`type-card ${bookingData.appointmentType === "video" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value="video"
                    checked={bookingData.appointmentType === "video"}
                    onChange={handleChange}
                  />
                  <span className="type-icon">📹</span>
                  <span>Video Call</span>
                </label>
                <label
                  className={`type-card ${bookingData.appointmentType === "inperson" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value="inperson"
                    checked={bookingData.appointmentType === "inperson"}
                    onChange={handleChange}
                  />
                  <span className="type-icon">🏥</span>
                  <span>In Person</span>
                </label>
                <label
                  className={`type-card ${bookingData.appointmentType === "phone" ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value="phone"
                    checked={bookingData.appointmentType === "phone"}
                    onChange={handleChange}
                  />
                  <span className="type-icon">📞</span>
                  <span>Phone Call</span>
                </label>
              </div>
              {errors.appointmentType && (
                <span className="error-text">{errors.appointmentType}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Date *</label>
                <select
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  className={errors.date ? "error" : ""}
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </select>
                {errors.date && (
                  <span className="error-text">{errors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label>Select Time *</label>
                <select
                  name="time"
                  value={bookingData.time}
                  onChange={handleChange}
                  disabled={!bookingData.date}
                  className={errors.time ? "error" : ""}
                >
                  <option value="">Choose a time</option>
                  {bookingData.date &&
                    availableTimes[bookingData.date]?.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                </select>
                {errors.time && (
                  <span className="error-text">{errors.time}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Reason for Visit *</label>
              <textarea
                name="reason"
                value={bookingData.reason}
                onChange={handleChange}
                placeholder="Briefly describe your symptoms or reason for appointment"
                rows="3"
                className={errors.reason ? "error" : ""}
              ></textarea>
              {errors.reason && (
                <span className="error-text">{errors.reason}</span>
              )}
            </div>

            <div className="form-group">
              <label>Symptoms (Optional)</label>
              <textarea
                name="symptoms"
                value={bookingData.symptoms}
                onChange={handleChange}
                placeholder="List any specific symptoms"
                rows="2"
              ></textarea>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step">
            <h3>Patient Information</h3>

            <div className="form-group">
              <label>Is this your first visit?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="isFirstVisit"
                    value="true"
                    checked={bookingData.isFirstVisit === true}
                    onChange={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        isFirstVisit: true,
                      }))
                    }
                  />
                  Yes, first visit
                </label>
                <label>
                  <input
                    type="radio"
                    name="isFirstVisit"
                    value="false"
                    checked={bookingData.isFirstVisit === false}
                    onChange={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        isFirstVisit: false,
                      }))
                    }
                  />
                  No, returning patient
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Insurance Provider (Optional)</label>
              <input
                type="text"
                name="insuranceProvider"
                value={bookingData.insuranceProvider}
                onChange={handleChange}
                placeholder="Enter your insurance provider"
              />
            </div>

            <div className="form-group">
              <label>Insurance ID (Optional)</label>
              <input
                type="text"
                name="insuranceId"
                value={bookingData.insuranceId}
                onChange={handleChange}
                placeholder="Enter your insurance ID"
              />
            </div>

            <h4>Emergency Contact</h4>

            <div className="form-group">
              <label>Contact Name *</label>
              <input
                type="text"
                name="emergencyContact"
                value={bookingData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact name"
                className={errors.emergencyContact ? "error" : ""}
              />
              {errors.emergencyContact && (
                <span className="error-text">{errors.emergencyContact}</span>
              )}
            </div>

            <div className="form-group">
              <label>Contact Phone *</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={bookingData.emergencyPhone}
                onChange={handleChange}
                placeholder="Emergency contact phone"
                className={errors.emergencyPhone ? "error" : ""}
              />
              {errors.emergencyPhone && (
                <span className="error-text">{errors.emergencyPhone}</span>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step confirmation-step">
            <h3>Confirm Your Booking</h3>

            <div className="confirmation-details">
              <div className="detail-group">
                <h4>Appointment Details</h4>
                <p>
                  <strong>Doctor:</strong> {bookingData.doctorName}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {bookingData.appointmentType === "video"
                    ? "📹 Video Call"
                    : bookingData.appointmentType === "inperson"
                      ? "🏥 In Person"
                      : "📞 Phone Call"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {bookingData.date
                    ? new Date(bookingData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
                <p>
                  <strong>Time:</strong> {bookingData.time}
                </p>
                <p>
                  <strong>Reason:</strong> {bookingData.reason}
                </p>
              </div>

              <div className="detail-group">
                <h4>Patient Information</h4>
                <p>
                  <strong>First Visit:</strong>{" "}
                  {bookingData.isFirstVisit ? "Yes" : "No"}
                </p>
                {bookingData.insuranceProvider && (
                  <p>
                    <strong>Insurance:</strong> {bookingData.insuranceProvider}
                  </p>
                )}
                <p>
                  <strong>Emergency Contact:</strong>{" "}
                  {bookingData.emergencyContact}
                </p>
                <p>
                  <strong>Emergency Phone:</strong> {bookingData.emergencyPhone}
                </p>
              </div>

              <div className="fee-breakdown">
                <h4>Fee Breakdown</h4>
                <div className="fee-row">
                  <span>Consultation Fee</span>
                  <span>{doctor?.fee || "$120"}</span>
                </div>
                <div className="fee-row">
                  <span>Platform Fee</span>
                  <span>$5</span>
                </div>
                <div className="fee-row total">
                  <span>Total</span>
                  <span>
                    ${parseInt(doctor?.fee?.replace("$", "") || 120) + 5}
                  </span>
                </div>
              </div>

              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" /> I confirm that the information
                  provided is accurate and I agree to the cancellation policy
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="booking-actions">
          {showLoginModal ? (
            <button className="prev-btn" disabled={showLoginModal}>
              Please Login to Continue
            </button>
          ) : (
            <>
              {step > 1 && (
                <button className="prev-btn" onClick={handlePrevious}>
                  ← Previous
                </button>
              )}
              {step < 3 ? (
                <button className="next-btn" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button className="confirm-btn" onClick={handleSubmit}>
                  Confirm Booking ✓
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
