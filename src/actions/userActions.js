import axios from "axios"
import * as types from "./types"

function beginLogin() {
	return { type: types.LOGIN_USER }
}

function loginSuccess(data) {
	return { 
		type: types.LOGIN_SUCCESS,
		data
	}
}

function loginError() {
	return { type: types.LOGIN_ERROR }
}

function beginLogout() {
	return { type: types.LOGOUT }
}

function logoutSuccess() {
	return { type: types.LOGOUT_SUCCESS }
}

function logoutError() {
	return { type: types.LOGOUT_ERROR }
}

function beginSignup() {
	return { type: types.SIGNUP }
}

function signupSuccess() {
	return { type: types.SIGNUP_SUCCESS }
}

function signupError() {
	return { type: types.SIGNUP_ERROR }
}

function makeUserRequest(method, data, api) {
	return axios({
		method: method,
		url: api,
		data: data
	})
}

export function login(
		data,
		successPath  
	) {	
	return dispatch => {
		dispatch(beginLogin())

		return makeUserRequest("post", data, "/login")	
			.then(response => {
				if (response.status == 200) {					
					dispatch(loginSuccess(response.data.success))
				} else {					
					dispatch(loginError())
					let loginMessage = response.data.message
					return loginMessage					
				}
			})				
	}
}

export function logout() {
	return dispatch => {
		dispatch(beginLogout())

		return axios.get("/logout")
			.then(response => {
				if (response.status == 200) {
					dispatch(logoutSuccess())
				} else {
					dispatch(logoutError())
				}
			})
	}			
}

export function signup(data) {	
	
	return dispatch => {
		dispatch(beginSignup())

		return makeUserRequest("post", data, "/signup")	
			.then(response => {
				if (response.data.success) {					
					dispatch(signupSuccess())
				} else {					
					dispatch(signupError())
					let signupMessage = response.data.message
					return signuprMessage
				}
			})
	}

}