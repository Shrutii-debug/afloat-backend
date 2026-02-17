import { pool } from "../config/db.js";

export const getStudentNotifications = async (studentId) => {
  const { rows } = await pool.query(
    `SELECT * FROM notifications
     WHERE student_id=$1
     ORDER BY created_at DESC`,
    [studentId]
  );
  return rows;
};

export const markNotificationRead = async (id) => {
  const { rows } = await pool.query(
    `UPDATE notifications
     SET is_read=true
     WHERE id=$1
     RETURNING *`,
    [id]
  );
  return rows[0];
};

export const createNotification = async (studentId, title, message, type) => {
  const { rows } = await pool.query(
    `INSERT INTO notifications(student_id,title,message,type)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [studentId,title,message,type]
  );
  return rows[0];
};
