const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  title: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    index: true,
    required: true
  },
  likes: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Image = (module.exports = mongoose.model("Image", imageSchema));

module.exports.updateLike = function(id, userId, callback) {
  console.log('id', id, 'userId', userId)
  Image.findById(id, function(err, Image) {
    if (!Image) {
      return console.log(new Error("Could not load Image", Image));
    } else {
      console.log('update image', Image)
      if (Image.likes.indexOf(userId) === -1) {
        Image.likes.push(userId);
      } else {
        Image.likes = Image.likes.filter(id => id !== userId);
      }
      console.log(Image, 'updated IMage')
      Image.save(callback);
    }
  });
};
module.exports.getImages = function(callback) {
  Image.find(callback);
};

module.exports.getImagesByUserId = function(userId, callback) {
  var query = { userId: userId };
  Image.find(query, callback);
};

module.exports.create = function(newImages, callback) {
  console.log("merdier", newImages);
  newImages.save(callback);
};
