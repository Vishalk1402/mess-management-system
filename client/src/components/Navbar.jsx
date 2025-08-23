import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">Mess</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-base">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/Register" className="hover:underline">Register</Link></li>
          <li><Link to="/Login" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/WeeklyMenu" className="hover:underline">Menu</Link></li>
          <li><Link to="/PaymentPage" className="hover:underline">Payment</Link></li>

        </ul>

        {/* Hamburger Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block py-2 border-b" onClick={toggleMenu}>Home</Link>
          <Link to="/Register" className="block py-2 border-b" onClick={toggleMenu}>Register</Link>
          <Link to="/Login" className="block py-2 border-b" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/WeeklyMenu" className="block py-2 border-b" onClick={toggleMenu}>Menu</Link>
          <Link to="/PaymentPage" className="block py-2 border-b" onClick={toggleMenu}>Payment</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
