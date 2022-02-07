module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          assets: ["src/assets/*"],
          components: ["src/components/*"],
          constants: ["src/constants/*"],
          screens: ["src/screens/*"],
          utils: ["src/utils/*"],
        },
      },
    ],
  ],
};
