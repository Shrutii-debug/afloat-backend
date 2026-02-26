import { pool } from "../config/db.js"

export const createNotice = async(data) => {
    const { title, description, department, year, type, urgency } = data

    const { rows } = await pool.query(
        `INSERT INTO notices
        (title, description, department, year, type, urgency)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [title, description, department, year, type, urgency]
    )
    return rows[0]
}

export const getNoticeByID = async(id) => {
    const { rows } = await pool.query(
        `SELECT * FROM notices where id = $1`
        [id]
    )
    return rows[0]
}

export const getFilteredNotices =  async(
    filters,
    pagination,
    sortField = "created_at",
    sortOrder = "DESC"
) => {
    let baseQuery = `SELECT * FROM notices`
    const values = []
    const conditions = []

    Object.keys(filters).forEach((key) => {
        if(filters[key] !== undefined) {
            values.push(filters[key])
            conditions.push('${key} = $${values.length}')
        }
    })

    if(conditions.length > 0){
        baseQuery += "WHERE" + conditions.join("AND")
    }
    baseQuery += `ORDER BY ${sortField} ${sortOrder}`

    baseQuery += `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
    values.push(pagination.limit, pagination.offset)

    const { rows } = await pool.query(baseQuery, values)

    return rows
}

export const countFilteredNotices = async(filters) => {
    let baseQuery = `SELECT * FROM notices`
    const value = []
    const conditions = []

    Object.keys(filters).forEach((key) => {
        if(filters[key] !== undefined){
            values.push(filters[key])
            conditions.push(`${key} = $${values.length}`)
        }
    })
    if(conditions.length > 0){
        baseQuery += "WHERE" + conditions.join("AND")
    }

    const { rows } = await pool.query(baseQuery, values)
    return parseInt(rows[0].count)
}

export const deleteNotice = async (id) => {
  await pool.query("DELETE FROM notices WHERE id = $1", [id])
}

export const countUrgentNotices = async(department, year) => {
    const { rows } = await pool.query(
        `SELECT COUNT(*) FROM notices
        WHERE urgency = 'high'
        AND(department = $1 OR department = 'ALL')
        AND(year = $2 OR year IS NULL)`,
        [department, year]
    )
    return parseInt(rows[0].count)
}