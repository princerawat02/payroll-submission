import express from "express";
import {
  submitExpense,
  getExpenses,
} from "../controllers/expenseController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, submitExpense);

router.get("/", protect, getExpenses);

export default router;
