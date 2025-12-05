import express from "express";
import {
  createSalarySlip,
  updateSalarySlip,
  getSalarySlips,
} from "../controllers/salaryController.js";
import protect from "../middleware/auth.js";
import admin from "../middleware/role.js";

const router = express.Router();


router.post("/", protect, admin, createSalarySlip);

router.put("/:id", protect, admin, updateSalarySlip);

router.get("/", protect, getSalarySlips);

export default router;
