const express = require('express')
// const getUsersRouter = require('./users')
const getImagesRouter = require('./images')

module.exports = getRouter

function getRouter () {
  const router = express.Router()

  // router.use('/users', getUsersRouter())
  router.use('/image', getImagesRouter())
  // router.use('/images', getArticlesRouter())
  // router.use('/tags', getTagsRouter())

  router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(
          (errors, key) => {
            errors[key] = err.errors[key].message

            return errors
          },
          {}
        )
      })
    }

    return next(err)
  })
  return router
}
