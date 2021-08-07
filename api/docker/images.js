
const listImages = (docker) => (req, res) => {
	docker.listImages((err, images) => {
		if (err) {
			console.error(err);
			res.send(err);
		} else {
			res.send(images);
		}
	})
}

const deleteImage = (docker) => (req, res) => {
	try {
		docker.getImage(req.body.ImageId).remove(err => {
			if (err) {
				console.error(err);
				res.status(409).send('Some error occurred')
			}
			res.send('Success');
		})
	} catch(e) {
		console.error('some interesting error here:', e)
	}
}

const doImage = (docker) => (req, res) => {
	try {
		switch (req.params.action) {
			case 'delete':
				docker.getImage(req.body.ImageId).remove(e => {
						if (e) {
							console.error(JSON.stringify(e));
							if (e?.json?.message) res.send(e?.json?.message)
							else res.send(e?.reason)
						} else res.send('Success')
					}
				)
				break;
		}
	} catch (e) {
		console.error(JSON.stringify(e));
		res.send(e)
	}
}

module.exports = {
	listImages,
	doImage,
}
