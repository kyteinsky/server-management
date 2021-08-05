var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });
require('node-json-color-stringify')


// docker.listImages(function (err, containers) {
// 	console.log(JSON.colorStringify(containers, null, 2));
// });

const timeago = require('timeago.js');
console.log(timeago.format(new Date()));
