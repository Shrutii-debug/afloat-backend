import { pool } from "../config/db.js"


export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )
  return rows[0];
}

export const createUser = async (userData) => {
  const {
    name,
    email,
    password_hash = null,
    role = "student",
    department = null,
    year = null,
    google_id = null,
  } = userData;

  const { rows } = await pool.query(
    `INSERT INTO users 
    (name, email, password_hash, role, department, year, google_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [name, email, password_hash, role, department, year, google_id]
  )

  return rows[0];
}
export const findUserById = async (id) => {
    const { rows } = await pool.query(
        `SELECT id, name, email, role, department, year FROM users where id = $1`,
        [id]
    );
    return rows[0]
}
export const updatePassword = async(email, newHash) => {
    await pool.query(
        `UPDATE users SET password_hash = $1 WHERE email = $2`
        [newHash, email]
    )
}