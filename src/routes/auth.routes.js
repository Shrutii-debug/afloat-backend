import express from "express";
import {
  registerServiceController,
  loginUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from "../controllers/auth.controller.js"

import authMiddleware from "../middlewares/auth.middleware.js"
import passport from "passport"

const router = express.Router()

router.post("/register", registerServiceController)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

router.get("/me", authMiddleware, getCurrentUser)

//google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

//google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token = generateToken({
      id: req.user.id,
      role: req.user.role,
    })

    //rrdirecting to frontend
      return res.redirect(
      `http://localhost:3000/auth-success?token=${token}`
    )
  }
)
export default router