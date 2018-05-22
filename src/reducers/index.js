import * as types from "../actions/types"

const user = (state = {
	isWaiting: false,
	authenticated: false,
	username: ""
}, action) => {
	switch(action.type) {
		case MANUAL_LOGIN_USER:
			return Object.assign({}, state, { isWaiting: true })
		case types.LOGIN_SUCCESS:
			return Object.assign({}, state, { isWaiting: false, authenticated: true, username: action.data.username })
		case types.LOGIN_ERROR:
			return Object.assign({}, state, { isWaiting: false, authenticated: false })
		case types.SIGNUP:
			return Object.assign({}, state, { isWaiting: true })
		case types.SIGNUP_SUCCESS:
			return Object.assign({}, state, { isWaiting: false, authenticated: true })
		case types.SIGNUP_ERROR:
			return Object.assign({}, state, { isWaiting: false, authenticated: false })
		case types.LOGOUT:
			return Object.assign({}, state, { isWaiting: true })
		case types.LOGOUT_SUCCESS:
			return Object.assign({}, state, { isWaiting: false, authenticated: false, username: "" })
		case types.LOGOUT_ERROR:
			return Object.assign({}, state, { isWaiting: false, authenticated: true })
		default:
			return state
	}
}

export default user