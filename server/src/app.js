import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import recipeRoutes from "../src/routes/recipeRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js"; // Global error handler
import helmet from "helmet";
const app = express();
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  headers: true, // Include rate limit info in response headers
});

// Apply rate limiter to all requests
app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, // Adjust based on frontend URL
    credentials: true, // Required for cookies
  })
);
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/api/recipes", recipeRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  const error = new Error(` Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
