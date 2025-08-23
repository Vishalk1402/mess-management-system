import db from "../config/db.js"; // Assuming you're using MySQL/TiDB

// Controller to get the weekly menu
export const getWeeklyMenu = (req, res) => {
  const query = `
    SELECT day, meal_type, item_name 
    FROM menu 
    ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch weekly menu" });
    }

    const weeklyMenu = results.reduce((acc, { day, meal_type, item_name }) => {
      if (!acc[day]) acc[day] = {};
      acc[day][meal_type] = item_name;
      return acc;
    }, {});

    res.json(weeklyMenu);
  });
};

// ✅ Controller to add a menu item (fixed for TiDB ENUM)
export const addMenu = (req, res) => {
  let { day, meal_type, item_name } = req.body;

  // Check for missing fields
  if (!day || !meal_type || !item_name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Normalize and validate meal_type
  const allowedMealTypes = ["breakfast", "lunch", "dinner"];
  meal_type = meal_type.toLowerCase();

  if (!allowedMealTypes.includes(meal_type)) {
    return res.status(400).json({ message: "Invalid meal_type" });
  }

  // Insert into database
  const query = `INSERT INTO menu (day, meal_type, item_name) VALUES (?, ?, ?)`;

  db.query(query, [day, meal_type, item_name], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Failed to add menu item", error: err.message });
    }

    res.status(201).json({ message: "Menu item added successfully ✅" });
  });
};

// ✅ Controller to delete a menu item (normalized for TiDB ENUM)
export const deleteMenuItem = (req, res) => {
  let { day, meal_type } = req.body;

  if (!day || !meal_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Normalize meal_type
  meal_type = meal_type.toLowerCase();

  const query = `DELETE FROM menu WHERE day = ? AND meal_type = ?`;

  db.query(query, [day, meal_type], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Failed to delete menu item", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully ✅" });
  });
};
