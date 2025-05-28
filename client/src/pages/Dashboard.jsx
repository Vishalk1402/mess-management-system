import MessDashboard from "../components/AddMenuItem";
import StudentsList from "../components/StudentsList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "owner") {
      navigate("/"); // redirect to login if not owner
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <MessDashboard />
      <StudentsList/>
      <hr className="my-6" />
    </div>
  );
}

export default Dashboard;
