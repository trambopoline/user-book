let userModel = require("./userModel.js");
let mongoose = require("mongoose");
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
	/**
	 * userController.list()
	 */
	list: function (req, res) {

		const find = req.query.find ? JSON.parse(req.query.find) : {};

		// find.booksCheckedOut = mongoose.Types.ObjectId(find.booksCheckedOut);
		// console.log(mongoose.Types.ObjectId.isValid(find.booksCheckedOut));
		if (find.booksCheckedOut && mongoose.Types.ObjectId.isValid(find.booksCheckedOut)) {
			find.booksCheckedOut = mongoose.Types.ObjectId(find.booksCheckedOut);
			console.log(find);
		}
		// let limit = Number(req.query.limit) || 20;
		let sort = req.query.sort || {
			name: -1
		};
		userModel
			.find(find)
			.sort(sort)
			// .limit(limit)
			.exec(function (err, users) {
				if (err) {
					return res.status(500).json({
						message: "Error when getting user.",
						error: err
					});
				}
				return res.json(users);
			});
	},

	/**
	 * userController.show()
	 */
	show: function (req, res) {
		let id = req.params.id;
		userModel.findOne({
			_id: id
		}, function (err, user) {
			if (err) {
				return res.status(500).json({
					message: "Error when getting user.",
					error: err
				});
			}
			if (!user) {
				return res.status(404).json({
					message: "No such user"
				});
			}
			return res.json(user);
		});
	},

	/**
	 * userController.create()
	 */
	create: function (req, res) {
		console.log(req.body);
		let user = new userModel({
			name: req.body.name,
			email: req.body.email,
			dateOfBirth: req.body.dateOfBirth,
			created: req.body.created,
			booksCheckedOut: req.body.booksCheckedOut
		});

		user.save(function (err, user) {
			if (err) {
				return res.status(500).json({
					message: "Error when creating user",
					error: err
				});
			}
			return res.status(201).json(user);
		});
	},

	/**
	 * userController.update()
	 */
	update: function (req, res) {
		let id = req.params.id;
		userModel.findOne({
			_id: id
		}, function (err, user) {
			if (err) {
				return res.status(500).json({
					message: "Error when getting user",
					error: err
				});
			}
			if (!user) {
				return res.status(404).json({
					message: "No such user"
				});
			}

			user.name = req.body.name ? req.body.name : user.name;
			user.email = req.body.email ? req.body.email : user.email;
			user.dateOfBirth = req.body.dateOfBirth ?
				req.body.dateOfBirth :
				user.dateOfBirth;
			user.created = req.body.created ? req.body.created : user.created;
			user.booksCheckedOut = req.body.booksCheckedOut ?
				req.body.booksCheckedOut :
				user.booksCheckedOut;

			user.save(function (err, user) {
				if (err) {
					return res.status(500).json({
						message: "Error when updating user.",
						error: err
					});
				}

				return res.json(user);
			});
		});
	},

	/**
	 * userController.remove()
	 */
	remove: function (req, res) {
		let id = req.params.id;
		userModel.findByIdAndRemove(id, function (err, user) {
			if (err) {
				return res.status(500).json({
					message: "Error when deleting the user.",
					error: err
				});
			}
			return res.status(204).json();
		});
	}
};