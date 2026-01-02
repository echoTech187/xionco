const db = require('../../../config/db');

class stockModel {
    async getStocks() {
        const query = 'SELECT * FROM product_stocks';
        const [rows] = await db.execute(query);
        if (rows.length > 0) {
            return rows;
        }
        return [];
    }

    async getStocksById(id) {
        const query = 'SELECT * FROM product_stocks WHERE product_id = ?';
        const [rows] = await db.execute(query, [id]);
        if (rows.length > 0) {
            return rows;
        }
        return [];
    }

    async insertStock(data) {
        console.log(data);
        const query = 'INSERT INTO product_stocks (product_id, current_stock, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())';
        const [rows] = await db.execute(query, [data.product_id, data.current_stock]);
        return rows;
    }

    async updateStock(data) {
        const query = 'UPDATE product_stocks SET current_stock = ?, createdAt = NOW(), updatedAt = NOW() WHERE product_id = ?';
        const rows = await db.execute(query, [data.current_stock, data.product_id]);
        return rows;
    }
}
module.exports = new stockModel();