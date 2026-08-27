import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourType: "Custom Tour",
    guests: "2",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // გვერდზე გადასვლისას რბილი სქროლი თავში
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // აქ შეგიძლიათ დაამატოთ API გაგზავნა
    setIsSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <span className={styles.subtitle}>START YOUR ADVENTURE</span>
          <h1>Let’s Plan Your Next Unforgettable Journey</h1>
          <p>
            Have questions about our tours, need a custom itinerary, or want local recommendations? 
            Our travel experts are here to help 24/7.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* 2. Quick Info Cards */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>📞</div>
            <h3>Call or WhatsApp Us</h3>
            <p>Direct line to our travel managers</p>
            <a href="tel:+995555123456" className={styles.contactLink}>+995 555 12 34 56</a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>✉️</div>
            <h3>Email Our Team</h3>
            <p>We typically reply within 2 hours</p>
            <a href="mailto:info@georgiantours.com" className={styles.contactLink}>info@georgiantours.com</a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>📍</div>
            <h3>Visit Our Office</h3>
            <p>Rustaveli Avenue 24, Tbilisi, Georgia</p>
            <span className={styles.subText}>Open Mon - Sun: 09:00 - 20:00</span>
          </div>
        </div>

        {/* 3. Form & Side Section */}
        <div className={styles.mainContent}>
          {/* Form */}
          <div className={styles.formContainer}>
            <h2>Send Us a Message</h2>
            <p className={styles.formDesc}>
              Fill out the form below and we will send you a personalized quote and itinerary within hours.
            </p>

            {isSubmitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>🎉</div>
                <h3>Thank You!</h3>
                <p>Your message has been received. Our team will get back to you shortly.</p>
                <button 
                  className={styles.resetBtn}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Interested In</label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                    >
                      <option value="Custom Tour">Custom Private Tour</option>
                      <option value="Kazbegi Tour">Kazbegi & Mountain Tour</option>
                      <option value="Wine Tour">Kakheti Wine Experience</option>
                      <option value="Svaneti Tour">Svaneti Multi-Day Trek</option>
                      <option value="General Query">General Question</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>How many travelers?</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">Solo Traveler (1)</option>
                    <option value="2">Couple (2)</option>
                    <option value="3-5">Small Group (3-5)</option>
                    <option value="6+">Large Group (6+)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Your Message / Special Requests *</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us about your preferred travel dates, interests, or any special requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Trip Request →
                </button>
              </form>
            )}
          </div>

          {/* Side Info / Why Choose Us */}
          <div className={styles.sideInfo}>
            <div className={styles.whyUsBox}>
              <h3>Why Plan With Us?</h3>
              <ul>
                <li>
                  <strong> Tailor-Made Itineraries:</strong> Every trip is customized to match your budget and interests.
                </li>
                <li>
                  <strong> Local Expert Guides:</strong> English & multi-language certified local guides.
                </li>
                <li>
                  <strong> 100% Price Transparency:</strong> No hidden charges, guaranteed best rates.
                </li>
                <li>
                  <strong> 24/7 Support:</strong> On-trip assistance from start to finish.
                </li>
              </ul>
            </div>

            <div className={styles.directContactBox}>
              <h3>Prefer Instant Chat?</h3>
              <p>Chat directly with our lead tour manager on WhatsApp for quick responses.</p>
              <a 
                href="https://wa.me/995555123456" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappBtn}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* 4. Map Section */}
        <section className={styles.mapSection}>
          <h2>Find Us in Tbilisi</h2>
          <p>Drop by our office for a cup of Georgian coffee and a chat about your itinerary.</p>
          <div className={styles.mapContainer}>
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.83547211152!2d44.7963428!3d41.7001402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd68a52efeb%3A0x8670df527f31c510!2sRustaveli%20Ave%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1700000000000!5m2!1sen!2sge"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>How far in advance should I book my tour?</h4>
              <p>We recommend booking at least 2–3 weeks in advance for summer tours, but we also accommodate last-minute bookings subject to guide availability.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I customize a pre-designed tour?</h4>
              <p>Absolutely! All our itineraries are 100% customizable. Mention your requests in the contact form, and we'll adjust the schedule.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What is your cancellation policy?</h4>
              <p>Free cancellation up to 48 hours before the tour start time. Full refund guaranteed.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Are airport transfers included?</h4>
              <p>Yes, we offer complimentary or discounted airport pick-up and drop-off with all multi-day tour packages.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}