import { pool } from "../config/db.js";



export const createFaculty = async (data) => {
  const { name, email, department, office_hours } = data;

  const { rows } = await pool.query(
    `INSERT INTO faculty (name, email, department, office_hours)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, email, department, office_hours]
  );

  return rows[0];
};



export const getFaculty = async (department) => {
  let query = "SELECT * FROM faculty";
  const values = [];

  if (department) {
    query += " WHERE department = $1";
    values.push(department);
  }

  query += " ORDER BY name ASC";

  const { rows } = await pool.query(query, values);
  return rows;
};



export const getFacultyById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM faculty WHERE id=$1",
    [id]
  );

  return rows[0];
};



export const updateFaculty = async (id, data) => {
  const { name, email, department, office_hours } = data;

  const { rows } = await pool.query(
    `UPDATE faculty
     SET name=$1, email=$2, department=$3, office_hours=$4
     WHERE id=$5
     RETURNING *`,
    [name, email, department, office_hours, id]
  );

  return rows[0];
};



export const deleteFaculty = async (id) => {
  await pool.query("DELETE FROM faculty WHERE id=$1", [id]);
};