import { pool } from "../config/db.js";

export const createTimetableEntry = async (data) => {
  const { subject_id, day_of_week, start_time, end_time, room_number } = data;

  const { rows } = await pool.query(
    `INSERT INTO timetable
     (subject_id, day_of_week, start_time, end_time, room_number)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [subject_id, day_of_week, start_time, end_time, room_number]
  )

  return rows[0]
}

export const getStudentTimetable = async (department, year, day) => {
    let query = `
    SELECT 
    t.id,
    t.day_of_week,
    t.start_time,
    t.end_time,
    t.room_number,
    s.name AS subject_name,
    s.code AS subject_code
    FROM timetable t
    JOIN subjects s ON t.subject_id = s.id
    WHERE s.department = $1
    AND s.year = $2
    `
    const values = [department, year]

    if(day) {
        query += `AND t.day_of_week = $3`
        values.push(day)
    }

    query += `ORDER by t.start_time ASC`

    const { rows } = await pool.query(query, values)

    return rows
}


export const deleteTimetableEntry = async (id) => {
  await pool.query("DELETE FROM timetable WHERE id=$1", [id])
}

export const countTodayClasses = async (department, year, day) => {
    const { rows } = await pool.query(
        `SELECT COUNT(*)
        FROM timetable t
        JOIN subjects s ON t.subject_id = s.id
        WHERE s.department = $1
        AND s.year = $2
        AND t.day_of_week = $3`
        [department, year, day]
    )

    return parseInt(rows[0].count)
}