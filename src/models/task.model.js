import { pool } from "../config/db.js";

export const getTasksByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, title, description, due_at, priority, status, created_at
     FROM tasks
     WHERE user_id = $1
     ORDER BY due_at ASC NULLS LAST, created_at DESC`,
    [userId]
  );

  return rows;
};

export const createTask = async ({ user_id, title, description, due_at, priority, status }) => {
  const { rows } = await pool.query(
    `INSERT INTO tasks (user_id, title, description, due_at, priority, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user_id, title, description, due_at, priority, status || "pending"]
  );

  return rows[0];
};