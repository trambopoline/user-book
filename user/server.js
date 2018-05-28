const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const userController = require("./src/userController.js");
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

// Database Setup
// =============================================================================
const connectString = process.env.DB_CONNECT_SECRETS;

// console.log( connectString );
mongoose.connect(connectString, (err) =>{
	if (err) throw err;
	const noColor = '\033[0m';
	const azure = '\x1b[36m';
	console.log(`\n${azure}Successfully connected to database using connection string:${noColor}\n\t${connectString}\n`);
});

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
	console.log("\x1b[36m" + `\nUser is listening on http://${host}:${port}\n`);
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
