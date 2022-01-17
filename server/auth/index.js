const router = require("express").Router();
const {
	models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		res.send({ token: await User.authenticate({ username, password }) });
	} catch (err) {
		next(err);
	}
});

router.post("/signup", async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.send({ token: await user.generateToken() });
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			const type = err.errors[0].path;
			res.status(401).send(`${type} is already taken`);
		} else {
			next(err);
		}
	}
});

router.get("/me", async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (ex) {
		next(ex);
	}
});
