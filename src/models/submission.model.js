import { pool } from "../config/db.js";

export const findSubmission = async (studentId, assignmentId) => {
  const { rows } = await pool.query(
    `SELECT * FROM submissions
     WHERE student_id=$1 AND assignment_id=$2`,
    [studentId, assignmentId]
  );
  return rows[0];
};

export const createSubmission = async (studentId, assignmentId) => {
  const { rows } = await pool.query(
    `INSERT INTO submissions (student_id, assignment_id, submitted_at, status)
     VALUES ($1,$2,NOW(),'submitted')
     RETURNING *`,
    [studentId, assignmentId]
  );
  return rows[0];
};
