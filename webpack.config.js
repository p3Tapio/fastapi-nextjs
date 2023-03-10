const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  ...(isDev ? { devtool: 'eval-source-map' } : {}),
  entry: {
    index: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules', path.join(__dirname, 'src')],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    assetModuleFilename: '[assets/hash][ext][query]',
    path: path.join(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[hash][ext][query]',
        },
      },
    ],
  },
  devServer: {
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['**/*.js.LICENSE.txt'],
      protectWebpackAssets: false,
    }),
    new ForkTsCheckerWebpackPlugin(), // For typeChecking - recommended to use, if ts-loader transpileOnly is set true
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
    new webpack.EnvironmentPlugin({
      API_URL: 'http://localhost:3000',
    }),
  ],
}
