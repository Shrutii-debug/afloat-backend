import { pool } from "../config/db.js";

export const createMaterial = async (data) => {
  const { subject_id, title, file_url } = data;

  const { rows } = await pool.query(
    `INSERT INTO study_materials (subject_id, title, file_url)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [subject_id, title, file_url]
  );

  return rows[0];
};

export const getMaterialsBySubject = async (subject_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM study_materials
     WHERE subject_id=$1
     ORDER BY uploaded_at DESC`,
    [subject_id]
  );

  return rows;
};

export const deleteMaterial = async (id) => {
  await pool.query("DELETE FROM study_materials WHERE id=$1", [id]);
};