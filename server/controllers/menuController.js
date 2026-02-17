import db from "../config/db.js";

// GET weekly menu
export const getWeeklyMenu = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT day, meal_type, item_name 
      FROM menu 
      ORDER BY FIELD(day,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
    `);

    const weeklyMenu = results.reduce((acc, { day, meal_type, item_name }) => {
      if (!acc[day]) acc[day] = {};
      acc[day][meal_type] = item_name;
      return acc;
    }, {});

    res.json(weeklyMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch weekly menu" });
  }
};

// ADD menu item
export const addMenu = async (req, res) => {
  try {
    let { day, meal_type, item_name } = req.body;

    if (!day || !meal_type || !item_name)
      return res.status(400).json({ message: "Missing required fields" });

    meal_type = meal_type.toLowerCase();

    await db.query(
      "INSERT INTO menu (day, meal_type, item_name) VALUES (?, ?, ?)",
      [day, meal_type, item_name]
    );

    res.status(201).json({ message: "Menu item added successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add menu item" });
  }
};

// DELETE menu item
export const deleteMenuItem = async (req, res) => {
  try {
    let { day, meal_type } = req.body;

    meal_type = meal_type.toLowerCase();

    const [result] = await db.query(
      "DELETE FROM menu WHERE day = ? AND meal_type = ?",
      [day, meal_type]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
