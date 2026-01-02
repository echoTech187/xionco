const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function generateToken(data) {
    payload = {
        slug: data.slug,
        fullname: data.fullname,
        username: data.username,
        email: data.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

async function generatePassword(password) {
    return await bcrypt.hash(password, 10);
}

async function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

async function validateHeader(req) {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    if (!token) {
        return null;
    }
    return token;
}
async function decodeToken(token) {
    const data = jwt.decode(token, process.env.JWT_SECRET);
    return data;
}
module.exports = { generateToken, comparePassword, generatePassword, verifyToken, validateHeader, decodeToken };