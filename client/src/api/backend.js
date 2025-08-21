import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://mess-management-system-ayv2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
 
});

// ✅ Interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH =================
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const logoutUser = () => api.post("/auth/logout");

// ================= STUDENTS =================
export const getStudents = () => api.get("/students/students");
export const addStudent = (studentData) => api.post("/students/add", studentData);

// ================= MENU =================
export const getWeeklyMenu = () => api.get("/weekly-menu/week");
export const addMenuItem = (itemData) => api.post("/weekly-menu/add", itemData);
export const deleteMenuItem = (day, meal_type) =>
  api.delete(`/weekly-menu/${day}/${meal_type}`);

// ================= PAYMENT =================
export const createPayment = (paymentData) => api.post("/payment/create", paymentData);
export const getPayments = () => api.get("/payment");

// PhonePe
export const phonePePayment = (paymentData) =>
  api.post("/phonepe/initiate", paymentData);

// ================= NOTICE =================
export const getNotices = () => api.get("/notice/getnotice");
export const addNotice = (noticeData) => api.post("/notice/addnotice", noticeData);
export const deleteNotice = (id) => api.delete(`/notice/${id}`);

export default api;
