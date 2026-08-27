import "./App.css"
import Header from "./components/header/Header.jsx"
import AppRoutes from "./Routes"
import FooterComponent from "./components/footer/Footer.jsx"
import { BrowserRouter } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
    <Header />
<AppRoutes />
<FooterComponent />
    </BrowserRouter>
  )
}

export default App
