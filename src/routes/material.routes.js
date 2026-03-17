import express from "express";
import {
  createMaterialController,
  getMaterialsController,
  deleteMaterialController,
} from "../controllers/material.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMaterialsController);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("faculty"),
  createMaterialController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("faculty"),
  deleteMaterialController
);

export default router;