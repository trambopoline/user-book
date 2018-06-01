const express = require("express");
const cors = require("cors");
const proxy = require("http-proxy-middleware");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const userEndpoint = process.env.USER_ENDPOINT;
const bookEndpoint = process.env.BOOK_ENDPOINT;

// Colors are always nice
const noColor = '\033[0m';
const magenta = '\x1b[35m';

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

app.use(cors());
app.use( router);

const server = app.listen(port, function () {
	console.log(`\n${magenta}API gateway is listening on http://localhost:${port}\n${noColor}`);
});