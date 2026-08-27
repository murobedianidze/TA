import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  // Behold Instagram Script-ის ჩატვირთვა
  useEffect(() => {
    if (!window.__bhldScript) {
      window.__bhldScript = true;
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://w.behold.so/widget.js";
      document.head.appendChild(script);
    }
  }, []);

  const scrollToTours = () => {
    const toursElement = document.getElementById("tours-section");
    if (toursElement) {
      toursElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={styles.homeContainer}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Discover</p>
          <h1 className={styles.heroTitle}>
            GEORGIA <br />
            <span>with a Local</span>
          </h1>
          <p className={styles.heroDesc}>
            Private & Small Group Tours Across Georgia. <br />
            Explore Georgia comfortably, safely and authentically with your own local driver and tour host.
          </p>

          <div className={styles.heroBtns}>
            <button type="button" className={styles.btnPrimary} onClick={scrollToTours}>
              Explore Tours
            </button>
            <button type="button" className={styles.btnSecondary} onClick={() => navigate("/contact")}>
              Plan My Trip
            </button>
          </div>

          <div className={styles.heroFeatures}>
            <span>🚗 Private Transportation</span>
            <span>👤 Local Tour Host</span>
            <span>🛡️ Safe & Reliable</span>
          </div>
        </div>
      </section>

      {/* 2. POPULAR EXPERIENCES */}
      <section id="tours-section" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.tagline}>EXPLORE GEORGIA</p>
            <h2>Popular Experiences</h2>
          </div>
          <button className={styles.textBtn} onClick={() => navigate("/tour")}>
            View All Tours →
          </button>
        </div>

        <div className={styles.grid4}>
          <div className={styles.card}>
            <img src="https://yolo.ge/images/locations/217/vUyYLkBehmrUoWztI08mukgyGpKCTE_596x431_c1_mr1_q90.jpg" alt="Kazbegi" />
            <div className={styles.cardBody}>
              <h3>Kazbegi & Caucasus Mountains</h3>
              <p className={styles.cardSub}>Mountains • Gergeti • Gudauri</p>
              <div className={styles.cardFooter}>
                <span>From <strong>€120</strong> / person</span>
                <button onClick={() => navigate("/tour")}>View Tour →</button>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <img src="https://allinonetravel.ge/wp-content/uploads/2025/03/Kakheti-Wine-Culture-Tour-1.webp" alt="Kakheti" />
            <div className={styles.cardBody}>
              <h3>Kakheti Wine Tour</h3>
              <p className={styles.cardSub}>Sighnaghi • Winery • Georgian food</p>
              <div className={styles.cardFooter}>
                <span>From <strong>€110</strong> / person</span>
                <button onClick={() => navigate("/tour")}>View Tour →</button>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <img src="https://gff.ge/under21/wp-content/uploads/2022/10/Tbilisi-1.jpg" alt="Tbilisi" />
            <div className={styles.cardBody}>
              <h3>Tbilisi & Mtskheta</h3>
              <p className={styles.cardSub}>Old Tbilisi • Mtskheta • Jvari</p>
              <div className={styles.cardFooter}>
                <span>From <strong>€80</strong> / person</span>
                <button onClick={() => navigate("/tour")}>View Tour →</button>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <img src="https://cdn.1tv.ge/app/uploads/2025/10/1761121847-1-3.jpeg" alt="Batumi" />
            <div className={styles.cardBody}>
              <h3>Batumi & Adjara</h3>
              <p className={styles.cardSub}>Waterfalls • Mountains • Batumi</p>
              <div className={styles.cardFooter}>
                <span>From <strong>€100</strong> / person</span>
                <button onClick={() => navigate("/tour")}>View Tour →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRAVEL DIFFERENTLY */}
      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.textCenter}>
          <p className={styles.tagline}>WHY TRAVEL WITH US?</p>
          <h2>Travel Differently</h2>
        </div>

        <div className={styles.grid6}>
          <div className={styles.iconBox}>
            <span className={styles.icon}>🗺️</span>
            <h4>Local Knowledge</h4>
            <p>We show you the real Georgia.</p>
          </div>
          <div className={styles.iconBox}>
            <span className={styles.icon}>🚘</span>
            <h4>Comfortable Transportation</h4>
            <p>Travel in modern, comfortable vehicles.</p>
          </div>
          <div className={styles.iconBox}>
            <span className={styles.icon}>📅</span>
            <h4>Flexible Itinerary</h4>
            <p>Your trip, your pace. We adjust for you.</p>
          </div>
          <div className={styles.iconBox}>
            <span className={styles.icon}>👤</span>
            <h4>Personal Service</h4>
            <p>We are with you from arrival to departure.</p>
          </div>
          <div className={styles.iconBox}>
            <span className={styles.icon}>🍷</span>
            <h4>Authentic Experiences</h4>
            <p>Local food, wine and unique places.</p>
          </div>
          <div className={styles.iconBox}>
            <span className={styles.icon}>👥</span>
            <h4>Small Groups & Private</h4>
            <p>Perfect for couples, families, friends.</p>
          </div>
        </div>
      </section>

      {/* 4. 7-DAY ITINERARY BANNER */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}>
          <p className={styles.taglineLight}>SAMPLE ITINERARY</p>
          <h2>7-Day Georgia Highlights</h2>

          <div className={styles.itineraryGrid}>
            <div className={styles.itineraryCard}>
              <span>Day 1</span>
              <h4>Tbilisi</h4>
              <p>Arrival, Old Tbilisi</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 2</span>
              <h4>Kazbegi</h4>
              <p>Ananuri, Gudauri</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 3</span>
              <h4>Kakheti</h4>
              <p>Sighnaghi, Winery</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 4</span>
              <h4>Borjomi</h4>
              <p>Park, Vardzia</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 5</span>
              <h4>Batumi</h4>
              <p>Boulevard, Sea</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 6</span>
              <h4>Adjara</h4>
              <p>Waterfalls, Mountains</p>
            </div>
            <div className={styles.itineraryCard}>
              <span>Day 7</span>
              <h4>Tbilisi</h4>
              <p>Shopping, Departure</p>
            </div>
          </div>

          <button className={styles.btnPrimary} onClick={() => navigate("/contact")}>
            Customize This Trip
          </button>
        </div>
      </section>

      {/* 5. REVIEWS & BEHOLD INSTAGRAM SECTION */}
      <section id="reviews-section" className={styles.socialSection}>
        <div className={styles.socialContainer}>
          
          {/* REVIEWS SIDE */}
          <div className={styles.reviewsSide}>
            <div className={styles.sectionHeaderCompact}>
              <p className={styles.tagline}>TESTIMONIALS</p>
              <h2>What Our Guests Say</h2>
            </div>

            <div className={styles.reviewsList}>
              <div className={styles.reviewCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.reviewText}>
                  "An unforgettable trip! Our guide made us feel so welcome and showed us hidden gems we would never have found on our own."
                </p>
                <div className={styles.reviewer}>
                  <strong>Sarah & Mark</strong>
                  <span>United Kingdom</span>
                </div>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.reviewText}>
                  "The wine tour in Kakheti was hands down the best experience of our Caucasus travel. Highly recommend!"
                </p>
                <div className={styles.reviewer}>
                  <strong>David L.</strong>
                  <span>Germany</span>
                </div>
              </div>
            </div>
          </div>

          {/* INSTAGRAM BEHOLD WIDGET */}
          <div className={styles.instaSide}>
            <div className={styles.sectionHeaderCompact}>
              <p className={styles.tagline}>FOLLOW OUR JOURNEY</p>
              <h2>Instagram @murobedianidze</h2>
            </div>

            {/* Behold HTML Element */}
            <behold-widget feed-id="PZ8pU4i7QDvjAUE8rbHy"></behold-widget>
          </div>

        </div>
      </section>

      {/* 6. FORM SECTION */}
      <section className={`${styles.section} ${styles.formSection}`}>
        <div className={styles.formContainer}>
          <div className={styles.formText}>
            <p className={styles.taglineLight}>PLAN YOUR TRIP</p>
            <h2>Let's Plan Your Perfect Georgia Trip</h2>
            <p>Tell us about your trip and we will create a personalized itinerary just for you.</p>
            
            <div className={styles.contactInfo}>
              <p>📱 <strong>WhatsApp:</strong> +995 598 52 02 16</p>
              <p>✉️ <strong>Email:</strong> info@georgiabylocal.ge</p>
            </div>
          </div>

          <form className={styles.bookingForm} onSubmit={(e) => e.preventDefault()}>
            <h3>Tell us about your trip</h3>
            <div className={styles.formGrid}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="WhatsApp / Phone" />
              <input type="date" placeholder="Travel Dates" />
            </div>
            <textarea placeholder="Additional Details or Special Requests..." rows="3"></textarea>
            <button type="submit" className={styles.submitBtn}>
              Send My Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}