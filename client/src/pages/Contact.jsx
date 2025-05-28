import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent ✅");
    setForm({ name: "", email: "", message: "" });
    // You can also send the form to a backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">📬 Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-blue-400"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-blue-400"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-blue-400"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
              <p>Boys Hostel 2 at SSBT COET Jalgaon 425001</p>
            </div>
            <div className="flex items-start space-x-3">
              <FaPhone className="text-blue-600 text-xl mt-1" />
              <p>+91 8668385494</p>
            </div>
            <div className="flex items-start space-x-3">
              <FaEnvelope className="text-blue-600 text-xl mt-1" />
              <p>vvk6210@gmail.com</p>
            </div>
            <div className="pt-4 text-sm text-gray-500">
              Available Mon–Sat • 9:00 AM – 6:00 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
