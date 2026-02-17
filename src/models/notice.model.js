import { pool } from "../config/db.js";

export const getNoticesByDepartment = async (deptId) => {
  const { rows } = await pool.query(
    `SELECT * FROM notices
     WHERE department_id = $1 OR department_id IS NULL
     ORDER BY created_at DESC`,
    [deptId]
  );
  return rows;
};
