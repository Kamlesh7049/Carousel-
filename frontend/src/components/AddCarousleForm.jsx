import React, { useState } from "react";
import axios from "axios";

const AddCarouselForm = ({ refreshCarousel }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    offerTitle: "",
    shortDescription: "",
    discountProcessingFee: "",
    houslyCashback: "",
    validTill: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Show image preview when URL is entered
    if (name === "imageUrl") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic Validation
    if (!formData.bankName || !formData.offerTitle || !formData.imageUrl) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/carousel/add",
        formData
      );
      alert("✅ Carousel Item Added Successfully!");
      setFormData({
      
        offerTitle: "",
        shortDescription: "",
        discountProcessingFee: "",
        houslyCashback: "",
        validTill: "",
        imageUrl: "",
      });
      setImagePreview(""); // Reset image preview
      refreshCarousel(); // Refresh carousel data after adding an item
    } catch (error) {
      console.error("❌ Error Adding Carousel Item:", error);
      setError("Failed to add carousel item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Add Carousel Data</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="offerTitle"
          placeholder="Offer Title"
          value={formData.offerTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="discountProcessingFee"
          placeholder="Discount Processing Fee"
          value={formData.discountProcessingFee}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="houslyCashback"
          placeholder="Hously Cashback"
          value={formData.houslyCashback}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="validTill"
          placeholder="Valid Till"
          value={formData.validTill}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {loading ? "Adding..." : "Add Carousel Item"}
        </button>
      </form>
    </div>
  );
};

export default AddCarouselForm;
