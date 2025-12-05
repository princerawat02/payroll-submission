import { useState, useEffect } from "react";
import api from "../api/axios";
import SalarySlipForm from "./SalarySlipForm";
import SalarySlipTable from "./SalarySlipTable";

const AdminDashboard = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalarySlips();
  }, []);

  const fetchSalarySlips = async () => {
    try {
      const response = await api.get("/salary-slip");
      setSalarySlips(response.data);
    } catch (error) {
      console.error("Error fetching salary slips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalarySlipSubmit = () => {
    fetchSalarySlips(); // Refresh salary slips
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create/Update Salary Slip</h2>
        <SalarySlipForm onSubmit={handleSalarySlipSubmit} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Salary Slips</h2>
        <SalarySlipTable salarySlips={salarySlips} />
      </div>
    </div>
  );
};

export default AdminDashboard;
