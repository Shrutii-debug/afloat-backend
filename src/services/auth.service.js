import crypto from "crypto";
import ApiError from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

import {
  findUserByEmail,
  createUser,
  updatePassword,
  findUserById,
} from "../models/user.model.js";

import {
  createResetToken,
  findResetToken,
  deleteResetToken,
} from "../models/passwordReset.model.js";

export const registerService = async (data) => {
    const existing = await findUserByEmail(data.email)
    if(existing)
        throw new ApiError(400, "Email already registered")

    const hashed = await hashPassword(data.password)

    const user = await createUser({
        ...data,
        password_hash: hashed,
    })
    return user
}

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email)
  if (!user) throw new ApiError(401, "Invalid credentials")

  const valid = await comparePassword(password, user.password_hash)
  if (!valid) throw new ApiError(401, "Invalid credentials")

  const token = generateToken({
    id: user.id,
    role: user.role,
  })
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      year: user.year,
    },
  }
}

export const forgotPasswordService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(404, "User not found")

  const token = crypto.randomBytes(32).toString("hex")

  await createResetToken(email, token)

  return { resetToken: token }
}

export const resetPasswordService = async(token, newPassword) => {
    const resetEntry = await findResetToken(token)
    if(!resetEntry)
        throw new ApiError(400, "Invalid or expired token")

    const hashed = await hashPassword(newPassword)

  await updatePassword(resetEntry.email, hashed);
  await deleteResetToken(token);

  return true
}

export const getCurrentUserService = async (userId) => {
  const user = await findUserById(userId)
  if (!user) throw new ApiError(404, "User not found")
  return user
}