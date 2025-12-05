import { useState } from "react";
import api from "../api/axios";

const SalarySlipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeEmail: "",
    month: "",
    year: "",
    basePay: "",
    allowances: "",
    deductions: "",
    netPay: "",
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
      await api.post("/salary-slip", {
        employeeEmail: formData.employeeEmail,
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        basePay: parseFloat(formData.basePay),
        allowances: parseFloat(formData.allowances) || 0,
        deductions: parseFloat(formData.deductions) || 0,
        netPay: parseFloat(formData.netPay),
      });
      setMessage("Salary slip created successfully!");
      setFormData({
        employeeEmail: "",
        month: "",
        year: "",
        basePay: "",
        allowances: "",
        deductions: "",
        netPay: "",
      });
      onSubmit();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating salary slip");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="employeeEmail"
          >
            Employee Email
          </label>
          <input
            type="email"
            id="employeeEmail"
            name="employeeEmail"
            value={formData.employeeEmail}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="month"
          >
            Month
          </label>
          <input
            type="number"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            min="1"
            max="12"
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="year"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="basePay"
          >
            Base Pay
          </label>
          <input
            type="number"
            step="0.01"
            id="basePay"
            name="basePay"
            value={formData.basePay}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="allowances"
          >
            Allowances
          </label>
          <input
            type="number"
            step="0.01"
            id="allowances"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="deductions"
          >
            Deductions
          </label>
          <input
            type="number"
            step="0.01"
            id="deductions"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-slate-300 text-sm font-bold mb-2"
            htmlFor="netPay"
          >
            Net Pay
          </label>
          <input
            type="number"
            step="0.01"
            id="netPay"
            name="netPay"
            value={formData.netPay}
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
          {loading ? "Creating..." : "Create Salary Slip"}
        </button>
      </div>
    </form>
  );
};

export default SalarySlipForm;
