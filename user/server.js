const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("./src/userController.js");
const app = express();
const port = process.env.PORT || 3001;
const connectString = process.env.DB_CONNECT_STRING;

// Colors are always nice
const noColor = "\033[0m";
const azure = "\x1b[36m";

// Database Setup
// =============================================================================

mongoose.connect(connectString, err => {
	if (err) {
		console.log(connectString);
		throw err;
	}
	console.log(
		`\n${azure}Successfully connected to database using connection string:${noColor}\n\t${connectString}\n`
	);

	// App setup
	// =============================================================================

	app.use(
		bodyParser.urlencoded({
			extended: false
		})
	);
	app.use(bodyParser.json());

	app.use(function(error, request, response, next) {
		response.status(error.status || 500);
		response.json({
			error: error.message
		});
	});

	const server = app.listen(port, function() {
		console.log(
			`\n${azure}User is listening on http://127.0.0.1:${port}\n`
		);
	});

	// API routes
	// =============================================================================
	const router = express.Router();

	/*
	 * GET
	 */
	router.get("/", userController.list);

	/*
	 * GET
	 */
	router.get("/:id", userController.show);

	/*
	 * POST
	 */
	router.post("/", userController.create);

	/*
	 * PUT
	 */
	router.put("/:id", userController.update);

	/*
	 * DELETE
	 */
	router.delete("/:id", userController.remove);

	app.use("/user", router);
});
