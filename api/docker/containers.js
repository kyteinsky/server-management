
const listContainers = (docker) => (req, res) => {
	docker.listContainers((err, containers) => {
		if (err) {
			console.error(err);
			res.send(err);
		} else {
			res.send(containers);
		}
	})
}

const stopContainer = (docker) => (req, res) => {
	docker.getContainer(req.body.ContainerId).stop((err) => {
		if (err) {
			console.error(err);
			res.send('Some error occurred')
		}
		res.send('Success');
	});
}

module.exports = {
	listContainers,
	stopContainer,
}
