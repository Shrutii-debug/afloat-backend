export const getPagination = (page = 1, limit = 10) => {
    const p = parseInt(page)
    const l = parseInt(limit)
    const offset = (p - 1) * l;

    return{ limit: l, offset }
}