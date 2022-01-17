const router = require('express').Router();
const { createDispatchHook } = require('react-redux');
const Sequelize = require('sequelize');
const {
  models: { Product, ProductInfo, User, Order, OrderInfo },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const order = await Order.findOne({
      where: {
        userId: user.id,
        isActive: true,
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
      const error = new Error('Cart not found');
      error.status = 404;
      next(error);
    } else {
      res.json(order);
    }
  } catch (error) {
    next(error);
  }
});

//how do we have a user ID here?
router.post('/', async (req, res, next) => {
  try {
    // step 1 : check if order exist
    //step 2 : if exist, append
    //step 3 : if doesnt, create

    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const [cart, newCart] = await Order.findOrCreate({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    const newCartLineItem = await OrderInfo.create({
      quantity: 1,
      size: req.body.size,
      color: req.body.color,
    });

    cart.addOrderInfo(newCartLineItem);
    res.json(newCartLineItem);
  } catch (error) {
    next(error);
  }
});
