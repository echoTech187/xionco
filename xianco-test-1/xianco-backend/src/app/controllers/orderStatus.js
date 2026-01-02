const orderStatusModel = require('../models/orderStatusModel');
class orderStatus {
    async index(req, res) {
        try {
            const data = await orderStatusModel.getOrderStatuses();
            return res.status(200).json({
                success: true,
                message: 'success',
                data: data
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

module.exports = new orderStatus();