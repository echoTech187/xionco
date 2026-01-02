const db = require('../../../config/db');
class paymentMethodModel {
    async getPaymentMethods() {
        const query = 'SELECT * FROM payment_methods';
        const [paymentMethods] = await db.execute(query);
        return paymentMethods;
    }
}

module.exports = new paymentMethodModel();