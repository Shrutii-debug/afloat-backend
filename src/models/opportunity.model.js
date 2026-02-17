import { pool } from "../config/db.js";

export const getAllOpportunities = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM opportunities ORDER BY deadline ASC`
  );
  return rows;
};
