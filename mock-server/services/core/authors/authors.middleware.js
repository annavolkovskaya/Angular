const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
module.exports = (server) => {

	router.get('/authors', (req, res, next) => {

		let authors = server.db.getState().authors;
		res.json({
			authors
		});
	});
	return router;
};
