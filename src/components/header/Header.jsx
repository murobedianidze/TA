import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthModal from "../AuthModal/AuthModal";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ჰამბურგერის სტატუსი

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setIsMobileMenuOpen(false); // ლინკზე დაჭერისას მენიუ იხურება
  };

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // მენიუს დახურვა

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

        {/* დესკტოპ ნავიგაცია */}
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

        {/* მარჯვენა ღილაკები (დესკტოპი) */}
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

          {user ? (
            <div className={styles.userActions}>
              <Link 
                to="/my-bookings" 
                onClick={handleScrollToTop}
                className={styles.myBookingsLink}
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className={styles.logoutBtn}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className={styles.signInBtn}
            >
              Sign In
            </button>
          )}
        </div>

        {/* ჰამბურგერის ღილაკი (ჩანს მხოლოდ მობილურზე) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className={styles.hamburgerBtn}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* მობილური ჩამოსაშლელი მენიუ */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <NavLink 
            to="/" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/tour" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
          >
            Tours
          </NavLink>
          
          <NavLink 
            to="/about" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
          >
            About Us
          </NavLink>
          
          <a 
            href="#reviews-section" 
            className={styles.mobileNavLink}
            onClick={(e) => handleScrollTo(e, "reviews-section")}
          >
            Reviews
          </a>
          
          <NavLink 
            to="/blog" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
          >
            Blog
          </NavLink>
          
          <NavLink 
            to="/contact" 
            onClick={handleScrollToTop}
            className={({ isActive }) => 
              isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
            }
          >
            Contact
          </NavLink>

          <div className={styles.mobileActions}>
            <a
              href="https://wa.me/995598520216"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappIcon}
            >
              💬 WhatsApp
            </a>
            <Link to="/contact" onClick={handleScrollToTop} className={styles.planBtn}>
              Plan My Trip
            </Link>

            {user ? (
              <div className={styles.userActionsMobile}>
                <Link 
                  to="/my-bookings" 
                  onClick={handleScrollToTop}
                  className={styles.myBookingsLink}
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className={styles.logoutBtn}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={styles.signInBtn}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* ავტორიზაციის მოდალური ფანჯარა */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}