import express from "express";

import {
  getSubjectsController,
  getSubjectByIdController,
  createSubjectController,
  deleteSubjectController,
} from "../controllers/subject.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();


router.get("/", authMiddleware, getSubjectsController);



router.get("/:id", authMiddleware, getSubjectByIdController);



router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createSubjectController
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteSubjectController
);

export default router;