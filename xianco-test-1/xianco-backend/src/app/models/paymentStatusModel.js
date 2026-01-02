const db = require('../../../config/db');
class paymentStatusModel {
    async getPaymentStatuses() {
        const query = 'SELECT * FROM payment_statuses';
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = new paymentStatusModel();