import mongoose from "mongoose";

const salarySlipSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    basePay: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    netPay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SalarySlip = mongoose.model("SalarySlip", salarySlipSchema);

export default SalarySlip;
