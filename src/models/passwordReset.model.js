import { pool } from "../config/db.js";

export const createResetToken = async (email, token) => {
  await pool.query(
    `INSERT INTO password_resets (email, token, expires_at)
     VALUES ($1,$2, NOW() + interval '15 minutes')`,
    [email, token]
  );
};

export const findResetToken = async (token) => {
  const { rows } = await pool.query(
    `SELECT * FROM password_resets 
     WHERE token=$1 AND expires_at > NOW()`,
    [token]
  );
  return rows[0];
};

export const deleteResetToken = async (token) => {
  await pool.query("DELETE FROM password_resets WHERE token=$1", [token]);
};