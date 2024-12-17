import axios from 'axios'
import {accessToken, refreshToken} from './headers'

const   loginService = async (email, password) => {
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/account/login`, { email, password })
		return data;
	} catch (error) {
		return error
	}
	
}

const  registeraccount = async (firstName, lastName, email, dateOfBirth, password, confirmPassword) => {
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/account/register`, { 
			firstName, lastName, email, dateOfBirth, password, confirmPassword
		})	
		return data;
	} catch (error) {
		return error
	}
	
}

const  forgotpassword =  async (email) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/account/forgot-password`, { 
			email 
		}, {
			headers: accessToken()
		})
		return data
	} catch (error) {
		return error
	}
}

const  resetpassword = async (userId, token, newPassword, confirmNewPassword) => {
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/account/reset-password`, { userId, token, newPassword, confirmNewPassword 

		}, {
			headers: accessToken()
		}
	
		)
		return data
	} catch (error) {
		return error
	}
	
}


export {
	loginService,
	registeraccount,
	forgotpassword,
	resetpassword
}