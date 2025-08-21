import { useEffect, useState } from "react";
import { getWeeklyMenu } from "../api/backend"; // <-- use your api.js helper instead of hardcoding axios

function WeeklyMenu() {
  const [weeklyMenu, setWeeklyMenu] = useState({});

  useEffect(() => {
  const fetchMenu = async () => {
    try {
      const res = await getWeeklyMenu();
     
      setWeeklyMenu(res.data || {});
    } catch (err) {
      console.error("❌ Weekly menu fetch error:", err);
    }
  };

  fetchMenu();
}, []);


  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-orange-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-700">
        🍽️ Weekly Mess Menu
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead>
            <tr className="bg-orange-200 text-orange-900">
              <th className="py-3 px-4 text-left">Day</th>
              <th className="py-3 px-4 text-left">Breakfast</th>
              <th className="py-3 px-4 text-left">Lunch</th>
              <th className="py-3 px-4 text-left">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(weeklyMenu).map((day) => (
              <tr key={day} className="border-t border-gray-200">
                <td className="py-2 px-4 font-semibold">{day}</td>
                <td className="py-2 px-4">
                  {weeklyMenu[day]?.breakfast || "—"}
                </td>
                <td className="py-2 px-4">
                  {weeklyMenu[day]?.lunch || "—"}
                </td>
                <td className="py-2 px-4">
                  {weeklyMenu[day]?.dinner || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeeklyMenu;
