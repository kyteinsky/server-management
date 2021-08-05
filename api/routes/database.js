const express = require('express'),
	router = express.Router(),
	{ Sequelize } = require("sequelize");

require('dotenv').config()

const sequelize = new Sequelize({
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'mysql',
})

const { listTables } = require('../database/tables.js')

router.get('/tables', listTables(sequelize))

module.exports = router
