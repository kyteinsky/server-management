
const listContainers = (docker) => (req, res) => {
	docker.listContainers({ all: true }, (err, containers) => {
		if (err) {
			console.error(err)
			res.send(err.message)
		} else {
			res.send(containers);
		}
	})
}

const doContainer = (docker) => (req, res) => {
	try {
		switch (req.params.action) {
			case 'stop':
				docker.getContainer(req.body.id).stop((e, f) => {
					if (e) {
						console.error(JSON.stringify(e));
						if (e?.json?.message) res.send(e?.json?.message)
						else res.send(e?.reason)
					} else res.send('')
				})
				break;
			case 'delete':
				docker.getContainer(req.body.id).remove(
					{ force: true },
					(e, f) => {
						if (e) {
							console.error(JSON.stringify(e));
							if (e?.json?.message) res.send(e?.json?.message)
							else res.send(e?.reason)
						} else res.send('')
					}
				)
				break;
			case 'start':
				docker.getContainer(req.body.id).start((e, f) => {
					if (e) {
						console.error(JSON.stringify(e));
						if (e?.json?.message) res.send(e?.json?.message)
						else res.send(e?.reason)
					} else res.send('')
				})
				break;
		}
	} catch (e) {
		console.error(JSON.stringify(e));
		res.send(e)
	}
}

module.exports = {
	listContainers,
	doContainer,
}
