const stockModel = require('../models/stockModel');

class Stock {
    async index(req, res) {
        try {

            const stocks = await stockModel.getStocks();
            return res.status(200).json({
                success: true,
                message: 'success',
                data: stocks
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
        }
    }
    async show(req, res) {
        try {
            const id = req.params.id;
            const stocks = await stockModel.getStocksById(id);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: stocks
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
        }
    }
    async store(req, res) {
        try {
            const stock = await stockModel.updateStock(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: stock
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
        }
    }
}

module.exports = new Stock();