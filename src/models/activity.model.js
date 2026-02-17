import { pool } from "../config/db.js";

export const logActivity = async (studentId, actionType, referenceId) => {
  await pool.query(
    `INSERT INTO student_activity_log(student_id,action_type,reference_id)
     VALUES($1,$2,$3)`,
    [studentId, actionType, referenceId]
  );
};

export const getRecentActivity = async (studentId) => {
  const { rows } = await pool.query(
    `SELECT * FROM student_activity_log
     WHERE student_id=$1
     ORDER BY created_at DESC
     LIMIT 10`,
    [studentId]
  );
  return rows;
};
