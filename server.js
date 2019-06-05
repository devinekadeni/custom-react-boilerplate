/**
 * This file only being used if you want to run the applicaiton on expressJS server
 * Otherwise, please do below:
 ** -Delete this file
 ** -Remove `express` and `webpack-dev-middleware` and `webpack-hot-middleware` from `package.json`
 ** -Remove script `"start:server"` from `package.json`
 ** -Remove `publicPath` object of `output` on `webpack.config.js`
 */

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')({ mode: 'development' })

const app = express()
const webpackCompiler = webpack(webpackConfig)

// Tell express to use the webpack-dev-middleware and HMR and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)
app.use(webpackHotMiddleware(webpackCompiler))

app.listen(3000, function() {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000 => http://localhost:3000')
})
