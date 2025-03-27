import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Button from "react-bootstrap/Button";

const CarouselComponent = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const navigate = useNavigate(); // Navigation Hook

  // Fetch carousel data from API
  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/carousel/all"
      );
      if (response.data.length === 0) {
        console.warn("⚠ No carousel items found.");
      }
      setCarouselItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching carousel data:", error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "auto",
        paddingTop: "20px",
        fontFamily: "Glacial Indifference, sans-serif", // ✅ Global font applied
      }}
    >
      {carouselItems.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Glacial Indifference, sans-serif", // ✅ Applied here too
          }}
        >
          No carousel data available.
        </p>
      ) : (
        <Carousel
          controls={true}
          indicators={true}
          interval={3000}
          pause={false}
        >
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index} style={{ position: "relative" }}>
              {/* Background Image */}
              <img
                src={item.imageUrl || "https://via.placeholder.com/800x400"}
                width="90%"
                height="470"
                className="caro"
                style={{
                  display: "block",
                  margin: "auto",
                  borderRadius: "20px",
                }}
                alt={`Slide ${index + 1}`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/800x400")
                }
              />
              {/* Left-Aligned Caption */}
              <Carousel.Caption
                style={{
                  top: "50%",
                  left: "10%",
                  transform: "translateY(-80%)",
                  color: "black",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "left",
                  width: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "Glacial Indifference, sans-serif", // ✅ Applied inside captions
                }}
              >
                <h1>{item.bankName || "No Bank Name"}</h1>
                <h3
                  style={{
                    color: "#0d99ff",
                    backgroundColor: "#ffd700",
                    fontSize: "24px",
                    display: "inline-block",
                    padding: "5px",
                    borderRadius: "5px",
                    fontFamily: "Glacial Indifference, sans-serif", // ✅ Applied to h3
                  }}
                >
                  {item.offerTitle || "No Offer Title"}
                </h3>
                <p style={{ fontSize: "16px" }}>
                  {item.shortDescription || "No Description Available"}
             </p>
                <p style={{ fontSize: "12px" }}>
                  Discount Fee {item.discountProcessingFee || "N/A"}
                </p>
                <p style={{ fontSize: "12px" }}>
                  Cashback {item.houslyCashback || "N/A"}
                </p>
                <p style={{ fontSize: "12px" }}>
                  Valid Till {item.validTill || "N/A"}
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/apply-loan")}
                >
                  Apply Now →
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
