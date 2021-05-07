module.exports = function (api) {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {},
          modules: 'auto',
          corejs: { version: '3.8', proposals: true },
          useBuiltIns: 'usage',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: '3',
        },
      ],
    ],
  };
};
