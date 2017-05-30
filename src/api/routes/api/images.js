const express = require('express')
const ImageModel = require('../../models/image')

module.exports = getImagesRouter
function getImagesRouter () {
  const router = express.Router()
  router.get('/', (req, res, next) => {
    ImageModel.getImages((err, Images) => {
      if (err) console.log(err)
      res.json(Images)
    })
  })

  router.get('/:userId', (req, res, next) => {
    ImageModel.getImagesByUserId(req.params.userId, (err, Images) => {
      if (err) console.log(err)

      res.json(Images)
    })
  })

  router.post('/', (req, res) => {
    const newImages = new ImageModel({
      title: req.body.title,
      userId: req.body.userId,
      url: req.body.url
    })
    ImageModel.create(newImages, function (err, category) {
      if (err) {
        console.log(err)
      }
      res.json(newImages)
    })
  })
  return router
}
