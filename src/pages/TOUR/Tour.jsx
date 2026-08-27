import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Tour.module.css";

export const ALL_TOURS = [
  {
    id: 1,
    title: "Kazbegi & Gergeti Trinity Church",
    category: "mountains",
    region: "Kazbegi",
    image: "https://yolo.ge/images/locations/217/vUyYLkBehmrUoWztI08mukgyGpKCTE_596x431_c1_mr1_q90.jpg",
    duration: "1 Day",
    price: 120,
    highlights: ["Ananuri Fortress", "Gudauri Panorama", "Gergeti Trinity"],
    description: "Explore the most beautiful landscapes of Georgia. The tour starts early in the morning from Tbilisi. On the way, we will visit the picturesque Zhinvali Reservoir, the historical Ananuri Fortress, and the breathtaking Gudauri Panorama.",
    itinerary: [
      { time: "08:00", title: "Departure from Tbilisi", desc: "Meeting point: First Republic Square (Rose Revolution Square)" },
      { time: "09:30", title: "Zhinvali Reservoir & Ananuri Fortress", desc: "Photo stop and exploration of the historical fortress complex" },
      { time: "12:30", title: "Gudauri Panorama", desc: "Free time to enjoy stunning panoramic mountain views" },
      { time: "15:00", title: "Gergeti Trinity Church (Kazbegi)", desc: "4x4 off-road drive up to the church against the Caucasus peaks" }
    ]
  },
  {
    id: 2,
    title: "Kakheti Wine & Culture Experience",
    category: "wine",
    region: "Kakheti",
    image: "https://allinonetravel.ge/wp-content/uploads/2025/03/Kakheti-Wine-Culture-Tour-1.webp",
    duration: "1 Day",
    price: 110,
    highlights: ["Sighnaghi City of Love", "Wine Tasting", "Bodbe Monastery"],
    description: "Visit Kakheti, the cradle of Georgian wine. Enjoy walking through the charming streets of Sighnaghi, visit Bodbe Monastery, and taste traditional Qvevri wine in a local cellar.",
    itinerary: [
      { time: "09:00", title: "Departure from Tbilisi", desc: "Drive towards Kakheti wine region" },
      { time: "11:00", title: "Bodbe Monastery", desc: "Visit St. Nino's spring and beautiful monastic gardens" },
      { time: "12:30", title: "Sighnaghi - City of Love", desc: "Walk along the ancient fortress walls with views of Alazani Valley" },
      { time: "15:00", title: "Wine & Chacha Tasting", desc: "Explore a local wine cellar and taste traditional Qvevri wines" }
    ]
  },
  {
    id: 3,
    title: "Tbilisi Highlights & Ancient Mtskheta",
    category: "culture",
    region: "Tbilisi",
    image: "https://www.georgia-spirit.com/images/destinations/mtskheta-mtianeti/hero.jpg",
    duration: "1 Day",
    price: 80,
    highlights: ["Old Tbilisi", "Cable Car", "Jvari Monastery"],
    description: "Discover the ancient and modern capitals of Georgia. Explore historic streets, ride the cable car, visit Narikala Fortress, and marvel at the Svetitskhoveli Cathedral.",
    itinerary: [
      { time: "10:00", title: "Old Tbilisi Walking Tour", desc: "Explore Abanotubani sulfur baths, Leghvtakhevi waterfall, and Shardeni street" },
      { time: "12:00", title: "Narikala Fortress & Rike Park", desc: "Scenic cable car ride up to Narikala Fortress" },
      { time: "14:30", title: "Jvari Monastery", desc: "Enjoy panoramic views of the confluence of Mtkvari and Aragvi rivers" },
      { time: "16:00", title: "Svetitskhoveli Cathedral", desc: "Stroll through the historic streets of ancient Mtskheta" }
    ]
  },
  {
    id: 4,
    title: "Svaneti Mountain Exploration",
    category: "mountains",
    region: "Svaneti",
    image: "https://storage.georgia.travel/images/svaneti(1).webp",
    duration: "3 Days",
    price: 320,
    highlights: ["Mestia Towers", "Ushguli Village", "Chalaadi Glacier"],
    description: "An unforgettable 3-day journey among Svaneti's medieval towers and the highest peaks of the Caucasus Mountains. Visit Ushguli, one of the highest continuously inhabited settlements in Europe.",
    itinerary: [
      { time: "Day 1", title: "Tbilisi to Mestia", desc: "Scenic drive via Enguri Dam, check-in at guesthouse in Mestia" },
      { time: "Day 2", title: "Ushguli Excursion", desc: "Tower of Love, Lamaria Church, and views of Shkhara Glacier" },
      { time: "Day 3", title: "Chalaadi Glacier Hike", desc: "Light trekking to the glacier foot and departure back" }
    ]
  },
  {
    id: 5,
    title: "Vardzia Cave City & Rabati Castle",
    category: "culture",
    region: "Samtskhe-Javakheti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUMhT5oEnLyHkthb0czwkG4YCTK1AgeKak_dPRJz16_3uSkU8_A_Sipk&s=10",
    duration: "1 Day",
    price: 130,
    highlights: ["Vardzia Cave Monastery", "Rabati Castle", "Borjomi Park"],
    description: "Travel through the historical monuments of Samtskhe-Javakheti. Discover the grandiose cave city of Vardzia carved into the cliffs and the multicultural Rabati Castle complex.",
    itinerary: [
      { time: "08:00", title: "Departure from Tbilisi", desc: "Drive via Borjomi gorge" },
      { time: "11:00", title: "Rabati Castle", desc: "Explore the multicultural castle complex in Akhaltsikhe" },
      { time: "14:00", title: "Vardzia Cave Complex", desc: "Discover the 12th-century cave monastery carved into the cliff" }
    ]
  },
  {
    id: 6,
    title: "Prometheus Cave & Martvili Canyon",
    category: "nature",
    region: "Imereti",
    image: "https://www.turebi.ge/uploads/photos/tours1/large/39632_1.jpg",
    duration: "1 Day",
    price: 115,
    highlights: ["Martvili Boat Tour", "Prometheus Cave", "Kutaisi"],
    description: "Experience the natural wonders of Imereti and Samegrelo. Enjoy a scenic boat ride in Martvili Canyon and walk through the illuminated stalactite halls of Prometheus Cave.",
    itinerary: [
      { time: "07:30", title: "Departure from Tbilisi", desc: "Drive towards Western Georgia" },
      { time: "11:30", title: "Martvili Canyon", desc: "Scenic boat ride along the emerald canyon waters" },
      { time: "15:00", title: "Prometheus Cave", desc: "Guided underground walk among illuminated stalactites and stalagmites" }
    ]
  },
  {
    id: 7,
    title: "Batumi Coast & Mountainous Adjara",
    category: "sea",
    region: "Adjara",
    image: "https://cdn.1tv.ge/app/uploads/2025/10/1761121847-1-3.jpeg",
    duration: "2 Days",
    price: 210,
    highlights: ["Batumi Boulevard", "Makhuntseti Waterfall", "Botanical Garden"],
    description: "The perfect synthesis of the sea and mountains in Adjara. Walk along the Batumi Boulevard, explore the lush Botanical Garden, and visit the stunning Makhuntseti Waterfall.",
    itinerary: [
      { time: "Day 1", title: "Batumi City Tour", desc: "Batumi Boulevard, Ali & Nino statue, and Botanical Garden" },
      { time: "Day 2", title: "Mountainous Adjara", desc: "Makhuntseti Waterfall, Queen Tamar Stone Bridge, and Mirveti Waterfall" }
    ]
  },
  {
    id: 8,
    title: "Truso Valley 4x4 Off-Road Adventure",
    category: "mountains",
    region: "Kazbegi",
    image: "https://cdn.georgiantravelguide.com/storage/files/trusos-xeoba-truso-valley-1.jpg",
    duration: "1 Day",
    price: 140,
    highlights: ["Off-road drive", "Mineral Springs", "Abandoned Villages"],
    description: "An exciting 4x4 off-road adventure through Truso Valley. Discover mineral springs, abandoned historical villages, and unique orange travertine formations.",
    itinerary: [
      { time: "08:30", title: "Departure for Kazbegi", desc: "4x4 Jeep transfer to the valley entrance" },
      { time: "11:30", title: "Truso Valley Exploration", desc: "Off-road tour, walking near mineral travertine lakes and Abano fortress" }
    ]
  },
  {
    id: 9,
    title: "Tusheti 4x4 Wild Mountains Tour",
    category: "mountains",
    region: "Tusheti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDHV_wIEQdi0n0oekbUBmSYv0Xj39KJY4JkxQKbJgZIZSWfG646GlC4o&s=10",
    duration: "4 Days",
    price: 450,
    highlights: ["Abano Pass", "Omalo Fortresses", "Dartlo Village"],
    description: "An extreme and breathtaking 4-day wild mountain tour in Tusheti. Cross the famous Abano Pass, explore Omalo and Dartlo, and immerse yourself in untouched alpine nature.",
    itinerary: [
      { time: "Day 1", title: "Abano Pass & Omalo", desc: "Drive over one of Europe's highest mountain passes to Keselo towers in Omalo" },
      { time: "Day 2", title: "Dartlo & Kvavlo Villages", desc: "Discover iconic Tushetian stone architecture and medieval fortress towers" },
      { time: "Day 3", title: "Shenako & Diklo", desc: "Border village exploration surrounded by pine forests" },
      { time: "Day 4", title: "Return to Tbilisi", desc: "Scenic drive back over the mountain pass" }
    ]
  },
  {
    id: 10,
    title: "Racha Scenic Escape & Khvanchkara",
    category: "wine",
    region: "Racha",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTti6gyq6wm0WbU8DxTuKYsujVKMWIePVV_jKKZwVmeShFGKHKm1PlmWM5i&s=10",
    duration: "2 Days",
    price: 230,
    highlights: ["Shaori Reservoir", "Nikortsminda", "Khvanchkara Tasting"],
    description: "A scenic 2-day getaway to Racha. Relax by the serene Shaori Reservoir, admire the medieval Nikortsminda Cathedral, and taste authentic Khvanchkara wine right at its origin.",
    itinerary: [
      { time: "Day 1", title: "Shaori Lake & Nikortsminda", desc: "Stop at Shaori Reservoir and visit the 11th-century Nikortsminda Cathedral" },
      { time: "Day 2", title: "Khvanchkara Wine Tour", desc: "Visit Khvanchkara village for authentic wine tasting at a local winery" }
    ]
  },
  {
    id: 11,
    title: "David Gareja Monastery & Rainbow Mountains",
    category: "culture",
    region: "Kakheti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkL5nKHsLhMtt1mVo49J12M5qWO9dPkO-cA5g-832H0bc7Mx8bcbj12JTf&s=10",
    duration: "1 Day",
    price: 95,
    highlights: ["Cave Monastery", "Colored Desert Hills", "Udabno Village"],
    description: "Journey into the Gareja semi-desert. Visit the ancient David Gareja cave monastery complex and marvel at the surrounding colorful mineral-striped hills.",
    itinerary: [
      { time: "09:00", title: "Departure from Tbilisi", desc: "Drive through the semi-desert landscape towards Udabno" },
      { time: "11:00", title: "Rainbow Hills", desc: "Walk along the vibrant mineral-striped colorful desert hills" },
      { time: "13:00", title: "David Gareja Monastery", desc: "Explore the Lavra cave monastery complex" }
    ]
  },
  {
    id: 12,
    title: "Uplistsikhe Cave Town & Gori",
    category: "culture",
    region: "Shida Kartli",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfmPS4-9raZWAoNVSmApcVmqGg35NnTweljggQ3i7A033BwmgGZJA2y-G&s=10",
    duration: "1 Day",
    price: 90,
    highlights: ["Pagan Cave City", "Stalin Museum", "Gori Fortress"],
    description: "Step back into ancient Georgian history. Explore Uplistsikhe, an ancient pagan cave city carved into rock, and visit the historic Gori Fortress and Stalin Museum.",
    itinerary: [
      { time: "09:30", title: "Departure from Tbilisi", desc: "Drive into the Shida Kartli region" },
      { time: "11:00", title: "Uplistsikhe Cave City", desc: "Explore the ancient rock-cut town dating back to the 1st millennium BC" },
      { time: "14:00", title: "Gori Highlights", desc: "Visit Gori Fortress and the Stalin Museum (optional)" }
    ]
  },
  {
    id: 13,
    title: "Okatse Canyon & Kinchkha Waterfall",
    category: "nature",
    region: "Imereti",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600",
    duration: "1 Day",
    price: 110,
    highlights: ["Suspended Bridge Walk", "Kinchkha Falls", "Gordi Park"],
    description: "Combine thrill and nature in Imereti. Walk along the sky-high suspended bridges over Okatse Canyon and marvel at the majestic cascade of Kinchkha Waterfall.",
    itinerary: [
      { time: "08:00", title: "Departure from Tbilisi", desc: "Drive towards Khoni municipality" },
      { time: "12:00", title: "Okatse Canyon", desc: "Walk along the sky-high suspended cliffside promenade" },
      { time: "14:30", title: "Kinchkha Waterfall", desc: "Discover the massive cascading waterfall and natural river pools" }
    ]
  },
  {
    id: 14,
    title: "Khevsureti & Mysterious Shatili",
    category: "mountains",
    region: "Khevsureti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtz76MefvLN25ka-gleIIRYn_u7xpWe6QHa8Urufwf2UijnMy2ZTabp4&s=10",
    duration: "2 Days",
    price: 260,
    highlights: ["Datvisjvari Pass", "Shatili Fortress", "Mutso Citadel"],
    description: "Unveil mysterious Khevsureti. Drive through Datvisjvari Pass, explore the fortified cliffside village of Shatili, and climb to the legendary citadel of Mutso.",
    itinerary: [
      { time: "Day 1", title: "Datvisjvari Pass & Shatili", desc: "Scenic mountain pass drive and guided walk in Shatili fortress village" },
      { time: "Day 2", title: "Mutso & Anatori Tombs", desc: "Hike up to Mutso Citadel, visit Anatori medieval vault tombs, and return" }
    ]
  },
  {
    id: 15,
    title: "Borjomi Spa & Bakuriani Resort",
    category: "nature",
    region: "Samtskhe-Javakheti",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/6f/6e/61.jpg",
    duration: "1 Day",
    price: 105,
    highlights: ["Borjomi Central Park", "Mineral Waters", "Bakuriani Cable Car"],
    description: "Enjoy a relaxing walk through Borjomi Central Park, taste fresh natural mineral spring water, and take a scenic cable car ride in the mountain resort of Bakuriani.",
    itinerary: [
      { time: "09:00", title: "Departure from Tbilisi", desc: "Drive towards Borjomi Spa Valley" },
      { time: "11:30", title: "Borjomi Central Park", desc: "Taste natural hot mineral springs and enjoy a park walk" },
      { time: "14:30", title: "Bakuriani Ski Resort", desc: "Cable car ride up Kokhta or Didveli peaks" }
    ]
  },
  {
    id: 16,
    title: "Kutaisi Heritage & Gelati Monastery",
    category: "culture",
    region: "Imereti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AR5E1wyYrD3149VJY_NeceKvSxxnB_EaJDWiOMs2lg&s=10",
    duration: "1 Day",
    price: 100,
    highlights: ["Bagrati Cathedral", "Gelati Monastery", "Kutaisi Farmer Market"],
    description: "Discover the rich cultural heritage of Kutaisi. Visit the UNESCO-listed Gelati Monastery Academy, Bagrati Cathedral, and the vibrant local farmers' market.",
    itinerary: [
      { time: "08:30", title: "Departure from Tbilisi", desc: "Drive to the ancient city of Kutaisi" },
      { time: "12:00", title: "Gelati Monastery", desc: "Visit the UNESCO World Heritage medieval monastic complex and academy" },
      { time: "14:00", title: "Bagrati Cathedral & Green Market", desc: "Panoramic city views and exploration of the authentic local farmers' market" }
    ]
  },
  {
    id: 17,
    title: "Kintrishi Nature Reserve & Mtirala National Park",
    category: "nature",
    region: "Adjara",
    image: "https://www.nationalparks.ge/files/155255352398%E1%83%99%E1%83%98%E1%83%9C%E1%83%A2%E1%83%A0%E1%83%98%E1%83%A8%E1%83%983.jpg",
    duration: "1 Day",
    price: 115,
    highlights: ["Rainforest Trekking", "Zipline Experience", "Stone Arch Bridges"],
    description: "Immerse yourself in Adjara's rainforest nature. Trek through Mtirala National Park, fly on ziplines, and discover ancient stone arch bridges built during Queen Tamar's reign.",
    itinerary: [
      { time: "09:00", title: "Departure from Batumi", desc: "Drive into Mtirala National Park" },
      { time: "10:30", title: "Mtirala Rainforest Trekking", desc: "Hike to the mountain lake and waterfall, optional zipline ride" },
      { time: "14:00", title: "Kintrishi Reserve", desc: "Visit Khino Monastery and ancient Queen Tamar stone arch bridges" }
    ]
  },
  {
    id: 18,
    title: "Telavi & Tsinandali Estate Wine Tour",
    category: "wine",
    region: "Kakheti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMyRxiKNTE5kKGU-jHh2rz_CaO75F5CHlKIeEOIu3I0cQQ8ER0TEQ_Uh_&s=10",
    duration: "1 Day",
    price: 125,
    highlights: ["Chavchavadze Palace", "Chateau Zegaani", "Telavi Market"],
    description: "Visit Prince Alexander Chavchavadze's historic Tsinandali Estate, walk through its beautiful French park, and explore the historic town center of Telavi.",
    itinerary: [
      { time: "09:00", title: "Departure from Tbilisi", desc: "Drive via scenic Gombori Mountain Pass" },
      { time: "11:30", title: "Tsinandali Estate", desc: "Tour Chavchavadze palace, French gardens, and historic wine enotheque" },
      { time: "14:30", title: "Telavi Old Town", desc: "Visit King Erekle II Fortress and the 900-year-old Giant Plane Tree" }
    ]
  },
  {
    id: 19,
    title: "Juta Valley & Chaukhi Dolomites Trekking",
    category: "mountains",
    region: "Kazbegi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IfTRAnQo8AlqMUF_TWeZKuw3Nc6g8KLsB63tCUWKjPv6w3Gx9Ii7qVfT&s=10",
    duration: "1 Day",
    price: 135,
    highlights: ["Fifth Season Camp", "Chaukhi Pass Trek", "Mountain Streams"],
    description: "Trek through the picturesque Juta Valley towards the dramatic Chaukhi mountain range. Enjoy crystal-clear mountain streams and visit the famous Fifth Season mountain camp.",
    itinerary: [
      { time: "08:00", title: "Departure from Tbilisi", desc: "Drive to high-altitude Juta village" },
      { time: "11:30", title: "Juta Valley Walk", desc: "Ascend to Fifth Season mountain camp" },
      { time: "13:00", title: "Chaukhi Lakes Trek", desc: "Trek along mountain streams beneath the dramatic Chaukhi peaks" }
    ]
  },
  {
    id: 20,
    title: "Katskhi Pillar & Chiatura Cable Cars",
    category: "culture",
    region: "Imereti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp916YlofG7r6P3e7GbpXWmGDpnSWp8Ra-RUAnq_vsvZTMKH0hrt6unpE&s=10",
    duration: "1 Day",
    price: 120,
    highlights: ["Katskhi Monastic Pillar", "Chiatura Ropeways", "Mghvimevi Monastery"],
    description: "Marvel at Katskhi Pillar, a 40-meter limestone monolith topped with a medieval hermitage monastery, and experience riding Chiatura's renovated cable cars.",
    itinerary: [
      { time: "08:30", title: "Departure from Tbilisi", desc: "Drive towards the mining city of Chiatura" },
      { time: "11:30", title: "Katskhi Pillar", desc: "Admire the 40-meter limestone monolith and surrounding hermitage complex" },
      { time: "14:00", title: "Chiatura Ropeways", desc: "Ride renovated cable cars and visit Mghvimevi Cave Monastery" }
    ]
  },
  {
    id: 21,
    title: "Kvatakhevi Monastery & Kavtiskhevi Valley",
    category: "culture",
    region: "Shida Kartli",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5S3hg8lRCcB755n7m937xocNNbQz2_nRjDGO30vcnMA&s=10",
    duration: "1 Day",
    price: 85,
    highlights: ["12th-Century Kvatakhevi Monastery", "Trail in Dzama Canyon", "Local Lunch & Picnic"],
    description: "Visit the 12th-century Kvatakhevi Monastery nestled in a secluded forested gorge. Enjoy a peaceful day combining culture, history, and tranquil nature.",
    itinerary: [
      { time: "09:30", title: "Departure from Tbilisi", desc: "Drive towards Kavtiskhevi gorge" },
      { time: "11:00", title: "Kvatakhevi Monastery", desc: "Explore the 12th-century monastery and forested courtyard" },
      { time: "13:30", title: "Nature Picnic & Walk", desc: "Relaxing outdoor lunch break surrounded by nature" }
    ]
  }
];
export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredTours = ALL_TOURS.filter((tour) => {
    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory;
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.toursPage}>
      <section className={styles.toursHero}>
        <div className={styles.heroOverlay}>
          <h1>All Tours & Experiences</h1>
          <p>Explore our wide range of private & small group guided trips across Georgia</p>
        </div>
      </section>

      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Search destination or tour..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.categoryBtns}>
          <button className={selectedCategory === "all" ? styles.activeCategory : ""} onClick={() => setSelectedCategory("all")}>All Tours</button>
          <button className={selectedCategory === "mountains" ? styles.activeCategory : ""} onClick={() => setSelectedCategory("mountains")}>Mountains</button>
          <button className={selectedCategory === "wine" ? styles.activeCategory : ""} onClick={() => setSelectedCategory("wine")}>Wine & Food</button>
          <button className={selectedCategory === "culture" ? styles.activeCategory : ""} onClick={() => setSelectedCategory("culture")}>Culture & History</button>
          <button className={selectedCategory === "sea" ? styles.activeCategory : ""} onClick={() => setSelectedCategory("sea")}>Sea & Coast</button>
        </div>
      </div>

      <section className={styles.toursGridSection}>
        <div className={styles.grid}>
          {filteredTours.map((tour) => (
            <div key={tour.id} className={styles.tourCard}>
              <div className={styles.imageContainer}>
                <img src={tour.image} alt={tour.title} />
                <span className={styles.badge}>{tour.duration}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.regionTag}>{tour.region}</span>
                <h3>{tour.title}</h3>
                
                <ul className={styles.highlightsList}>
                  {tour.highlights.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <div>
                    <span className={styles.priceLabel}>From</span>
                    <strong className={styles.priceVal}>€{tour.price}</strong>
                  </div>
                  <button className={styles.bookBtn} onClick={() => navigate(`/tour/${tour.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}