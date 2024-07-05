// src/server.ts
import express from "express";
import { AppDataSource } from "./infrastructure/database/data-source";
import { API_VERSION } from "./config/constants";
import userRoutes from "./infrastructure/routes/UserRoutes";
import authRoutes from "./infrastructure/routes/AuthRoutes";
import loginHistoryRoutes from "./infrastructure/routes/LoginHistoryRoutes";
import { errorHandler } from "./infrastructure/middleware/errorHandler";
import { responseHandler } from "./infrastructure/middleware/responseHandler";
import cors from "cors";
import passport from "passport";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      // angular app
      "http://localhost:4200",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(responseHandler);
app.use(passport.initialize());
(async () => {
  try {
    await AppDataSource.initialize();

    // add a health check route
    app.get("/health", (req, res) => {
      res.send("Server is up and running");
    });

    // add api/v1 prefix to all routes
    app.use(`/api/${API_VERSION}`, userRoutes);
    app.use(`/api/${API_VERSION}`, authRoutes);
    app.use(`/api/${API_VERSION}`, loginHistoryRoutes);
    app.use(errorHandler);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
})();
