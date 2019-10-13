const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackMode = env => require(`./config/webpack/webpack.${env}.js`)

module.exports = ({ mode }) => {
  const isDevelopment = mode === 'development'

  return webpackMerge(
    {
      mode: mode,
      entry: {
        app: './src/index.js',
      },
      output: {
        filename: isDevelopment ? '[name].bundle.js' : '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/', // uncomment this if running application on server
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  camelCase: true,
                  sourceMap: isDevelopment,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment,
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'assets/[name].[hash:8].[ext]',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './public/index.html',
          // favicon: './public/favicon.ico',
        }),
      ],
    },
    webpackMode(mode)
  )
}
