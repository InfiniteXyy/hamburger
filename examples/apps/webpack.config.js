const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './index.tsx',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.hbg$/i,
        use: ['raw-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
  },
};
