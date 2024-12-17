import axios from 'axios'
import {accessToken, refreshToken} from './headers'


const  addreading = async (category, title, content, scoreBand = 0, examId = '') => {
		
	 try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/reading/add`, { 
			category, title, content, scoreBand, examId
		 } , {
			headers: accessToken()
		 })	
		return data;
	} catch (error) {
		return error
	}
}

const  addquestion = async (content, answerOptions, topicId) => {
	
	 try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/reading/question/add`, { 
			content, answerOptions, topicId
		 }, {
			headers: accessToken()
		 })	
		return data;
	} catch (error) {
		return error
	}
}






export {
	addreading,
	addquestion
}