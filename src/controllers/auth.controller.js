import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"

import {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
  getCurrentUserService,
} from "../services/auth.service.js"


export const registerService = asyncHandler(async(req, res) => {
    const user = await registerService(req.body)
    res.status(201).json(
        new ApiResponse(201, user, "userRegistered")
    )
})

export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const data = await loginService(email, password)
    res.status(200).json(
        new ApiResponse(200, data, "Login successful")
    )
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const data = await forgotPasswordService(email)
  res.status(200).json(
    new ApiResponse(200, data, "Reset token generated")
)
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  await resetPasswordService(token, newPassword)
  res.status(200).json(
    new ApiResponse(200, null, "Password reset successful")
)
})

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user.id)
  res.status(200).json(
    new ApiResponse(200, user, "User fetched")
)
})