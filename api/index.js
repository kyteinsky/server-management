'use strict';

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.all('/', (req, res) => {
	res.json({ data: 'data' })
})

module.exports = app
