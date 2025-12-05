import { useState } from "react";
import api from "../api/axios";

const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/expense", {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
      });
      setMessage("Expense submitted successfully!");
      setFormData({
        amount: "",
        description: "",
        date: "",
      });
      onSubmit();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700"
    >
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("success")
              ? "bg-green-900 text-green-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
