import { pool } from "../config/db.js";

export const getAllDepartments = async () => {
  const { rows } = await pool.query(
    `SELECT id, name, code FROM departments ORDER BY name`
  );
  return rows;
};

export const findDepartmentById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name, code FROM departments WHERE id=$1`,
    [id]
  );
  return rows[0];
};
