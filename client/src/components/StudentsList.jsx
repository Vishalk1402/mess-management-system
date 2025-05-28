import { useEffect, useState } from "react";
import axios from "axios";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students/students")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
          Registered Students
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-600">No students found.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Username</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || index} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{student.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentsList;
