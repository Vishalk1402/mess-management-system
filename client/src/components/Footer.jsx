import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-10 mt-16 shadow-inner">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Left Section */}
        <div className="text-center md:text-left space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-wide">Mess</h3>
          <p className="text-sm text-gray-200">
            Serving healthy meals with tech simplicity.
          </p>
          <ul className="flex justify-center md:justify-start gap-4 text-sm">
            <li>
              <Link to="/guide" className="hover:text-yellow-300 transition">Guidelines</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right space-y-3">
          <div className="flex justify-center md:justify-end gap-4 text-lg">
            <a href="mailto:vvk6210@gmail.com" className="hover:text-yellow-300 transition">
              <FaEnvelope />
            </a>
            <a href="tel:+918668385494" className="hover:text-yellow-300 transition">
              <FaPhone />
            </a>
            <a href="https://www.instagram.com/ordinary_vk/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Mess. All rights reserved.</p>
          <p className="text-xs text-gray-400">Designed with ❤️ by Team DV</p>
        </div>
      </div>

      {/* Bottom Line */}
     
    </footer>
  );
}

export default Footer;
