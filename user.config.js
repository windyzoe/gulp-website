module.exports = {
  port: 3000,
  proxyConfig: [
    {
      path: '/exchangeApi',
      config: { target: 'http://192.168.168.125:8581', changeOrigin: true },
    },
  ],
};
