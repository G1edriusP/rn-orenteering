module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          constants: './src/constants',
          'components/*': './src/components',
          containers: './src/containers',
          utils: './src/utils',
          styles: './src/styles',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
