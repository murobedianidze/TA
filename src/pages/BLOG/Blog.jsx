import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Travel Guides", "Food & Wine", "Culture", "Tips"];

  // ბლოგ სტატიების მონაცემები
  const posts = [
    {
      id: 1,
      title: "Ultimate 3-Day Kazbegi Itinerary: Hiking, Views & History",
      category: "Travel Guides",
      date: "Aug 15, 2026",
      readTime: "6 min read",
      image: "https://gamarjobageorgiatours.com/wp-content/uploads/2023/03/Kazbegi-with-gamarjobageorgiatours.jpg",
      excerpt: "Discover the iconic Gergeti Trinity Church, hike to Gergeti Glacier, and experience the magical mountain views of Mount Kazbek.",
      isFeatured: true
    },
    {
      id: 2,
      title: "Georgian Wine 101: Understanding Qvevri & Ancient Traditions",
      category: "Food & Wine",
      date: "Aug 10, 2026",
      readTime: "5 min read",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiba42O_P-uwDuIx2YNA8h64haZOswd-5MPzCqtWHcYqBNr9xta9N_I8&s=10",
      excerpt: "Learn why Georgia is known as the Cradle of Wine and how UNESCO-recognized 8,000-year-old Qvevri winemaking works."
    },
    {
      id: 3,
      title: "Svaneti Towers: The Hidden Secrets of High Caucasus Fortresses",
      category: "Culture",
      date: "Jul 28, 2026",
      readTime: "7 min read",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxq_owY5CvopPmw3S8xipzCyHUXISVSemqR06UGDnRBCo-q6IYCgUr9APA&s=10",
      excerpt: "Step back into the Middle Ages with a journey to Mestia and Ushguli, Europe’s highest continuously inhabited settlement."
    },
    {
      id: 4,
      title: "First Time in Georgia? 10 Crucial Travel Tips You Need to Know",
      category: "Tips",
      date: "Jul 20, 2026",
      readTime: "4 min read",
      image: "https://www.advantour.com/img/georgia/symbolics/georgia-flag.jpg",
      excerpt: "From transport tips and currency advice to Georgian hospitality etiquette, here is everything you need before landing."
    },
    {
      id: 5,
      title: "Top 5 Dishes You Must Try Beyond Khachapuri and Khinkali",
      category: "Food & Wine",
      date: "Jul 12, 2026",
      readTime: "5 min read",
      image: "https://www.orexca.com/img/georgia/cuisine/georgian-cuisine.jpg",
      excerpt: "Explore Shkmeruli, Badrijani Nigvzit, Lobio, and other mouthwatering authentic culinary gems of Georgian cuisine."
    },
    {
      id: 6,
      title: "A Complete Guide to Kakheti: Georgia's Scenic Wine Region",
      category: "Travel Guides",
      date: "Jul 05, 2026",
      readTime: "8 min read",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJQopY_XROLmsu71CmV_7sPCpgX1X4q-yJLwLD9uVjS7ts7WffECRyme3&s=10",
      excerpt: "Explore Sighnaghi the City of Love, Telavi, ancient monasteries, and endless picturesque vineyards in Kakheti."
    }
  ];

  // გაფილტვრა კატეგორიისა და ძებნის მიხედვით
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((post) => post.isFeatured);

  return (
    <div className={styles.blogPage}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>GEORGIA TRAVEL BLOG</span>
          <h1>Stories, Guides & Travel Inspiration</h1>
          <p>Explore expert travel advice, local secrets, and stunning itineraries for your next adventure.</p>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search articles, guides, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* 2. Category Filters */}
        <div className={styles.categoriesWrapper}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Featured Article (მხოლოდ მაშინ როცა All-ზეა და ძებნა ცარიელია) */}
        {activeCategory === "All" && !searchQuery && featuredPost && (
          <section className={styles.featuredSection}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <img src={featuredPost.image} alt={featuredPost.title} />
                <span className={styles.tag}>{featuredPost.category}</span>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.meta}>
                  <span>📅 {featuredPost.date}</span>
                  <span>⏱️ {featuredPost.readTime}</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className={styles.featuredActions}>
                  <Link to={`/blog/${featuredPost.id}`} className={styles.readBtn}>
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. Blog Posts Grid */}
        <section className={styles.gridSection}>
          <h2 className={styles.sectionTitle}>
            {activeCategory === "All" ? "Latest Articles" : `${activeCategory} Articles`}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className={styles.noResults}>
              <h3>No articles found</h3>
              <p>Try searching for a different keyword or category.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <article key={post.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={post.image} alt={post.title} />
                    <span className={styles.cardTag}>{post.category}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.meta}>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <Link to={`/blog/${post.id}`} className={styles.linkBtn}>
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* 5. Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Get Travel Guides & Special Offers</h2>
          <p>Subscribe to our newsletter to receive weekly travel tips and exclusive discounts on Georgian tours.</p>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <input type="email" placeholder="Enter your email address..." required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;