const db = require('../../../config/db');

class productModel {
    async getProducts() {
        const query = 'SELECT a.*, b.current_stock FROM products as a JOIN product_stocks as b ON a.id = b.product_id WHERE a.is_active = 1 ORDER BY a.createdAt DESC';
        const [rows] = await db.execute(query);
        if (rows.length > 0) {
            return rows;
        }
        return [];
    }
    async getProductById(id) {
        const query = 'SELECT * FROM products WHERE id = ? and is_active = 1 LIMIT 1';
        const [rows] = await db.execute(query, [id]);
        return rows;
    }
    async getProductByName(name) {
        const query = 'SELECT * FROM products WHERE name = ? and is_active = 1 LIMIT 1';
        const [rows] = await db.execute(query, [name]);
        return rows;
    }

    async insertProduct(data) {
        const query = 'INSERT INTO products (name, sku, category,  description, price, image,is_active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?,1, NOW(), NOW())';
        const [rows] = await db.execute(query, [data.name, data.sku, data.category, data.description, data.price, data.image]);
        return rows;
    }

    async updateProduct(data) {
        const query = 'UPDATE products SET name = ?, sku = ?, category = ?,  description = ?, price = ?, image = ?, updatedAt = NOW() WHERE id = ?';
        const [rows] = await db.execute(query, [data.name, data.sku, data.category, data.description, data.price, data.image, data.id]);
        return rows;
    }

    async deleteProduct(id) {
        const query2 = 'DELETE FROM product_stocks WHERE product_id = ?';
        const [rows2] = await db.execute(query2, [id]);
        const query = 'DELETE FROM products WHERE id = ?';
        const [rows] = await db.execute(query, [id]);


        return rows;
    }
}

module.exports = new productModel();