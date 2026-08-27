import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_TOURS } from "../TOUR/Tour.jsx";
import { db, auth } from "../../firebase"; // <--- შემოიტანე db და auth (გზა მიუსადაგე პროექტის სტრუქტურას)
import { collection, addDoc } from "firebase/firestore";
import AuthModal from "../../components/AuthModal/AuthModal"; // მიუსადაგე შენი AuthModal-ის ზუსტ გზას

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // <--- მოდალის სტეიტი
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tour = ALL_TOURS?.find((item) => String(item.id || item._id) === String(id));

  const onSubmit = async (event) => {
    event.preventDefault();

    // 1. შევამოწმოთ, არის თუ არა მომხმარებელი ავტორიზებული
    const currentUser = auth.currentUser;
     console.log("მიმდინარე მომხმარებელი:", currentUser); 
    if (!currentUser) {
      console.log("მომხმარებელი არ არის ავტორიზებული! იხსნება მოდალი.");
      setIsModalOpen(false); // ჯერ ვხურავთ ჯავშნის მოდალს
      setIsAuthOpen(true);   // ვუხსნით ავტორიზაციის მოდალს
      return;
    }

    setLoading(true);
    setResult("იგზავნება...");

    const formData = new FormData(event.target);
    const fullName = formData.get("name");
    const phone = formData.get("phone");
    const date = formData.get("date");

    try {
      // 2. ვგზავნით Web3Forms-ზე (თუ გჭირდება ეგ მეილიც)
      formData.append("access_key", "8267c4d6-e191-4511-a044-cc5e8a91060a");
      formData.append("tour_title", tour?.title || "უცნობი ტური");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        // 3. ვინახავთ Firestore-ის "bookings" კოლექციაში userId-თან ერთად
        await addDoc(collection(db, "bookings"), {
          tourTitle: tour?.title || "უცნობი ტური",
          tourPrice: tour?.price || "N/A",
          fullName: fullName,
          phone: phone,
          date: date,
          guests: 1, // ან თუ გაქვს გუგლის ფორმაში ხალხის რაოდენობა, მიუთითე
          userId: currentUser.uid,     // <--- უმნიშვნელოვანესი: მომხმარებლის ID
          userEmail: currentUser.email, // <--- მეილი
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
    <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "120px 20px 60px", fontFamily: "'Segoe UI', Roboto, sans-serif", color: "#2d3748" }}>
      
      {/* ნავიგაცია & სათაური */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: "none", border: "none", color: "#718096", cursor: "pointer", fontSize: "15px", marginBottom: "15px", fontWeight: "600" }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", margin: 0, color: "#1a202c" }}>{tour.title}</h1>
        <span style={{ background: "#edf2f7", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", color: "#4a5568" }}>
          📍 {tour.region || tour.location || "საქართველო"}
        </span>
      </div>

      {/* მთავარი ფოტო */}
      <img 
        src={tour.image} 
        alt={tour.title} 
        style={{ width: "100%", height: "460px", objectFit: "cover", borderRadius: "16px", marginBottom: "30px" }} 
      />

      {/* ძირითადი მაჩვენებლების ბლოკი */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "35px" }}>
        <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <span style={{ fontSize: "20px" }}>⏱️</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Duration</div>
          <strong style={{ fontSize: "15px", color: "#1a202c" }}>{tour.duration || "1 დღე"}</strong>
        </div>
        <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <span style={{ fontSize: "20px" }}>👥</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Group</div>
          <strong style={{ fontSize: "15px", color: "#1a202c" }}>{tour.groupSize || "4-5 კაცი"}</strong>
        </div>
        <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <span style={{ fontSize: "20px" }}>🚌</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Transport</div>
          <strong style={{ fontSize: "15px", color: "#1a202c" }}>Minivan / 4x4 Car</strong>
        </div>
        <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <span style={{ fontSize: "20px" }}>🗣️</span>
          <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>Guide Language</div>
          <strong style={{ fontSize: "15px", color: "#1a202c" }}>Georgian, English</strong>
        </div>
      </div>

      {/* 2-სვეტიანი განლაგება */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" }}>
        
        {/* მარცხენა მხარე: დეტალები */}
        <div>
          <div style={{ background: "#fff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
            <h3 style={{ margin: "0 0 14px 0", fontSize: "20px" }}>About Tour</h3>
            <p style={{ lineHeight: "1.8", color: "#4a5568", margin: 0 }}>
              {tour.description}
            </p>
          </div>

          {tour.itinerary && tour.itinerary.length > 0 && (
            <div style={{ background: "#fff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>Tour Itinerary</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {tour.itinerary.map((step, index) => (
                  <div key={index} style={{ display: "flex", gap: "15px" }}>
                    <span style={{ 
                      background: "#ebf8ff", 
                      color: "#2b6cb0", 
                      padding: "4px 10px", 
                      borderRadius: "6px", 
                      fontWeight: "bold", 
                      fontSize: "13px", 
                      height: "fit-content", 
                      minWidth: "50px", 
                      textAlign: "center" 
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

        {/* მარჯვენა მხარე: Sticky დაჯავშნა */}
        <div style={{ position: "sticky", top: "100px", background: "#fff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign: "center", borderBottom: "1px solid #edf2f7", paddingBottom: "20px", marginBottom: "20px" }}>
            <span style={{ fontSize: "14px", color: "#718096" }}>Tour Price</span>
            <div style={{ fontSize: "38px", fontWeight: "800", color: "#ff5722", margin: "4px 0" }}>
              ₾{tour.price}
            </div>
            <span style={{ fontSize: "13px", color: "#a0aec0" }}>Per Person</span>
          </div>

          <button 
            onClick={() => { setIsModalOpen(true); setResult(""); }}
            style={{ width: "100%", background: "#ff5722", color: "#fff", border: "none", padding: "16px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px", cursor: "pointer", boxShadow: "0 4px 12px rgba(255,87,34,0.3)" }}
          >
            Book a Tour
          </button>
        </div>

      </div>

      {/* Pop-up Booking Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", width: "100%", maxWidth: "420px", position: "relative", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: "18px", right: "18px", background: "#f7fafc", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}
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

                  {result === "Error" && (
                    <p style={{ color: "#e53e3e", fontSize: "13px", marginTop: "12px", textAlign: "center" }}>
                      დაფიქსირდა შეცდომა, სცადეთ თავიდან.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ავტორიზაციის მოდალი (თუ არ არის შესული) */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

    </div>
  );
}