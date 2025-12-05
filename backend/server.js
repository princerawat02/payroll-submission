import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import salaryRoutes from "./routes/salary.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/salary-slip", salaryRoutes);
app.use("/expense", expenseRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
