const express = require('express'),
	router = express.Router(),
	Docker = require('dockerode'),
	docker = new Docker({ socketPath: '/var/run/docker.sock' })

require('node-json-color-stringify')

router.get('/', (req, res) => {
	console.log('docker here');
	res.send("docker here");
})

const {
	listImages,
	deleteImage,
} = require('../docker/images.js');

const {
	listContainers,
	stopContainer,
} = require('../docker/containers.js');

const { listServices } = require('../docker/services.js');


router.get('/images', listImages(docker))
router.post('/images/delete', deleteImage(docker))

router.get('/containers', listContainers(docker))
router.post('/containers/stop', stopContainer(docker))

router.get('/services', listServices(docker))

module.exports = router
