import SalarySlip from "../models/SalarySlip.js";
import User from "../models/User.js";

// Create a new salary slip
export const createSalarySlip = async (req, res) => {
  const {
    employeeEmail,
    month,
    year,
    basePay,
    allowances,
    deductions,
    netPay,
  } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: employeeEmail });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const salarySlip = new SalarySlip({
      employeeId: user._id,
      month,
      year,
      basePay,
      allowances,
      deductions,
      netPay,
    });

    const createdSalarySlip = await salarySlip.save();
    res.status(201).json(createdSalarySlip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update salary slip
export const updateSalarySlip = async (req, res) => {
  const {
    employeeEmail,
    month,
    year,
    basePay,
    allowances,
    deductions,
    netPay,
  } = req.body;

  try {
    const salarySlip = await SalarySlip.findById(req.params.id);

    if (salarySlip) {
      if (employeeEmail) {
        const user = await User.findOne({ email: employeeEmail });
        if (!user) {
          return res.status(404).json({ message: "Employee not found" });
        }
        salarySlip.employeeId = user._id;
      }
      salarySlip.month = month || salarySlip.month;
      salarySlip.year = year || salarySlip.year;
      salarySlip.basePay = basePay || salarySlip.basePay;
      salarySlip.allowances = allowances || salarySlip.allowances;
      salarySlip.deductions = deductions || salarySlip.deductions;
      salarySlip.netPay = netPay || salarySlip.netPay;

      const updatedSalarySlip = await salarySlip.save();
      res.json(updatedSalarySlip);
    } else {
      res.status(404).json({ message: "Salary slip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get salary slips - admin can see all, employees can see their own
export const getSalarySlips = async (req, res) => {
  try {
    let salarySlips;

    if (req.user.role === "admin") {
      salarySlips = await SalarySlip.find({}).populate(
        "employeeId",
        "name email"
      );
    } else {
      salarySlips = await SalarySlip.find({ employeeId: req.user._id });
    }

    res.json(salarySlips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
