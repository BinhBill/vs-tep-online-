import axios from 'axios'
import {accessToken} from './headers'


const  createExam = async (title) => {	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/exam/create`, { 
			title 
		}, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}

const  getRamdomExam = async () => {
		
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam`, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}

const  getExamById = async (id) => {
		
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam/${id}`, {
			headers: accessToken()
		})	
		return data;
	} catch (error) {
		return error
	}
}
const  getExamReadingById = async (id) => {
	
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam/${id}/reading`, {
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}
const  addReadingTopic = async (jsonData) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/reading/add`, {
			category : jsonData.category, 
			title: jsonData.title, 
			content: jsonData.content, 
			examId:jsonData.examId , 
			scoreBand: 0
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}
const  addReadingQuestion = async ( jsonData) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/reading/question/add`, {
			content: jsonData.content, answerOptions: jsonData.answerOptions, topicId: jsonData.topicId
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}

const  getExamWritingById = async (id) => {
	
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam/${id}/writing`, {
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}
const  addWritingTopic = async (jsonData) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/writing/add`, {
			category: jsonData.category, 
			resourcesUrl: jsonData.resourcesUrl, 
			content: jsonData.content, 
			examId: jsonData.examId, 
			scoreBand: 0
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}

const  getExamSpeakingById = async (id) => {
	
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam/${id}/speaking`, {
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}

const  addSpeakingTopic = async (jsonData) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/speaking/add`, {
			category: jsonData.category, 
			resourcesUrl : jsonData.resourcesUrl, 
			content : jsonData.content, 
			examId : jsonData.examId,
			scoreBand : 0
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}

const  getExamListeningById = async (id) => {
	
	try {
		const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exam/${id}/listening`, {
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}
const  addListeningTopic = async (dataListenTopic, scoreBand= 0) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/listening/add`, {
			category: dataListenTopic.category, 
			title: dataListenTopic.title,
			content: dataListenTopic.content,
			examId: dataListenTopic.examId, 
			scoreBand
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}
const  addListeningQuestion = async ( jsonData) => {
	
	try {
		const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/listening/question/add`, {
			content: jsonData.content, answerOptions: jsonData.answerOptions, topicId: jsonData.topicId
		},{
			headers: accessToken()
		})
		return data;
	} catch (error) {
		return error
	}
}

export {
	getRamdomExam,
	createExam,
	getExamById,
	getExamReadingById,
	getExamListeningById,
	getExamWritingById,
	getExamSpeakingById,
	addListeningQuestion,
	addListeningTopic,
	addReadingQuestion,
	addReadingTopic,
	addSpeakingTopic,
	addWritingTopic
}