import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    tenure: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation Function
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (formData.loanAmount <= 0)
      newErrors.loanAmount = "Loan amount must be greater than ₹0";
    if (!formData.tenure) newErrors.tenure = "Select loan tenure";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      toast.success("✅ Loan Application Submitted Successfully!", {
        position: "top-right",
      });
      setLoading(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        loanAmount: "",
        tenure: "",
      });
      navigate("/"); // Redirect to Home page after submission
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />
      <div
        className="card shadow-lg border-0 mt-5 p-4"
        style={{ width: "40rem", background: "#f8f9fa", borderRadius: "10px" }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: "#2c3e50" }}>
          Apply for a Loan
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              style={{ borderRadius: "5px" }}
            />
            {errors.fullName && (
              <p className="text-danger small mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              style={{ borderRadius: "5px" }}
            />
            {errors.email && (
              <p className="text-danger small mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              style={{ borderRadius: "5px" }}
            />
            {errors.phone && (
              <p className="text-danger small mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="loanAmount"
              placeholder="Loan Amount (₹)"
              value={formData.loanAmount}
              onChange={handleChange}
              className="form-control"
              style={{ borderRadius: "5px" }}
            />
            {errors.loanAmount && (
              <p className="text-danger small mt-1">{errors.loanAmount}</p>
            )}
          </div>

          <div className="mb-3">
            <select
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="form-select"
              style={{ borderRadius: "5px" }}
            >
              <option value="">Select Loan Tenure</option>
              <option value="12">12 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
              <option value="48">48 Months</option>
              <option value="60">60 Months</option>
            </select>
            {errors.tenure && (
              <p className="text-danger small mt-1">{errors.tenure}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-white fw-bold"
            style={{
              background: loading ? "#95a5a6" : "#007bff",
              borderRadius: "5px",
            }}
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
