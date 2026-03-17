import express from "express";
import { getBooksController } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getBooksController);

export default router;