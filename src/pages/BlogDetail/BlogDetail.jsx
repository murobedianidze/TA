import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./BlogDetail.module.css";

// ყველა 6 სტატიის სრული მონაცემები
const posts = [
  {
    id: 1,
    title: "Ultimate 3-Day Kazbegi Itinerary: Hiking, Views & History",
    category: "Travel Guides",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    image: "https://gamarjobageorgiatours.com/wp-content/uploads/2023/03/Kazbegi-with-gamarjobageorgiatours.jpg",
    tourLink: "/tour/1",
    tourName: "Kazbegi & Gergeti Trinity Tour",
    content: `
      Kazbegi is one of the most iconic mountain destinations in Georgia. Located along the famous Georgian Military Highway, this region offers dramatic landscapes, high peaks, and rich history.

      Day 1: Arriving in Stepantsminda & Gergeti Trinity Church
      Start your journey from Tbilisi, heading north toward the Caucasus Mountains. On the way, stop at the Ananuri Fortress Complex overlooking the turquoise Zhinvali Reservoir. Once you arrive in Stepantsminda, hike or take a 4x4 drive up to the legendary Gergeti Trinity Church (2,170 meters above sea level).

      Day 2: Hiking to Gergeti Glacier
      For outdoor enthusiasts, the hike toward the Gergeti Glacier offers breathtaking panoramas of Mount Kazbek (5,054m). The trail starts right behind the Gergeti Church and winds up through mountain meadows.

      Day 3: Truso Valley & Dariali Gorge
      On your final day, explore the mineral springs and abandoned villages of Truso Valley, or visit the dramatic Dariali Gorge near the border.
    `
  },
  {
    id: 2,
    title: "Georgian Wine 101: Understanding Qvevri & Ancient Traditions",
    category: "Food & Wine",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiba42O_P-uwDuIx2YNA8h64haZOswd-5MPzCqtWHcYqBNr9xta9N_I8&s=10",
    tourLink: "/tour/2",
    tourName: "Kakheti Wine Tasting Tour",
    content: `
      Georgia is widely recognized as the birthplace of wine, with evidence of winemaking dating back over 8,000 years. 

      What makes Georgian wine unique is the traditional Qvevri method — large egg-shaped clay vessels buried underground where grape juice, skins, seeds, and stems ferment naturally together.

      In 2013, UNESCO added the traditional Georgian Qvevri winemaking method to its list of Intangible Cultural Heritage. During your tour of Kakheti, you will visit historic cellars, taste amber wines, and learn how local winemakers keep this ancient craft alive.
    `
  },
  {
    id: 3,
    title: "Svaneti Towers: The Hidden Secrets of High Caucasus Fortresses",
    category: "Culture",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxq_owY5CvopPmw3S8xipzCyHUXISVSemqR06UGDnRBCo-q6IYCgUr9APA&s=10",
    tourLink: "/tour/3",
    tourName: "Svaneti & Ushguli Mountain Tour",
    content: `
      Nestled deep within the Greater Caucasus, Svaneti is a land of dramatic glaciers, snow-capped peaks, and medieval stone towers.

      These iconic Svan towers (Koshki) were built between the 9th and 12th centuries to protect families from invaders, natural avalanches, and local feuds.

      Visiting Ushguli — one of Europe's highest continuously inhabited settlements — feels like stepping back into the Middle Ages. The backdrop of Mount Shkhara (5,193m) renders this UNESCO World Heritage Site truly unforgettable.
    `
  },
  {
    id: 4,
    title: "First Time in Georgia? 10 Crucial Travel Tips You Need to Know",
    category: "Tips",
    date: "Jul 20, 2026",
    readTime: "4 min read",
    image: "https://www.advantour.com/img/georgia/symbolics/georgia-flag.jpg",
    tourLink: "/tour",
    tourName: "All Georgia Guided Highlights Tour",
    content: `
      Planning your first trip to Georgia? Here are crucial local tips to ensure a seamless and unforgettable adventure:

      1. Currency & Payments: The currency is the Georgian Lari (GEL). While credit cards are widely accepted in Tbilisi, keep cash handy for mountain regions.
      2. Hospitality: Georgians consider guests to be a gift from God. Prepare to experience unprecedented warmth and generous supra (feasts).
      3. Transportation: Marshrutkas (minibuses) are popular, but booking private or small-group tours is far more comfortable for mountain roads.
      4. Dress Code: When visiting churches and monasteries, long pants for men and headscarves/skirts for women are required.
    `
  },
  {
    id: 5,
    title: "Top 5 Dishes You Must Try Beyond Khachapuri and Khinkali",
    category: "Food & Wine",
    date: "Jul 12, 2026",
    readTime: "5 min read",
    image: "https://www.orexca.com/img/georgia/cuisine/georgian-cuisine.jpg",
    tourLink: "/tour/2",
    tourName: "Culinary & Wine Masterclass Tour",
    content: `
      Georgian gastronomy stretches far beyond the legendary Khachapuri cheese bread and Khinkali dumplings. Here are 5 must-try dishes:

      1. Shkmeruli: Succulent chicken pan-roasted in a rich, velvety garlic-milk sauce.
      2. Badrijani Nigvzit: Fried eggplant rolls stuffed with seasoned walnut paste and topped with pomegranate seeds.
      3. Lobio in Clay Pot: Slow-cooked spiced kidney bean stew served with traditional mchadi (cornbread).
      4. Chakapuli: A spring stew prepared with tender lamb or veal, tarragon, green plums, and white wine.
      5. Elarji: Megrelian cornmeal porridge loaded with stretchy Sulguni cheese.
    `
  },
  {
    id: 6,
    title: "A Complete Guide to Kakheti: Georgia's Scenic Wine Region",
    category: "Travel Guides",
    date: "Jul 05, 2026",
    readTime: "8 min read",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJQopY_XROLmsu71CmV_7sPCpgX1X4q-yJLwLD9uVjS7ts7WffECRyme3&s=10",
    tourLink: "/tour/2",
    tourName: "Kakheti Full-Day Wine & Heritage Experience",
    content: `
      Kakheti, eastern Georgia's principal wine-growing territory, is a sanctuary of rolling vineyards, ancient fortresses, and charming towns.

      Highlights of Kakheti:
      • Sighnaghi: Known as the "City of Love", this hilltop town features narrow cobblestone streets, red-tiled roofs, and defensive walls with panoramic views of the Alazani Valley.
      • Telavi: The main city of Kakheti, surrounded by historic royal palaces and giant plane trees.
      • Bodbe Monastery: A serene monastic complex and burial place of Saint Nino, who brought Christianity to Georgia in the 4th century.
    `
  }
];

export default function BlogDetail() {
  const { id } = useParams();

  // რბილი (smooth) და ნელი სქროლი ეკრანის თავში
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [id]);

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div style={{ padding: "140px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2>Article Not Found</h2>
        <p style={{ margin: "20px 0" }}>The requested article does not exist or has been moved.</p>
        <Link to="/blog" style={{ color: "#ff5a5f", fontWeight: "600" }}>
          ← Back to All Articles
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      {/* 1. Header image & info */}
      <div className={styles.hero}>
        <img src={post.image} alt={post.title} />
        <div className={styles.heroOverlay}>
          <span className={styles.category}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <Link to="/blog" className={styles.backLink}>← Back to All Articles</Link>

        {/* 2. Article Text Content */}
        <div className={styles.content}>
          {post.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))}
        </div>

        {/* 3. Call to Action (ტურის მიბმა ბლოგთან) */}
        {post.tourLink && (
          <div className={styles.tourBox}>
            <h3>Want to Experience This Trip Yourself?</h3>
            <p>Book our guided <strong>{post.tourName}</strong> and let us handle all details!</p>
            <Link to={post.tourLink} className={styles.bookBtn}>
              Book Related Tour Now →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}