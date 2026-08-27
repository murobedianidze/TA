import React, { useState } from "react";
import { db } from "./pages/Home/firebase"; // გადაამოწმეთ მისამართი (საჭიროებისამებრ დაამატეთ ../)
import { collection, addDoc } from "firebase/firestore";
import styles from "./BookingForm.module.css";

export default function BookingForm({ tourTitle, tourPrice }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    guests: 1,
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // ვწერთ ტურის ჯავშანს Firestore-ის "bookings" კოლექციაში
      await addDoc(collection(db, "bookings"), {
        tourTitle: tourTitle || "General Tour",
        tourPrice: tourPrice || "N/A",
        fullName: formData.fullName,
        phone: formData.phone,
        date: formData.date,
        guests: formData.guests,
        notes: formData.notes,
        createdAt: new Date()
      });

      console.log("Booking Data Saved to Firebase Successfully!");
      setIsSubmitted(true);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>✓</div>
        <h3>ჯავშანი მიღებულია!</h3>
        <p>მადლობა, <strong>{formData.fullName}</strong>!</p>
        <p>ჩვენი ოპერატორი მალე დაგიკავშირდებათ ნომერზე: <strong>{formData.phone}</strong></p>
        <button 
          className={styles.resetBtn} 
          onClick={() => setIsSubmitted(false)}
        >
          ახალი ჯავშანი
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bookingCard}>
      <h3 className={styles.formTitle}>ტური: {tourTitle}</h3>
      {tourPrice && <p className={styles.priceTag}>ფასი: <span>€{tourPrice}</span> / პერსონაზე</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName">სრული სახელი და გვარი *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="მაგ: გიორგი ბერიძე"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">ტელეფონის ნომერი *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+995 599 00 00 00"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="date">ტურის თარიღი *</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="guests">ხალხის რაოდენობა</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="notes">დამატებითი სურვილები (არასავალდებულო)</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            placeholder="მაგ: კვებასთან დაკავშირებული მოთხოვნები..."
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          დაჯავშნა
        </button>
      </form>
    </div>
  );
}