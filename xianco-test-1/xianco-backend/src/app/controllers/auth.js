require('dotenv').config();
const authModel = require('../models/authModel')
const decode = require('../lib/utils');
const {
    generateToken,
    comparePassword
} = require('../lib/utils.js');
const e = require('express');
class Auth {
    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username/Password tidak boleh kosong!', error: "FIELDS_REQUIRED" });
        }
        try {
            await authModel.getUserByUsername(username).then(async (rows) => {
                if (rows.length > 0) {
                    const row = rows[0];
                    const hashedPassword = row.password;
                    const passwordMatch = await comparePassword(password, hashedPassword);
                    if (!passwordMatch) {
                        return res.status(200).json({ success: false, message: 'Password salah', error: "WRONG_PASSWORD" });
                    }

                    await authModel.updateLastOnline(row.slug, true).catch((err) => {
                        return res.status(500).json({ success: false, message: err.message, error: 'INTERNAL_SERVER_ERROR' });
                    });
                    const token = await generateToken(row);
                    return res.status(200).json({ success: true, message: 'Login successful', username: row.username, token: token });
                }
                return res.status(200).json({ success: false, message: 'Akun tidak ditemukan', error: 'USER_NOT_FOUND' });
            });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message, error: 'INTERNAL_SERVER_ERROR' });
        }
    }
    async profile(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized', error: 'UNAUTHORIZED' });
        }
        try {
            const arrayData = await decode.decodeToken(token);
            const slug = arrayData.slug;
            const data = await authModel.getUserBySlug(slug);
            if (data.length > 0) {
                return res.status(200).json({ success: true, message: 'Success', data: data[0] });
            } else {
                return res.status(401).json({ success: false, message: 'Unauthorized', error: 'UNAUTHORIZED' });
            }
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message, error: 'INTERNAL_SERVER_ERROR' });
        }
    }
}

module.exports = new Auth();