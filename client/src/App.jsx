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

import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
         position="top-center" 
        autoClose={2000} 
      />
    </BrowserRouter>
  );
}

export default App;
