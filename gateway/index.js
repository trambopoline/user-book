const express = require("express");
const cors = require("cors");
const proxy = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
app.use(cors());
const router = express.Router();

const port = process.env.PORT;
const userEndpoint = process.env.USER_ENDPOINT;
const bookEndpoint = process.env.BOOK_ENDPOINT;

// User
router.use("/user", proxy({
	target: userEndpoint,
	changeOrigin: true
}));

// Book
router.use("/book", proxy({
	target: bookEndpoint,
	changeOrigin: true
}));

// Prepend all api paths
app.use( router);

const noColor = '\033[0m';
const magenta = '\x1b[35m';

const server = app.listen(port, function () {
	console.log(`\n${magenta}API gateway is listening on http://localhost:${port}\n${noColor}`);
});