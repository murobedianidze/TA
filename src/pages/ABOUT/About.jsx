import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "15k+", label: "Happy Tourists" },
    { number: "150+", label: "Unique Destinations" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  const features = [
    {
      icon: "🏔️",
      title: "Local Expertise",
      description: "Our guides are certified locals who know every hidden gem and secret trail in Georgia."
    },
    {
      icon: "🛡️",
      title: "Safety & Comfort",
      description: "We provide modern, comfortable transportation and full insurance coverage for all trips."
    },
    {
      icon: "✨",
      title: "Tailored Experiences",
      description: "From budget trips to luxury custom itineraries, we design experiences around your desires."
    },
    {
      icon: "🍷",
      title: "Authentic Culture",
      description: "Experience genuine Georgian hospitality, traditional wine tasting, and authentic cuisine."
    }
  ];

  const team = [
    {
      name: "Giorgi Beridze",
      role: "Founder & Lead Guide",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Nino Kapanadze",
      role: "Tour Coordinator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Luka Shengelia",
      role: "Adventure & Hiking Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>Discover Georgia With Us</h1>
          <p>We craft unforgettable journeys through the heart of the Caucasus.</p>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <span className={styles.badge}>OUR STORY</span>
              <h2>Passionate About Showing the Real Georgia</h2>
              <p>
                Founded in 2016, Georgia Travel & Tours began with a simple passion: to share the breathtaking landscapes, ancient history, and world-renowned hospitality of Georgia with travelers worldwide.
              </p>
              <p>
                What started as a small group of local guides has grown into a full-service agency. We don't just sell tours; we create immersive cultural journeys and lifelong memories.
              </p>
            </div>
            <div className={styles.storyImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80" 
                alt="Georgia Mountains" 
                className={styles.storyImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Why Travel With Us?</h2>
            <p>Here is what makes our journeys special and unforgettable.</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((item, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Meet Our Team</h2>
            <p>The local experts passionate about guiding your next adventure.</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImgWrapper}>
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Explore Georgia?</h2>
          <p>Book your tour today or contact us to build a custom itinerary.</p>
          <Link to="/tours" className={styles.ctaButton}>Explore Our Tours</Link>
        </div>
      </section>
    </div>
  );
}

export default About;