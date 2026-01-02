const paymentMethodModel = require('../models/paymentMethodModel');
class paymentMethod {
    async index(req, res) {
        try {
            const paymentMethods = await paymentMethodModel.getPaymentMethods();
            res.status(200).json({
                success: true,
                message: 'success',
                data: paymentMethods
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: "INTERNAL_SERVER_ERROR"
            });
        }
    }
}

module.exports = new paymentMethod();