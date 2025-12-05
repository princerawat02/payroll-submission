const ExpenseTable = ({ expenses }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <table className="min-w-full">
        <thead className="bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-600">
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-slate-400">
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-slate-700">
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  ₹{expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
