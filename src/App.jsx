import React from "react";
import './index.css'; // თუ App.css გაქვთ, აქ App.css ჩაწერეთ
import Header from "./components/header/Header.jsx";
import AppRoutes from "./Routes";
import FooterComponent from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <FooterComponent />
    </>
  );
}

export default App;