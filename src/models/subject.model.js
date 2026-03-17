import { pool } from "../config/db.js";



export const createSubject = async (data) => {
  const { name, code, department, year, faculty_id } = data;

  const { rows } = await pool.query(
    `INSERT INTO subjects 
     (name, code, department, year, faculty_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [name, code, department, year, faculty_id]
  );

  return rows[0];
};



export const getSubjects = async (department, year) => {
  let query = `
    SELECT 
      s.*,
      f.name AS faculty_name,
      f.email AS faculty_email
    FROM subjects s
    LEFT JOIN faculty f ON s.faculty_id = f.id
  `;

  const values = [];
  const conditions = [];

  if (department) {
    values.push(department);
    conditions.push(`s.department = $${values.length}`);
  }

  if (year) {
    values.push(year);
    conditions.push(`s.year = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY s.name ASC";

  const { rows } = await pool.query(query, values);

  return rows;
};


export const getSubjectById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT 
      s.*,
      f.name AS faculty_name,
      f.email AS faculty_email,
      f.office_hours
    FROM subjects s
    LEFT JOIN faculty f ON s.faculty_id = f.id
    WHERE s.id = $1
    `,
    [id]
  );

  return rows[0];
};



export const deleteSubject = async (id) => {
  await pool.query("DELETE FROM subjects WHERE id=$1", [id]);
};