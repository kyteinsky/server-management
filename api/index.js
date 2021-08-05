'use strict';

const express = require('express'),
	app = express(),
	router = express.Router(),
	morgan = require('morgan'),
	verifyToken = require('./jwt_middleware')

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(morgan('combined'))

app.use(verifyToken)

// routes
const dockerRoutes = require('./routes/docker')
app.use('/docker', dockerRoutes)

const dbRoutes = require('./routes/database')
app.use('/database', dbRoutes)

app.all('/user', (req, res) => {
	res.json({ user: req.user })
})

module.exports = app
