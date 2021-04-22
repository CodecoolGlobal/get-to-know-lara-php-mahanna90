const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara',
        createProxyMiddleware({
            target: 'http://localhost',
            changeOrigin: true,
        })
    );
};