const router = require("express").Router();
const Sequelize = require("sequelize");
const {
	models: { Product, ProductInfo },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleWare");

module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id, {
			attributes: [
				"id",
				"name",
				"description",
				"type",
				"brand",
				"image",
				"unit_price",
			],
			include: {
				model: ProductInfo,
				attributes: ["id", "color", "stock", "size", "productId"],
			},
		});
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post("/", requireToken, isAdmin, async (req, res, next) => {
	try {
		const product = req.body;
		if (product.image === "") delete product.image; // display default image if no link given
		const newProduct = await Product.create(product);
		res.json(newProduct).status(201);
	} catch (error) {
		next(error);
	}
});

router.post("/:productId", async (req, res, next) => {
	try {
		const { color, stock, size } = req.body;
		const newProductInfo = await ProductInfo.create({
			color,
			stock,
			size,
			productId: req.params.productId,
		});
		res.json(newProductInfo).status(201);
	} catch (error) {
		next(error);
	}
});

router.put("/:productId", async (req, res, next) => {
	try {
		const productToBeUpdated = await Product.findByPk(req.params.productId);
		if (!productToBeUpdated) {
			const error = new Error("Product not found");
			error.status = 404;
			next(error);
		} else {
			await productToBeUpdated.update(req.body);
			const updatedProduct = await Product.findByPk(req.params.productId, {
				attributes: [
					"id",
					"name",
					"description",
					"type",
					"brand",
					"image",
					"unit_price",
				],
			});
			res.json(updatedProduct).status(201);
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:productId/:productInfoId", async (req, res, next) => {});

router.delete("/:id", async (req, res, next) => {
	try {
		const productToBeDeleted = await Product.findByPk(req.params.id);
		await productToBeDeleted.destroy();
		res.json(productToBeDeleted).status(201);
	} catch (error) {
		next(error);
	}
});
