import TourPage from "../pages/TOUR/Tour.jsx";
import AboutPage from "../pages/ABOUT/About.jsx";
import ContactPage from "../pages/CONTACT/Contact.jsx";
import HomePage from "../pages/Home/Home.jsx";
import TourDetail from "../pages/TourDetail/TourDetail.jsx";
import BlogPage from "../pages/BLOG/Blog.jsx";
import BlogDetail from "../pages/BlogDetail/BlogDetail.jsx";

export const ROUTES = {
  HOME: "/",
  TOUR: "/tour",
  TOUR_DETAILS: "/tour/:id", 
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:id" // <-- ჩასწორდა დინამიურ პარამეტრზე (:id)
};

export const APP_ROUTES = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.TOUR,
    element: <TourPage />,
  },
  { 
    path: ROUTES.TOUR_DETAILS, 
    element: <TourDetail /> 
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutPage />,
  },
  {
    path: ROUTES.BLOG,
    element: <BlogPage />
  },
  {
    path: ROUTES.BLOG_DETAIL, // <-- გამოიყენეთ ROUTES კონსტანტა
    element: <BlogDetail />
  },
  {
    path: ROUTES.CONTACT,
    element: <ContactPage />,
  },
];