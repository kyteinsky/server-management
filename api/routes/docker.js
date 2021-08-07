const express = require('express'),
	router = express.Router(),
	Docker = require('dockerode'),
	docker = new Docker({ socketPath: '/var/run/docker.sock' })

require('node-json-color-stringify')

router.get('/', (req, res) => {
	res.send("Welcome to The Management Console!");
})

const {
	listImages,
	doImage,
} = require('../docker/images.js');

const {
	listContainers,
	doContainer,
} = require('../docker/containers.js');

const { listServices } = require('../docker/services.js');


router.get('/images', listImages(docker))
router.post('/images/:action', doImage(docker))

router.get('/containers', listContainers(docker))
router.post('/containers/:action', doContainer(docker))

router.get('/services', listServices(docker))

module.exports = router
