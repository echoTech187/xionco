const db = require('../../../config/db');

class AuthModel {
    async getUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ? and is_active = 1 LIMIT 1';
        const [rows] = await db.execute(query, [email]);
        return rows;
    }

    async getUserByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ? and is_active = 1 LIMIT 1';
        const [rows] = await db.execute(query, [username]);
        return rows;
    }

    async updateLastOnline(slug, isOnline = false) {
        const query = 'UPDATE users SET last_online_at = NOW(), is_online = ' + isOnline + ' WHERE slug = ?';
        const [result] = await db.execute(query, [slug]);
        return result;
    }

    async getUserBySlug(slug) {
        const query = 'SELECT fullname, email, username,is_online,slug FROM users WHERE slug = ? and is_active = 1 LIMIT 1';
        const [rows] = await db.execute(query, [slug]);
        return rows;
    }
}

module.exports = new AuthModel();