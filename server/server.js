const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const historyApiFallback = require('connect-history-api-fallback');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const app = express()
const PORT = 8080

app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: 'default secrete',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

app.use(passport.initialize())
app.use(passport.session()) 

const compiler = webpack(webpackConfig);
app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')))


app.use('/api', require('./api'))

app.use(function(err, req, res, next) {
	console.error(err.stack)
	res.status(500)
})

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
