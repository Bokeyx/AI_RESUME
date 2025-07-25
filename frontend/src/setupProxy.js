const { createProxyMiddleware } = require('http-proxy-middleware'); 

module.exports = function(app) {
  app.use('/spring', 
    createProxyMiddleware({
      target: 'http://localhost:8080', 
      changeOrigin: true, 
      "secure": false, 
      pathRewrite: {
        '^/spring': '',
      }
    })
  )
}