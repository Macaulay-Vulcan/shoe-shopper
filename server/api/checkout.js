const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Product, ProductInfo, User, Order, OrderInfo },
} = require('../db');

module.exports = router;

router.put('/:orderId', async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { orderTotal } = req.body;
      const token = req.headers.authorization;
      const user = await User.findByToken(token);
      
      const order = await Order.findByPk(orderId, {
        attributes: ['id', 'order_total', 'isActive', 'userId'],
        include: {
          model: OrderInfo,
          attributes: ['id', 'quantity', 'total_price', 'createdAt'],
          include: {
            model: ProductInfo,
            attributes: ['id', 'color', 'stock', 'size'],
            include: {
              model: Product,
              attributes: [
                'id',
                'name',
                'description',
                'type',
                'brand',
                'image',
                'unit_price',
              ],
            },
          },
        },
      });
      if (!order) {
        const error = new Error("Cart not found");
        error.status = 404;
        next(error);
      } else if (order.userId !== user.id) {
        const error = new Error("Only users can checkout their own carts");
        error.status = 401;
        next(error);
      } else {
        await order.update({
            'order_total': orderTotal,
            isActive: false
        });
        res.json(order);
      }
    } catch (error) {
      next(error);
    }
})