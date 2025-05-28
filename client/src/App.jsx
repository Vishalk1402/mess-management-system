import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import WeeklyMenu from "./pages/WeeklyMenu";
import PaymentPage from "./pages/PaymentPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guidelines from "./pages/guide";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<><Navbar /> <Home /> <Footer /></>} />
        <Route path="/Login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/Register" element={<><Navbar /><Register /><Footer /></>} />
        <Route path="/Dashboard" element={<><Navbar /><Dashboard /><Footer /></>} />
        <Route path="/WeeklyMenu" element={<><Navbar /><WeeklyMenu /><Footer /></>} />
        <Route path="/PaymentPage" element={<><Navbar /><PaymentPage /><Footer /></>} />
        <Route path="/guide" element={<><Navbar /><Guidelines /><Footer /></>} />
        <Route path="/Contact" element={<><Navbar /><Contact /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;