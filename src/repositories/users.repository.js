async function createUserRecord(user, ctx) {
    const { connection } = ctx.state
    try {
        const id = await connection('users').insert(user).returning('id')
        return id
    } catch (e) {
        if (e.code === '23505') {
            throw new Error('User already exists')
        }
        throw e
    }
}

async function getUserRecord(email, ctx) {
    const { connection } = ctx.state
    const user = await connection('users').where({ email }).first()
    return user
}

module.exports = {
    createUserRecord,
    getUserRecord,
}