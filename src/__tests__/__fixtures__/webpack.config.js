// eslint-disable-next-line import/no-unassigned-import
require('babel-register')

const path = require('path')

module.exports = {
  context: __dirname,
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('../../loader'),
          },
        ],
      },
    ],
  },
  externals: {
    glamorous: 'glamorous',
  },
}
