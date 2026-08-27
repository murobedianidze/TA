import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // გვერდის ზემოთ ამოქაჩვის ფუნქცია ნავიგაციისას
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  // სქროლის ფუნქცია კონკრეტულ სექციამდე (მაგ. Reviews-სთვის)
  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* ლოგო */}
        <Link to="/" onClick={handleScrollToTop} className={styles.logo}>
          <div className={styles.logoIcon}>▲</div>
          <div className={styles.logoText}>
            <strong>GEORGIA</strong>
            <span>by Local Host</span>
          </div>
        </Link>

        {/* ნავიგაცია */}
        <nav className={styles.navMenu}>
          <NavLink 
            to="/" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/tour" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Tours
          </NavLink>
          
          <NavLink 
            to="/about" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            About Us
          </NavLink>
          
          {/* Reviews-ზე დაჭერისას ჩამოდის "Travel Differently" სექციასთან */}
          <a 
            href="#reviews-section" 
            className={styles.navLink}
            onClick={(e) => handleScrollTo(e, "reviews-section")}
          >
            Reviews
          </a>
          
          <NavLink 
            to="/blog" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Blog
          </NavLink>
          
          <NavLink 
            to="/contact" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* მარჯვენა ღილაკები */}
        <div className={styles.headerActions}>
          <a
            href="https://wa.me/995598520216"
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappIcon}
          >
            💬
          </a>
          <Link to="/contact" onClick={handleScrollToTop} className={styles.planBtn}>
            Plan My Trip
          </Link>
        </div>
      </div>
    </header>
  );
}