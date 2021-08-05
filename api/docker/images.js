
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

module.exports = {
	listImages,
	deleteImage,
}
