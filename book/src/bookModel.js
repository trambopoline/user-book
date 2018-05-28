let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		default: "No summary for this book"
	},
	author: {
		type: String,
		required: true
	},
	published:  Date
});

module.exports = mongoose.model("book", bookSchema);
