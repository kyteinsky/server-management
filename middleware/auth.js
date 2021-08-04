// send access_token with every request

module.exports = function (context) {
	context.$axios.setToken(localStorage.access_token);
}
