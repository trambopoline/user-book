let bookModel = require('./bookModel.js');

/**
 * bookController.js
 *
 * @description :: Server-side logic for managing books.
 */
module.exports = {

    /**
     * bookController.list()
     */
    list: function (req, res) {

        const find = req.query.find ? JSON.parse(req.query.find) : {};

        console.log(find);
        let limit = Number(req.query.limit) || 20;
        let sort = req.query.sort || {
            title: -1
        };
        bookModel
            .find(find)
            .sort(sort)
            .limit(limit)
            .exec(function (err, books) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting book.',
                        error: err
                    });
                }
                return res.json(books);
            });
    },

    /**
     * bookController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        bookModel.findOne({
            _id: id
        }, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book.',
                    error: err
                });
            }
            if (!book) {
                return res.status(404).json({
                    message: 'No such book'
                });
            }
            return res.json(book);
        });
    },

    /**
     * bookController.create()
     */
    create: function (req, res) {
        console.log(req.body);
        let book = new bookModel({
            title: req.body.title,
            summary: req.body.summary,
            author: req.body.author,
            created: req.body.created,
            checkedOutBy: req.body.checkedOutBy

        });

        book.save(function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating book',
                    error: err
                });
            }
            return res.status(201).json(book);
        });
    },

    /**
     * bookController.update()
     */
    update: function (req, res) {
        let id = req.params.id;
        bookModel.findOne({
            _id: id
        }, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book',
                    error: err
                });
            }
            if (!book) {
                return res.status(404).json({
                    message: 'No such book'
                });
            }

            book.title = req.body.title ? req.body.title : book.title;
            book.summary = req.body.summary ? req.body.summary : book.summary;
            book.author = req.body.author ? req.body.author : book.author;
            book.created = req.body.created ? req.body.created : book.created;
            book.checkedOutBy = req.body.checkedOutBy ? req.body.checkedOutBy : book.checkedOutBy;

            book.save(function (err, book) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating book.',
                        error: err
                    });
                }

                return res.json(book);
            });
        });
    },

    /**
     * bookController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;
        bookModel.findByIdAndRemove(id, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the book.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};