const Express = require('express')

// const oauth = require('oauth')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const TwitterStrategy = require('passport-twitter').Strategy

const passport = require('passport')
const { parse } = require('url')
const next = require('next')
const UserModel = require('./models/user')
const getRouter = require('./routes')
const app = new Express()

const dev = process.env.NODE_ENV !== 'production'
const appNext = next({ dev })
const handle = appNext.getRequestHandler()
const setupMongoose = require('./config/setup-mongoose')
// const ImageModel = require('./models/image')

// let token = ''

module.exports = start

async function start () {
  const cleanupMongoose = await setupMongoose()
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session({ secret: 'pinterest' }))
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: 'xLwdUeUNl8TMqRV78tWNLSJYr',
        consumerSecret: 'UwGLUxOQwe0iHLlOnbT45V8JxNGcMdbCsl8w2SF1KP4yao6Gow',
        callbackURL: 'http://sepiropht.freeboxos.fr:3000' + '/login-callback'
      },
      function (token, tokenSecret, profile, cb) {
        UserModel.getUserById(profile.id, function (err, user) {
          return cb(err, { user, token })
        })
      }
    )
  )
  app.use(bodyParser.urlencoded())
  appNext.prepare().then(() => {
    app.get('/', (req, res) => {
      appNext.render(req, res, '/', req.query)
    })
    app.get('/profil/:id', (req, res) => {
      appNext.render(req, res, '/profil', req.query)
    })
    app.get('*', (req, res) => {
      return handle(req, res)
    })
  })

  app.get('/login', passport.authenticate('twitter'))

  app.get(
    '/login-callback',
    passport.authenticate('twitter', { session: false }),
    function (req, res) {
      console.log('YEAH')
      console.log(req.user)
      console.log('YEAH')
      const parsedUrl = parse(req.url, true)
      const resbis = Object.assign(res, {
        user: req.user.user.pop(),
        token: req.user.token
      })
      appNext.render(req, resbis, '/', parsedUrl)
    }
  )
  // app.get('/login-callback', function (req, res) {
  //
  //     function (err, accessToken, accessSecret, results) {
  //       if (err) {
  //         res.send('error getting access token: ' + err)
  //       } else {
  //         token = req.session.oauth_token
  //         UserModel.getUserById(results.user_id, function (err, user) {
  //           if (err) console.log(err)
  //           if (user.length > 0) {
  //             const resbis = Object.assign(res, { resbis: user, token: token })
  //             const parseUrl = parse(req.url, true)
  //             appNext.render(req, resbis, '/', parseUrl)
  //           } else {
  //             const newUser = new UserModel(results)
  //             UserModel.create(newUser, (err, user) => {
  //               if (err) console.log(err)
  //               console.log('user was not in base', results)
  //
  //               const parsedUrl = parse(req.url, true)
  //               const resbis = Object.assign(res, {
  //                 userInfo: results,
  //                 token: token
  //               })
  //               appNext.render(req, resbis, '/', parsedUrl)
  //             })
  //           }
  //         })
  //       }
  //     }
  //
  // })
  app.use(getRouter())
  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3000, () => {
      console.info(`Listening on port ${server.address().port}`)
      server.on('close', () => {
        cleanupMongoose()
      })
      resolve(server)
    })
  })
}
