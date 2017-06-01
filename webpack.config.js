const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.jsx',
  ],
  output: { 
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: 'public/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      // Images
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 10000000,
        },
      },
    // js
      {
        exclude: '/node_modules/',
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: ['es2015', 'react', 'stage-2'],
          },
        },
      },
    // CSS
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
};
