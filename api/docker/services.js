
const listServices = (docker) => (req, res) => {
	docker.listServices((err, services) => {
		if (err) {
			console.error(err);
			res.send(err);
		} else {
			res.send(services);
		}
	})
}

module.exports = {
	listServices,
}
