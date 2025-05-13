const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // 添加对 CSS 文件的支持
        use: ['style-loader', 'css-loader'] // 使用 style-loader 和 css-loader
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.GRAPHQL_URI': JSON.stringify(
        process.env.GRAPHQL_URI || 'http://localhost:8787/graphql'
      )
    })
  ],
  devServer: {
    static: './dist',
    port: 3000
  },
  mode: 'development'
}
