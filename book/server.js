const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookController = require("./src/bookController.js");
const app = express();
const port = process.env.PORT || 3002;
const connectString = process.env.DB_CONNECT_STRING;

// Colors are always nice
const noColor = "\033[0m";
const azure = "\x1b[36m";

// Database Setup
// =============================================================================

mongoose.connect(
	connectString,
	err => {
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
				`\n${azure}Book is listening on http://0.0.0.0:${port}\n`
			);
		});

		// API routes
		// =============================================================================
		const router = express.Router();

		/*
	 * GET
	 */
		router.get("/", bookController.list);

		/*
	 * GET
	 */
		router.get("/:id", bookController.show);

		/*
	 * POST
	 */
		router.post("/", bookController.create);

		/*
	 * PUT
	 */
		router.put("/:id", bookController.update);

		/*
	 * DELETE
	 */
		router.delete("/:id", bookController.remove);

		app.use("/book", router);
	}
);
