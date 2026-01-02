const orderModel = require('../models/orderModel');
class Order {
    async index(req, res) {
        try {
            const data = await orderModel.getOrders();
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

    async show(req, res) {
        if (!req.params.id) return res.status(500).json({ success: false, message: 'ID Order Tidak Ditemukan', error: "ORDER_NOT_FOUND" });
        try {
            const data = await orderModel.getOrderById(req.params.id);
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

    async store(req, res) {
        const rows = req.body;
        if (!rows) return res.status(500).json({ success: false, message: 'Order Tidak Ditemukan', error: "ORDER_NOT_FOUND" });

        try {
            const data = await orderModel.insertOrder(req.body);
            if (data.insertId) {
                const insertItem = await orderModel.insertOrderItem(data.insertId, req.body.order_item);
                if (!insertItem) {
                    return res.status(500).json({ success: false, message: "Order Item gagal ditambahkan", error: "ORDER_ITEM_CREATED_FAILED" });
                } else {
                    return res.status(200).json({ success: true, message: 'Order telah ditambahkan', data: data.order_number });
                }
            } else {
                return res.status(500).json({ success: false, message: "Order gagal ditambahkan", error: "ORDER_CREATED_FAILED" });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: "INTERNAL_SERVER_ERROR"
            })
        }

    }

    async update(req, res) { }

    async destroy(req, res) { }
}

module.exports = new Order();