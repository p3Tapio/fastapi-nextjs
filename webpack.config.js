const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.tsx',
  ...(isDev ? {devtool: 'eval-source-map'} : {}),

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].build.js',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(), // For typeChecking - recommended to use, if ts-loader transpileOnly is set true
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
