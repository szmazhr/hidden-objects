const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/hidden-objects/',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: 'text/css',
      filename: 'bundle-[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
