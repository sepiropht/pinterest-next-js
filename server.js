const path = require("path");
const Express = require("express");
const qs = require("qs");
const oauth = require("oauth");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const ImageModel = require("./models/image");
const app = new Express();
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();
const setupMongoose = require("./config/setup-mongoose");
module.exports = start;

async function start() {
  const cleanupMongoose = await setupMongoose();
  app.use(session({ keys: ["foo"] }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded());

  appNext.prepare().then(() => {
    app.get("/", (req, res) => {
      appNext.render(req, res, "/", req.query);
    });
    app.get("/profil/:id", (req, res) => {
      appNext.render(req, res, "/profil", req.query);
    });

    app.get("*", (req, res) => {
      return handle(req, res);
    });
  });

  let oauthManager = new oauth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "xLwdUeUNl8TMqRV78tWNLSJYr",
    "UwGLUxOQwe0iHLlOnbT45V8JxNGcMdbCsl8w2SF1KP4yao6Gow",
    "1.0A",
    "http://sepiropht.freeboxos.fr:3000" + "/login-callback",
    "HMAC-SHA1"
  );
  app.get("/login", function(req, res) {
    oauthManager.getOAuthRequestToken(function(err, token, secret, results) {
      if (err) {
        res.send("error getting request token: " + err);
      } else {
        req.session.oauth_token = token;
        req.session.oauth_secret = secret;
        res.redirect(
          "https://twitter.com/oauth/authenticate?oauth_token=" + token
        );
      }
    });
  });

  app.get("/images", (req, res, next) => {
    ImageModel.getImages((err, Images) => {
      if (err) console.log(err);
      res.json(Images);
    });
  });
  app.get("/image/:userId", (req, res, next) => {
    ImageModel.getImagesByUserId(req.params.userId, (err, Images) => {
      if (err) console.log(err);

      res.json(Images);
    });
  });
  app.post("/image", (req, res) => {
    console.log(req.body, "move your body");
    const newImages = new ImageModel({
      title: req.body.title,
      userId: req.body.userId,
      url: req.body.url
    });
    ImageModel.create(newImages, function(err, category) {
      if (err) {
        console.log(err);
      }
      res.json(newImages);
    });
  });

  app.post("/updateLike", (req, res) => {
    console.log("PUTAION, JAI PAS QUE CA A FOUTRE !!!", req.body);
    ImageModel.updateLike(req.body.imageId, req.body.userId, (err, Images) => {
      if (err) console.log(err);
      console.log("before return", Images);
      res.json(Images);
    });
  });

  app.get("/login-callback", function(req, res) {
    req.session.oauth_verifier = req.query.oauth_verifier;

    oauthManager.getOAuthAccessToken(
      req.session.oauth_token,
      req.session.oauth_secret,
      req.session.oauth_verifier,
      function(err, accessToken, accessSecret, results) {
        if (err) {
          res.send("error getting access token: " + err);
        } else {
          req.session.username = results.screen_name;
          UserModel.getUserById(results.user_id, function(err, user) {
            if (err) console.log(err);
            // console.log("user", user);
            if (user.length > 0) {
              // store.dispatch({
              //   type: LOGGED_IN,
              //   payload: results
              // });
              //  console.log(req.query);
              const resbis = Object.assign(res, { resbis: user });
              const parseUrl = parse(req.url, true);
              appNext.render(req, resbis, "/", parseUrl);
            } else {
              const newUser = new UserModel(results);

              UserModel.create(newUser, (err, user) => {
                if (err) console.log(err);
                console.log("user was not in base", results);
                // store.dispatch({
                //   type: LOGGED_IN,
                //   payload: results
                // });
                //    console.log(req.query);
                const parsedUrl = parse(req.url, true);
                const resbis = Object.assign(res, { userInfo: results });
                appNext.render(req, resbis, "/", parsedUrl);
              });
            }
          });
        }
      }
    );
  });
  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3000, () => {
      console.info(`Listening on port ${server.address().port}`);
      server.on("close", () => {
        cleanupMongoose();
      });
      resolve(server);
    });
  });
}
