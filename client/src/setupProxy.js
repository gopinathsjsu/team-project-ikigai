const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'http://18.222.23.211:5000',
    
}
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );
};