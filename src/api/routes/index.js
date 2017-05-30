const express = require('express')
const getApiRouter = require('./api')

module.exports = getRouter

function getRouter () {
  const router = express.Router()
  router.use('/api', getApiRouter())
  return router
}
