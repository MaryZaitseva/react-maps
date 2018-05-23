const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

router.get('/user', (req, res, next) => {
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post('/locations', (req, res, next) => {
	User.findOne({ _id: req.user._id }, (err, user) => {
		if (user) {
			user.update({savedLocations: user.savedLocations.concat(req.body.locationsArray).filter((elem, index, self) => {
				return index === self.indexOf(elem);
			})}, () => {
				user.save(function(err){
	            if(!err){
	                console.log('saving locations');
	            }
			})
			
        });
		}
		else{
			return res.json({
				error: `There is no user with username ${username}`
			})
		}
	})
})

router.get('/locations', (req, res, next) => {
	User.findOne({ _id: req.user._id }, (err, user) => {
		if (user) {
			return res.json({savedLocations: user.savedLocations})
		}
		else{
			return res.json({
				error: `There is no user with username ${username}`
			})
		}
	})
})


router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user))
		res.json({ user: user })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid')
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'username': username,
			'password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

module.exports = router
