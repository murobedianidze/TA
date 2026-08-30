import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_TOURS } from "../TOUR/Tour.jsx";
import { db, auth } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";
import AuthModal from "../../components/AuthModal/AuthModal";
import styles from "./TourDetail.module.css";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const tour = ALL_TOURS?.find((item) => String(item.id || item._id) === String(id));

  const onSubmit = async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setIsModalOpen(false); 
      setIsAuthOpen(true);   
      return;
    }

    setLoading(true);
    setResult("იგზავნება...");

    const formData = new FormData(event.target);
    const fullName = formData.get("name");
    const phone = formData.get("phone");
    const date = formData.get("date");

    try {
      formData.append("access_key", "8267c4d6-e191-4511-a044-cc5e8a91060a");
      formData.append("tour_title", tour?.title || "უცნობი ტური");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        await addDoc(collection(db, "bookings"), {
          tourTitle: tour?.title || "უცნობი ტური",
          tourPrice: tour?.price || "N/A",
          fullName: fullName,
          phone: phone,
          date: date,
          guests: 1, 
          userId: currentUser.uid,     
          userEmail: currentUser.email, 
          createdAt: new Date()
        });

        setResult("Success");
      } else {
        setResult("Error");
      }
    } catch (error) {
      console.error("Error booking tour:", error);
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  if (!tour) {
    return (
      <div style={{ padding: "140px 20px", textAlign: "center" }}>
        <h2>ტური ვერ მოიძებნა!</h2>
        <button 
          onClick={() => navigate("/tour")}
          style={{ padding: "10px 20px", marginTop: "15px", cursor: "pointer", background: "#ff5722", color: "#fff", border: "none", borderRadius: "6px" }}
        >
          უკან დაბრუნება
        </button>
      </div>
    );
  }

  return (
    <div className={styles.tourContainer}>
      
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Back
      </button>

      <div className={styles.topHeader}>
        <h1 className={styles.tourTitle}>{tour.title}</h1>
        <span className={styles.regionBadge}>
          📍 {tour.region || tour.location || "საქართველო"}
        </span>
      </div>

      <img src={tour.image} alt={tour.title} className={styles.tourImage} />

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span style={{ fontSize: "20px" }}>⏱️</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Duration</div>
          <strong style={{ fontSize: "14px", color: "#1a202c" }}>{tour.duration || "1 დღე"}</strong>
        </div>
        <div className={styles.statCard}>
          <span style={{ fontSize: "20px" }}>👥</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Group</div>
          <strong style={{ fontSize: "14px", color: "#1a202c" }}>{tour.groupSize || "4-5 კაცი"}</strong>
        </div>
        <div className={styles.statCard}>
          <span style={{ fontSize: "20px" }}>🚌</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Transport</div>
          <strong style={{ fontSize: "14px", color: "#1a202c" }}>Minivan / 4x4</strong>
        </div>
        <div className={styles.statCard}>
          <span style={{ fontSize: "20px" }}>🗣️</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Language</div>
          <strong style={{ fontSize: "14px", color: "#1a202c" }}>Geo / Eng</strong>
        </div>
      </div>

      <div className={styles.mainGrid}>
        
        <div>
          <div className={styles.contentCard}>
            <h3 style={{ margin: "0 0 14px 0", fontSize: "20px" }}>About Tour</h3>
            <p style={{ lineHeight: "1.8", color: "#4a5568", margin: 0, fontSize: "15px" }}>
              {tour.description}
            </p>
          </div>

          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className={styles.contentCard}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>Tour Itinerary</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {tour.itinerary.map((step, index) => (
                  <div key={index} style={{ display: "flex", gap: "15px" }}>
                    <span style={{ 
                      background: "#ebf8ff", color: "#2b6cb0", padding: "4px 10px", 
                      borderRadius: "6px", fontWeight: "bold", fontSize: "13px", 
                      height: "fit-content", minWidth: "50px", textAlign: "center" 
                    }}>
                      {step.time}
                    </span>
                    <div>
                      <strong style={{ display: "block", color: "#1a202c" }}>{step.title}</strong>
                      {step.desc && <span style={{ fontSize: "14px", color: "#718096" }}>{step.desc}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.stickyBooking}>
          <div className={styles.priceBox}>
            <span style={{ fontSize: "14px", color: "#718096" }}>Tour Price</span>
            <div className={styles.priceValue}>₾{tour.price}</div>
            <span style={{ fontSize: "13px", color: "#a0aec0" }}>Per Person</span>
          </div>

          <button onClick={() => { setIsModalOpen(true); setResult(""); }} className={styles.bookBtn}>
            Book a Tour
          </button>
        </div>

      </div>

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#fff", padding: "25px", borderRadius: "16px", width: "100%", maxWidth: "420px", position: "relative", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: "15px", right: "15px", background: "#f7fafc", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}
            >
              ✕
            </button>

            {result === "Success" ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "10px" }}>🎉</div>
                <h3 style={{ color: "#2f855a", margin: "0 0 10px 0" }}>ჯავშანი მიღებულია!</h3>
                <p style={{ color: "#4a5568", fontSize: "14px", lineHeight: "1.6" }}>
                  მადლობა! შეტყობინება და ჯავშანი წარმატებით გაიგზავნა.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ marginTop: 0, fontSize: "20px", color: "#1a202c" }}>დაჯავშნა</h3>
                <p style={{ fontSize: "13px", color: "#718096", marginBottom: "20px" }}>{tour.title}</p>
                
                <form onSubmit={onSubmit}>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px", color: "#4a5568" }}>სახელი და გვარი *</label>
                    <input type="text" name="name" required placeholder="მაგ: გიორგი ბერიძე" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e0", boxSizing: "border-box", outline: "none" }} />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px", color: "#4a5568" }}>ტელეფონის ნომერი *</label>
                    <input type="tel" name="phone" required placeholder="599 00 00 00" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e0", boxSizing: "border-box", outline: "none" }} />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px", color: "#4a5568" }}>სასურველი თარიღი *</label>
                    <input type="date" name="date" required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e0", boxSizing: "border-box", outline: "none" }} />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{ width: "100%", background: "#ff5722", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {loading ? "იგზავნება..." : "დადასტურება"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}