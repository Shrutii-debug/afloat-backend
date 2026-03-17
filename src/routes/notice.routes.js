import express from "express";

import {
  createNoticeController,
  getNoticeByIdController,
  getNoticesController,
  deleteNoticeController,
} from "../controllers/notice.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * GET all notices
 * Supports:
 * ?department=CSE
 * ?year=3
 * ?urgency=high
 * ?type=exam
 * ?page=1
 * ?limit=10
 * ?sortField=created_at
 * ?sortOrder=DESC
 */
router.get("/", authMiddleware, getNoticesController);


/**
 * GET single notice by ID
 */
router.get("/:id", authMiddleware, getNoticeByIdController);


/**
 * CREATE notice (Admin only)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createNoticeController
);


/**
 * DELETE notice (Admin only)
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteNoticeController
);

export default router;