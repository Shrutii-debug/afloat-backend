import express from "express";
import {
  createInternshipController,
  getInternshipsController,
} from "../controllers/internship.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getInternshipsController);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createInternshipController
);

export default router;