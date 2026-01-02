const db = require('../../../config/db');
class customerModel {
    async getCustomers() {
        try {
            const query = 'SELECT * FROM customers';
            const [customers] = await db.execute(query);
            return customers;
        } catch (err) {
            return [];
        }
    }
}

module.exports = new customerModel();