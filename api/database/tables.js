
const listTables = (sequelize) => (req, res) => {
	sequelize
		.query('show tables')
		.then((rows) => {
			let tables = [];
			rows[0].forEach(row => tables.push(Object.values(row)[0]))
			res.json({...tables})
		})
		.catch((e) => {
			console.error(e)
		})
}

module.exports = {
	listTables,
}
