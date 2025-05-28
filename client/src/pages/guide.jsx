import React from "react";
import { FaUtensils, FaClock, FaBook, FaExclamationCircle } from "react-icons/fa";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">🍽️ Mess Guidelines</h1>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rules Card */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4 text-green-600 text-xl font-semibold">
              <FaBook className="mr-2" />
              General Rules
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Keep the mess area clean. No food wastage.</li>
              <li>Follow designated meal timings strictly.</li>
              <li>Only registered users are allowed entry.</li>
            </ul>
          </div>

          {/* Timings Card */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4 text-green-600 text-xl font-semibold">
              <FaClock className="mr-2" />
              Mess Timings
            </div>
            <ul className="text-gray-700 space-y-2">
            <li><strong>Breakfast:</strong> 8:30 AM – 10:00 AM</li>
              <li><strong>Lunch:</strong> 12:30 PM – 2:00 PM</li>
              <li><strong>Dinner:</strong> 8:00 PM – 9:00 PM</li>
            </ul>
          </div>

          {/* Conduct Card */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4 text-green-600 text-xl font-semibold">
              <FaUtensils className="mr-2" />
              Code of Conduct
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Respect mess staff and fellow diners.</li>
              <li>Return used plates to the wash area.</li>
              <li>Use the complaint system for disputes.</li>
            </ul>
          </div>

          {/* Complaints Card */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4 text-green-600 text-xl font-semibold">
              <FaExclamationCircle className="mr-2" />
              Complaints & Feedback
            </div>
            <p className="text-gray-700">
              For any issues, visit our <a href="/contact" className="text-blue-600 underline">Contact Us</a> page or speak to the mess supervisor directly. Your feedback helps improve our service.
            </p>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-500 text-sm">
          🔄 Last Updated: May 2025 | Check regularly for updates.
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
