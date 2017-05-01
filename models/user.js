const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    index: true,
    require: true
  },

  screen_name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUsers = function(callback) {
  User.find(callback);
};

module.exports.getUserById = function(id, callback) {
  User.find(id, callback);
};

module.exports.getArticlesByUser = function(User, callback) {
  var query = { User: User };
  Aricle.find(query, callback);
};

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
};

module.exports.create = function(newUser, callback) {
  newUser.save(callback);
};
module.exports.updateUser = function(id, data, callback) {
  var title = data.title, description = data.description, date = Date.now;

  User.findById(id, function(err, User) {
    if (!User) {
      return next(new Error("Could not load User"));
    } else {
      User.title = title;
      User.description = description;
      User.date = date;

      User.save(callback);
    }
  });
};

module.exports.removeUser = function(id, callback) {
  User.find({ _id: id }).remove(callback);
};

//module.exports.add = function (User)
