const SalarySlipTable = ({ salarySlips }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <table className="min-w-full">
        <thead className="bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Month/Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Base Pay
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Allowances
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Deductions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Net Pay
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-600">
          {salarySlips.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-slate-400">
                No salary slips found
              </td>
            </tr>
          ) : (
            salarySlips.map((slip) => (
              <tr key={slip._id} className="hover:bg-slate-700">
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {slip.employeeId?.name || "N/A"} (
                  {slip.employeeId?.email || "N/A"})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {slip.month}/{slip.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  ₹{slip.basePay.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  ₹{slip.allowances.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  ₹{slip.deductions.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-400">
                  ₹{slip.netPay.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalarySlipTable;
