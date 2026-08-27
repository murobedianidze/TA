import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { ALL_TOURS } from "../../pages/TOUR/Tour.jsx";

function Footer() {
  // ნელი და რბილი ამოსქროლვის ფუნქცია
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // <-- აქ შეიცვალა smooth-ზე!
    });
  };

  const getTourId = (query) => {
    if (!ALL_TOURS || !Array.isArray(ALL_TOURS)) return "/tours";
    const tour = ALL_TOURS.find(
      (t) =>
        t.region?.toLowerCase() === query.toLowerCase() ||
        t.title?.toLowerCase().includes(query.toLowerCase())
    );
    return tour ? `/tours/${tour.id}` : "/tours";
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.company}>
          <Link to="/" onClick={handleScrollToTop} className={styles.logo}>
            GEORGIA
            <span>TRAVEL & TOURS</span>
          </Link>

          <p>
            Discover the beauty of Georgia with us.
            Explore amazing places, experience local
            culture and create unforgettable memories.
          </p>

          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Quick Links</h3>

          <Link to="/" onClick={handleScrollToTop}>Home</Link>
          <Link to="/tour" onClick={handleScrollToTop}>Tours</Link>
          <Link to="/about" onClick={handleScrollToTop}>About Us</Link>
          <Link to="/contact" onClick={handleScrollToTop}>Contact</Link>
        </div>

        <div className={styles.column}>
          <h3>Top Destinations</h3>
          <p>Kazbegi & Caucasus</p>
          <p>Kakheti Wine Region</p>
          <p>Svaneti & Racha</p>
          <p>Borjomi & Vardzia</p>
          <p>Batumi & Adjara</p>
        </div>

        <div className={styles.column}>
          <h3>Contact Us</h3>

          <p>📍 Tbilisi, Georgia</p>
          <p>📞 +995 555 123 456</p>
          <p>✉️ info@georgiatravel.com</p>

          <Link to="/contact" onClick={handleScrollToTop} className={styles.button}>
            Book a Tour
          </Link>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 Georgia Travel & Tours</p>
        <p>Made with ❤️ in Georgia</p>
      </div>
    </footer>
  );
}

export default Footer;