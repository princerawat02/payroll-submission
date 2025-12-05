import { useState, useEffect } from "react";
import api from "../api/axios";
import ExpenseForm from "./ExpenseForm";
import SalarySlipTable from "./SalarySlipTable";
import ExpenseTable from "./ExpenseTable";

const EmployeeDashboard = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [salaryRes, expenseRes] = await Promise.all([
        api.get("/salary-slip"),
        api.get("/expense"),
      ]);
      setSalarySlips(salaryRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseSubmit = () => {
    fetchData(); // Refresh expenses
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Submit New Expense</h2>
        <ExpenseForm onSubmit={handleExpenseSubmit} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Salary Slips</h2>
        <SalarySlipTable salarySlips={salarySlips} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
