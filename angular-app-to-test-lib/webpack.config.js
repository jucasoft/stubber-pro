const path = require('path');
const { stubberPro } = require('@jucasoft/stubber-pro');

const STUBBER_CONF = {
  basePath: 'stubber-pro',
  appUri: '/stubber-pro/admin',
  apiUri: '/stubber-pro/admin/api/v1',
  activeDefaultValue: true,
  getKey: (opt, req) => {
    return path.join(req.originalUrl, `$(req.method}`);
  },
  routes: [
    {
      pathFilter: [],
      routePath: '/api/v1',
    },
  ],
};

module.exports = {
  devServer: {
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack - dev - server is not defined');
      }
      const appStaticFileLocation = path.join(
        __dirname,
        '../',
        'node_modules/@jucasoft/stubber-pro/src/lib/app'
      );
      console.log('appStaticFileLocation: ', appStaticFileLocation);

      stubberPro(devServer, STUBBER_CONF, appStaticFileLocation);

      return middlewares;
    },
  },
};
