const db = require('../../../config/db');
class orderModel {
    async getOrders() {
        const query = 'SELECT *,b.name as customer_name,c.name as payment_method,d.name as payment_status,e.name as order_status FROM orders as a JOIN customers as b ON a.customer_id = b.id JOIN payment_methods as c ON a.payment_method_id = c.id JOIN payment_statuses as d ON a.payment_status_id = d.id JOIN order_statuses as e ON a.order_status_id = e.id WHERE a.is_active = 1 ORDER BY a.createdAt DESC';
        const [rows] = await db.execute(query);
        if (rows.length > 0) {
            return rows;
        }
        return [];
    }

    async getOrderById(id) {
        const query = 'SELECT *,b.name as customer_name,c.name as payment_method,d.name as payment_status,e.name as order_status FROM orders as a JOIN customers as b ON a.customer_id = b.id JOIN payment_methods as c ON a.payment_method_id = c.id JOIN payment_statuses as d ON a.payment_status_id = d.id JOIN order_statuses as e ON a.order_status_id = e.id WHERE a.is_active = 1 AND a.id = ? LIMIT 1';
        const [rows] = await db.execute(query, [id]);
        if (rows.length > 0) {
            return rows[0];
        }
        return [];
    }

    async insertOrder(data) {
        try {
            const order_number = 'XI' + Date.now() + '/' + Math.floor(Math.random() + 10000) * Math.random();
            const query = 'INSERT INTO orders (order_number, customer_id, customer_name, payment_method_id, payment_method, payment_status_id, payment_status, order_status_id, order_status,total_price,order_item,is_active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,? ,?, 1, NOW(), NOW())';
            const [rows] = await db.execute(query, [order_number, data.customer_id, data.customer_name, data.payment_method_id, data.payment_method, data.payment_status_id, data.payment_status, data.order_status_id, data.order_status, data.total_price, data.order_item]);
            return rows;
        } catch (error) {
            return error.message;
        }
    }

    async insertOrderItem(order_id, order_item) {

        try {

            const results = order_item.map(async item => {
                const query = 'INSERT INTO order_items (order_id, product_id, productName, quantity, price, amount,createdAt, updatedAt) VALUES (?, ?,?, ?, ?, ?, NOW(), NOW())';
                const rows = await db.execute(query, [order_id, item.product_id, item.productName, item.quantity, item.price, item.amount]);
                return rows;
            })

            return results;
        } catch (error) {
            return error.message;
        }

    }
}

module.exports = new orderModel();