import axios from 'axios'
import {accessToken, accessTokenBearer} from './headers'

const  feedbacklistening = async (idListen, dataTest) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/listening/${idListen}/feedback/generate`, { 
			...dataTest

		}, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}
const  feedbackReading = async (idRead, dataTest) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/reading/${idRead}/feedback/generate`, { 
			...dataTest

		}, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}
const  feedbackWriting = async (id, dataTest) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/writing/${id}/feedback/generate`, { 
			...dataTest

		}, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}
const  feedbackSpeaking = async (id, formData) => {	
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/speaking/${id}/feedback/generate`, { 
			formData

		}, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': accessTokenBearer()
			}
		})	
		return data;
	} catch (error) {
		return error
	}
}




export {
	feedbacklistening,
	feedbackReading,
	feedbackSpeaking,
	feedbackWriting
}