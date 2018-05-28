let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	dateOfBirth: Date,
	booksCheckedOut: [
		{
			type: Schema.Types.ObjectId,
			ref: "Book"
		}
	]
});

module.exports = mongoose.model("user", userSchema);
