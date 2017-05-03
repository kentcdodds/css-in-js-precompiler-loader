// eslint-disable-next-line import/no-unassigned-import
require('babel-register')

const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('../../src/loader'),
          },
        ],
      },
    ],
  },
  devtool: 'eval',
  externals: {
    react: 'React',
    glamor: 'Glamor',
    glamorous: 'glamorous',
    'react-dom': 'ReactDOM',
  },
}
