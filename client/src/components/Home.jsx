import { useEffect, useState } from "react";
import axios from "axios";
import { FaUtensils, FaSun, FaMoon, FaCoffee } from "react-icons/fa";

const mealIcons = {
  breakfast: <FaCoffee className="inline mr-1 text-yellow-500" />,
  lunch: <FaSun className="inline mr-1 text-green-600" />,
  dinner: <FaMoon className="inline mr-1 text-purple-600" />,
};

function HomePage() {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState(0);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetch weekly menu
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/weekly-menu/week")
      .then((res) => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  // Fetch notices
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notice/getnotice")
      .then((res) => {
        setNotices(res.data.map((notice) => notice.notice)); // check what to extract
      })
      .catch((err) => {
        console.error("Failed to fetch notices:", err);
      });
  }, []);
  

  // Rotate notice every 5 seconds
  useEffect(() => {
    const noticeInterval = setInterval(() => {
      setCurrentNotice((prevNotice) =>
        prevNotice === notices.length - 1 ? 0 : prevNotice + 1
      );
    }, 5000);

    return () => clearInterval(noticeInterval);
  }, [notices]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {/* Mess Name Section */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-blue-700">RS Mess</h1>
        <p className="text-lg text-gray-600 mt-2">Welcome to our Mess!</p>
      </div>

      {/* Notice Slider */}
      {notices.length > 0 && (
        <div className="bg-blue-600 text-white py-2 px-4 rounded-full mb-6 w-full">
          <p className="text-center text-xl font-medium">
            {notices[currentNotice]}
          </p>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        🍽 Weekly Mess Menu
      </h1>

      {/* Day Selector */}
      <div className="flex justify-center mb-6 flex-wrap gap-3">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`py-2 px-4 rounded-full border font-medium transition ${
              selectedDay === day
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-blue-700 border-blue-600 hover:bg-blue-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Menu Display */}
      {loading ? (
        <p className="text-center text-lg text-gray-600 animate-pulse">
          Loading menu...
        </p>
      ) : menu[selectedDay] ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            📅 {selectedDay}
          </h2>
          <ul className="space-y-3">
            {Object.entries(menu[selectedDay]).map(([mealType, item]) => (
              <li
                key={mealType}
                className="flex items-center gap-2 text-lg border-b pb-2 last:border-b-0"
              >
                {mealIcons[mealType.toLowerCase()] || (
                  <FaUtensils className="text-gray-500" />
                )}
                <span className="font-medium capitalize">{mealType}:</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-red-600 font-medium">
          No menu found for {selectedDay}
        </p>
      )}
    </div>
  );
}

export default HomePage;
