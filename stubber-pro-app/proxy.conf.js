var PROXY_CONFIG = {
	"/api/v1/*": {
		"target": "http://localhost:4200/stubber-pro/admin",
		"secure": false,
		"logLevel": "debug",
		"changeOrigin": true,
	}
};

module.exports = PROXY_CONFIG;
