const productModel = require('../models/productModel');
const stockModel = require('../models/stockModel');

class Product {
    async index(req, res) {
        try {
            const data = await productModel.getProducts();
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
        return res.status(200).json({ success: true, message: 'Product' });
    }

    async store(req, res) {
        try {
            if (req.body.id) {
                const updateProduct = await productModel.updateProduct(req.body);
                if (updateProduct) {
                    return res.status(200).json({ success: true, message: 'Product telah diupdate' });
                } else {
                    return res.status(500).json({ success: false, message: updateProduct.message, error: "PRODUCT_UPDATED_FAILED" });
                }
            } else {
                const product = await productModel.getProductByName(req.body.name);
                if (product.length > 0) {
                    const stock = await stockModel.getStocksById(product[0].id);
                    if (stock.length > 0) {
                        return res.status(200).json({ success: true, message: 'Product telah ditambahkan' });
                    } else {
                        const initStock = {
                            product_id: product[0].id,
                            current_stock: 0
                        }
                        try {
                            const insertStock = await stockModel.insertStock(initStock);
                            if (insertStock.insertId !== 0) {
                                return res.status(200).json({ success: true, message: 'Product telah ditambahkan' });
                            } else {
                                return res.status(500).json({ success: false, message: insertStock.message, error: "STOCK_CREATED_FAILED" });
                            }
                        } catch (error) {
                            return res.status(500).json({ success: false, message: error.message, error: "INTERNAL_SERVER_ERROR" });
                        }
                    }
                }
                const insertProduct = await productModel.insertProduct(req.body);
                if (insertProduct) {
                    const initStock = {
                        product_id: insertProduct.insertId,
                        current_stock: 0
                    }
                    const insertStock = await stockModel.insertStock(initStock);
                    if (!insertStock) {
                        return res.status(500).json({ success: false, message: insertStock.message, error: "STOCK_CREATED_FAILED" });
                    } else {
                        return res.status(200).json({ success: true, message: 'Product telah ditambahkan' });
                    }
                } else {
                    return res.status(500).json({ success: false, message: insertProduct.message, error: "PRODUCT_CREATED_FAILED" });
                }
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message, error: "INTERNAL_SERVER_ERROR" });
        }
    }

    async update(req, res) {
        try {
            if (req.body.id) {
                const updateProduct = await productModel.updateProduct(req.body);
                if (updateProduct) {
                    return res.status(200).json({ success: true, message: 'Product telah diupdate' });
                } else {
                    return res.status(500).json({ success: false, message: updateProduct.message, error: "PRODUCT_UPDATED_FAILED" });
                }
            }

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message, error: "INTERNAL_SERVER_ERROR" });
        }
    }

    async destroy(req, res) {
        const id = req.params.id;
        try {
            const checkProduct = await productModel.getProductById(id);
            if (checkProduct.length == 0) {
                return res.status(500).json({ success: false, message: 'Product tidak ditemukan', error: "PRODUCT_NOT_FOUND" });
            }
            const deleteProduct = await productModel.deleteProduct(id);
            if (deleteProduct) {
                return res.status(200).json({ success: true, message: 'Product telah dihapus' });
            } else {
                return res.status(500).json({ success: false, message: deleteProduct.message, error: "PRODUCT_DELETED_FAILED" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message, error: "INTERNAL_SERVER_ERROR" });
        }
    }

}

module.exports = new Product();