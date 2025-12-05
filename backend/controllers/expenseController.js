import Expense from "../models/Expense.js";

// Submit a new expense
export const submitExpense = async (req, res) => {
  const { amount, description, date } = req.body;

  try {
    const expense = new Expense({
      employeeId: req.user._id,
      amount,
      description,
      date,
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expenses for the logged-in employee
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ employeeId: req.user._id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
