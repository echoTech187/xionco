const db = require('../../../config/db');
class orderStatusModel {
    async getOrderStatuses() {
        const query = 'SELECT * FROM order_statuses';
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = new orderStatusModel();