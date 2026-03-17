import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      throw new ApiError(401, "Unauthorized");

    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;