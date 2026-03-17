import express from "express";

import {
  createFacultyController,
  getFacultyController,
  getFacultyByIdController,
  updateFacultyController,
  deleteFacultyController,
} from "../controllers/faculty.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getFacultyController);



router.get("/:id", authMiddleware, getFacultyByIdController);



router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createFacultyController
);



router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateFacultyController
);



router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteFacultyController
);

export default router;