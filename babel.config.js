module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "55",
        },
      },
    ],
    ["@babel/preset-typescript"],
  ],
};
