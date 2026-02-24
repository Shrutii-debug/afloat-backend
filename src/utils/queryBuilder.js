export const buildFilterQuery = (baseQuery, filters= {}) => {
    let query = baseQuery
    const values = []
    const conditions = []
     
    Objects.key(filters).forEach((key) => {
        if(filters[key] !== undefined){
            values.push(filters[key])
            conditions.push(`${key} = $${values.length}`)
        }
    });

    if(conditions.length > 0){
        query += "WHERE" + conditions.join(" AND ")
    }
    return{ query, values }
}