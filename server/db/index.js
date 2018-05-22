
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MONGO_URL = 'mongodb://localhost:27017/react-maps'


mongoose.connect(MONGO_URL)

const db = mongoose.connection;

db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_URL}`
	)
})

module.exports = db
