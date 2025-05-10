module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
          "@hooks": "./src/hooks",
          "@components": "./src/components",
          "@assets": "./assets",
        },
      },
    ],
  ],
};
