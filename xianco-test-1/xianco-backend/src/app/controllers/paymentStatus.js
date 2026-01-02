const paymentStatusModel = require('../models/paymentStatusModel');
class paymentStatus {
    async index(req, res) {
        try {
            const paymentStatuses = await paymentStatusModel.getPaymentStatuses();
            return res.status(200).json({
                success: true,
                message: 'success',
                data: paymentStatuses
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: "INTERNAL_SERVER_ERROR"
            })
        }
    }
}

module.exports = new paymentStatus();