const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { Product, ProductInfo, User, Order, OrderInfo }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.body;
        const order = await Order.findOne({
            where: {
                userId: userId,
                isActive: true
            },
            attributes: ['id', 'order_total', 'isActive', 'userId'],
            include: {
                model: OrderInfo,
                attributes: ['id', 'quantity', 'total_price'],
                include: {
                    model: ProductInfo,
                    attributes: ['id', 'color', 'stock', 'size'],
                    include: {
                        model: Product,
                        attributes: ['id', 'name', 'description', 'type', 'brand', 'image', 'unit_price'],
                    }
                }
            }
        });
        if (!order) {
            const error = new Error('Cart not found');
            error.status = 404;
            next(error);
        } else {
            res.json(order);
        }
    } catch (error) {
        next(error)
    }
})