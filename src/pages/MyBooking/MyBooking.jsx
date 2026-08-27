import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase"; 
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./MyBooking.module.css"; 

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "bookings"), 
          where("userId", "==", user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const userBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", id));
        setBookings(bookings.filter(b => b.id !== id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "150px", fontSize: "16px", color: "#6b7280" }}>Loading...</div>;
  }

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", padding: "150px 20px" }}>
        <h2>Please Sign In</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>You need to be logged in to view your bookings.</p>
        <button 
          onClick={() => navigate("/")}
          style={{ background: "#ff5722", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings & Requests</h1>
      <p className={styles.subtitle}>Here you can track all your booked tours and requests.</p>

      {bookings.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You don't have any active bookings yet.</p>
          <button onClick={() => navigate("/tour")} className={styles.exploreBtn}>
            Explore Tours
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {bookings.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{item.tourTitle || item.tourType || "Tour Request"}</h3>
                {item.tourPrice && <span className={styles.price}>₾{item.tourPrice}</span>}
              </div>

              <div className={styles.cardBody}>
                <p><strong>Name:</strong> <span>{item.fullName || item.name}</span></p>
                <p><strong>Phone:</strong> <span>{item.phone}</span></p>
                {item.date && <p><strong>Date:</strong> <span>{item.date}</span></p>}
                {item.guests && <p><strong>Guests:</strong> <span>{item.guests}</span></p>}
                {item.message && <p><strong>Message:</strong> <span>{item.message}</span></p>}
                {item.notes && <p><strong>Notes:</strong> <span>{item.notes}</span></p>}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.status}>Status: Confirmed</span>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className={styles.deleteBtn}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}