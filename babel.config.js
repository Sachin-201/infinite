// Old async configuration
// module.exports = async () => ({
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-typescript',
//     '@babel/preset-react',
//   ],
//   plugins: ['@babel/plugin-syntax-jsx'],
// });

// New synchronous configuration
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-syntax-jsx'],
  };
  