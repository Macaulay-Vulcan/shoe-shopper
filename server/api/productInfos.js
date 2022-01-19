const router = require("express").Router();
const Sequelize = require("sequelize");
const {
	models: { ProductInfo },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleWare");

module.exports = router;

router.get("/product/:productId", async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const productInfos = await ProductInfo.findAll({
			where: {
				productId: productId,
			},
		});
		res.json(productInfos);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const productInfo = await ProductInfo.findByPk(req.params.id, {
			attributes: ["id", "color", "size", "stock"],
		});
		res.json(productInfo);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
	try {
		const { productInfo } = req.body;
		const newProductInfo = await ProductInfo.findByPk(req.params.id);
		newProductInfo.update(productInfo);
		res.json(newProductInfo);
	} catch (error) {
		console.error("🧑🏻‍💻 Error while updating productInfo in router!");
		next(error);
	}
});
