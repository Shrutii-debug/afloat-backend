import express from "express";

import {
    getTimetableController,
    createTimetableController,
    deleteTimetableController,
} from "../controllers/timetable.controller.js"

import authMiddleware from "../middlewares/auth.middleware.js"
import roleMiddleware from "../middlewares/role.middleware.js"

const router = express.Router()

router.get("/", authMiddleware,getTimetableController)

router.post(
    "/", 
    authMiddleware, 
    roleMiddleware("admin"), 
    createTimetableController
)

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteTimetableController
)

export default router