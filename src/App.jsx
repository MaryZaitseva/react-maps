import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<div className="links">
				<ul>
					<li>
						<Link to="/">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</div>
		)
	} else {
		return (
			<div className="links">
				<ul>
					<li>
						<Link to="/">
							Home
						</Link>
					</li>
					<li>
						<Link to="/login">
							Log In
						</Link>
					</li>
					<li>
						<Link to="/signup">
							Sign Up
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/api/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/api/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/api/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<Header user={this.state.user} />
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route	exact path="/login" render={() => <LoginForm _login={this._login} />}/>
				<Route exact path="/signup" component={SignupForm} />
				</div>
		)
	}
}

export default App
