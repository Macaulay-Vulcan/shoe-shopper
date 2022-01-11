const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct).status(201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const productToBeUpdated = await Product.findByPk(req.params.id);
    await productToBeUpdated.update(req.body);
    res.json(productToBeUpdated).status(201);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const productToBeDeleted = await Product.findByPk(req.params.id);
    await productToBeDeleted.destroy();
    res.json(productToBeDeleted).status(201);
  } catch (error) {
    next(error);
  }
});
