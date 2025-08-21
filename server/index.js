import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import the authentication routes
import menuRoute from "./routes/menuRoute.js"; // Import the new route for weekly menu
import paymentRoutes from './routes/paymentRoutes.js'; // Import the payment routes
import noticeRoutes from './routes/noticeRoutes.js'; // Import the notice routes
import StudentRoute from './routes/studentRoute.js'; // Import the student routes

dotenv.config();
const app = express();


const allowedOrigins = [
  "http://localhost:5173", 
  "https://mess-management-system-rust.vercel.app" 
];

// ✅ These MUST come BEFORE any route
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

// ✅ Now define routes
app.use("/api/auth", authRoutes);
app.use("/api/weekly-menu", menuRoute); 
app.use("/api/payment", paymentRoutes);
app.use("/api/notice", noticeRoutes); 
app.use("/api/students",StudentRoute);
app.use("/api/phonepe", paymentRoutes); // Add this line to use the payment routes


// Default route
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
