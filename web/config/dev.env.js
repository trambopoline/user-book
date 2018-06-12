'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CHOKIDAR_USEPOLLING: JSON.stringify(process.env.CHOKIDAR_USEPOLLING)
})
