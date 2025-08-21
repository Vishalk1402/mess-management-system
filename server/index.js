import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes.js";
import menuRoute from "./routes/menuRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import studentRoute from "./routes/studentRoute.js";

dotenv.config();
const app = express();

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://mess-management-system-rust.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/weekly-menu", menuRoute);
app.use("/api/payment", paymentRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/students", studentRoute);

// Default root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
