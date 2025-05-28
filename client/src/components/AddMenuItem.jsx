import { useState, useEffect } from "react";
import axios from "axios";
import { FaUtensils, FaCoffee, FaSun, FaMoon } from "react-icons/fa";

const mealIcons = {
  breakfast: <FaCoffee className="inline mr-1 text-yellow-500" />,
  lunch: <FaSun className="inline mr-1 text-green-600" />,
  dinner: <FaMoon className="inline mr-1 text-purple-600" />,
};

function MessDashboard() {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [newMenuItem, setNewMenuItem] = useState({ day: "", meal_type: "", item_name: "" });
  const [notices, setNotices] = useState([]);
  const [noticeInput, setNoticeInput] = useState("");

  useEffect(() => {
    // Fetch weekly menu
    axios.get("http://localhost:5000/api/weekly-menu/week")
      .then((res) => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });

    // Fetch notices
    axios.get("http://localhost:5000/api/notice/getnotice")
      .then((res) => {
        setNotices(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch notices:", err);
      });
  }, []);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/weekly-menu/add", newMenuItem)
      .then((response) => {
        alert("Menu item added successfully!");
        setNewMenuItem({ day: "", meal_type: "", item_name: "" });
      })
      .catch((err) => {
        console.error("Error adding menu item:", err);
        alert("Failed to add menu item.");
      });
  };

  const handleDeleteMenuItem = (day, meal_type) => {
    axios
      .delete(`http://localhost:5000/api/weekly-menu/delete`, {
        data: { day, meal_type },
      })
      .then(() => {
        alert("Menu item deleted successfully!");
        // Optionally refresh the menu
        setMenu((prev) => {
          const updated = { ...prev };
          if (updated[day]) {
            delete updated[day][meal_type];
          }
          return updated;
        });
      })
      .catch((err) => {
        console.error("Error deleting menu item:", err);
        alert("Failed to delete menu item.");
      });
  };


  const handleAddNotice = () => {
    if (noticeInput.trim()) {
      axios.post("http://localhost:5000/api/notice/addnotice", { notice: noticeInput })
        .then((response) => {
          setNotices([...notices, { notice: noticeInput }]);
          setNoticeInput("");
        })
        .catch((err) => {
          console.error("Error adding notice:", err);
        });
    }
  };

  const handleDeleteNotice = (id) => {
    axios.delete(`http://localhost:5000/api/notice/${id}`)
      .then(() => {
        setNotices(notices.filter((notice) => notice.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting notice:", err);
        alert("Failed to delete notice.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Mess Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your Mess Menu & Notices</p>
      </header>

      {/* Menu Overview */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Weekly Menu Overview</h2>
        {loading ? (
          <p className="text-center text-lg text-gray-600 animate-pulse">Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(menu).map(([day, meals]) => (
              <div key={day} className="bg-white rounded shadow p-4">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{day}</h3>
                <ul className="space-y-1">
                  {Object.entries(meals).map(([mealType, item]) => (
                    <li key={mealType} className="text-lg flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        {mealIcons[mealType.toLowerCase()] || <FaUtensils className="text-gray-500" />}
                        <span className="capitalize">{mealType}:</span> {item}
                      </div>
                      <button
                        onClick={() => handleDeleteMenuItem(day, mealType)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </li>
                  ))}

                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add New Menu Item */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Add New Menu Item</h2>
        <form onSubmit={handleAddMenuItem} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Day</label>
            <select
              value={newMenuItem.day}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, day: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Meal Type</label>
            <select
              value={newMenuItem.meal_type}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, meal_type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Item Name</label>
            <input
              type="text"
              value={newMenuItem.item_name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, item_name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter item name"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded font-semibold"
          >
            Add Menu Item
          </button>
        </form>
      </section>

      {/* Notices */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Notices</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices available.</p>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice, index) => (
                <li key={notice.id || index} className="bg-white p-4 rounded shadow flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 font-medium">{notice.notice}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notice.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <input
              type="text"
              value={noticeInput}
              onChange={(e) => setNoticeInput(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter new notice"
            />
            <button
              onClick={handleAddNotice}
              className="w-full p-2 bg-green-600 text-white rounded font-semibold"
            >
              Add Notice
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MessDashboard;
