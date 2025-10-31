module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],

    plugins: [
      'react-native-reanimated/plugin',
      'react-native-worklets/plugin', // 👈 Add this AFTER reanimated
    ],
  };
};