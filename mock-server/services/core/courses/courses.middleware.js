const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
module.exports = (server) => {

	router.get('/courses', (req, res, next) => {

		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			page = +query.page || 0,
			count = +query.count || 5,
			search = query.search || '',
			currentCount = +query.currentCount || count,
			courses = server.db.getState().courses;
		const startIndex = currentCount * page;
		let finishIndex = startIndex + count;
		if (courses.length < finishIndex) {
			finishIndex = courses.length;
		}
		courses = courses.filter(course => course.title.toLowerCase().match(search.toLowerCase()));
		const totalNumber = Math.ceil(courses.length / count);
		const currentPage = Math.ceil(startIndex / count);
		courses = courses.slice(startIndex, finishIndex);
		res.json({
			courses,
			totalNumber,
			currentPage
		});
	});

	router.delete('/courses', (req, res, next) => {

		let courseId = req.body.id;
		let courses = server.db.getState().courses;
			matchedCourseIndex = courses.findIndex((course) => {
				return course.id === courseId;
			});

		if(matchedCourseIndex === -1) {
			res.status(401).send({ error: 'No such course' });
		} else {
			courses.splice(matchedCourseIndex, 1);
			fs.writeFile("./services/core/courses/courses.db.json", JSON.stringify({ courses }), 'utf8', () => res.send(true)); 
		}
	});
	
	return router;
};
