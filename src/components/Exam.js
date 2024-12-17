import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Col } from 'react-bootstrap'
import {
    createExam,
    addListeningQuestion,
    addListeningTopic,
    addReadingQuestion,
    addReadingTopic,
    addSpeakingTopic,
    addWritingTopic
} from "../services/exam"

const CREATE_SUCCESS = "Tạo thành công";
const BUTTON_CREATE = "Tạo"
const BUTTON_SWAP = "Chuyển"
const BUTTON_CANCEL = "Hủy"
const NO_FILE = "Không có file"
const BUTTON_ERROR = 'Lỗi không tạo được'

export default function Exam() {
    let navigate = useNavigate();

    const [title, setTitle] = useState("");


    const [successListenQuestion, setSucessListenQuestion] = useState(false)

    const [successListenTopic, setSuccessListenTopic] = useState(false)

    const [successWrite, setSucessWrite] = useState(false);

    const [writingTopic, setWritingTopic] = useState({

    });
    const [speakingTopic, setSpeakingTopic] = useState({

    });

    const [listenTopic, setListenTopic] = useState({

    });

    const [listenQuestion, setListenQuestion] = useState({

    });
    const [ReadTopic, setReadTopic] = useState({

    });
    const [readQuestion, setReadQuestion] = useState({

    });

    const [successReadTopic, setSuccessReadTopic] = useState(false)

    const [successReadQuestion, setSucessReadQuestion] = useState(false)

    const [successSpeak, setSucessSpeak] = useState(false)

    const [titleExam, setTitleExam] = useState("");

    const [idExam, setIdExam] = useState("");

    const [idListenTopic, setIdListenTopic] = useState("")

    const [idReadTopic, setIdReadTopic] = useState("")

    const [fileContent, setFileContent] = useState('');

    const create = async (e) => {
        e.preventDefault();

        if (title === '') {
            window.ShowAlert('warning', 'Bạn chưa điền đủ thông tin');
            return
        }
        const data = await createExam(title)
        if (data.data && data.status === 201) {
            window.ShowAlert('success', CREATE_SUCCESS);
            setIdExam(data.data.id);
            setTitleExam(data.data.title)
            setSuccessListenTopic(true)
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }

    }

    const createWrite = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', NO_FILE);
            return
        }
        let jsonData = JSON.parse(writingTopic)
        jsonData.examId = idExam;
        const data = await addWritingTopic(jsonData)
        if (data?.status === 204 || data?.status === 201) {
            window.ShowAlert('success', CREATE_SUCCESS);
            setFileContent('')
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }
    }
    const createSpeak = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', NO_FILE);
            return
        }
        let jsonData = JSON.parse(speakingTopic)
        jsonData.examId = idExam;
        const data = await addSpeakingTopic(jsonData)
        if (data?.status === 204 || data?.status === 201) {
            window.ShowAlert('success', CREATE_SUCCESS);
            setFileContent('')
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }
    }

    //createListenTopic
    const createListenTopic = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', NO_FILE);
            return
        }
        let jsonData = JSON.parse(listenTopic)
        jsonData.examId = idExam;
        const dataListenTopic = await addListeningTopic(
            jsonData
        )

        if (dataListenTopic?.status === 201 || dataListenTopic?.status === 204) {
            window.ShowAlert('success', CREATE_SUCCESS);
            console.log(dataListenTopic?.data)
            setSuccessListenTopic(false)
            setFileContent('')
            setSucessListenQuestion(true)
            setIdListenTopic(dataListenTopic?.data)
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }

    }
    const createListenQuestion = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', NO_FILE);
            return
        }
        let jsonDataQuestion = JSON.parse(listenQuestion)
        jsonDataQuestion.topicId = idListenTopic;
        console.log(jsonDataQuestion)
        const dataListenQuestion = await addListeningQuestion(
            jsonDataQuestion
        )


        if (dataListenQuestion?.status === 201 || dataListenQuestion?.status === 204) {
            window.ShowAlert('success', CREATE_SUCCESS);

            setFileContent('')

        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }

    }

    const createReadTopic = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', BUTTON_ERROR);
            return
        }
        let jsonData = JSON.parse(ReadTopic)
        jsonData.examId = idExam;
        const dataReadTopic = await addReadingTopic(
            jsonData
        )

        if (dataReadTopic?.status === 201 || dataReadTopic?.status === 204) {
            window.ShowAlert('success', CREATE_SUCCESS);

            setSuccessReadTopic(false)
            setFileContent('')
            setSucessReadQuestion(true)
            setIdReadTopic(dataReadTopic?.data)
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }

    }
    const createReadQuestion = async (e) => {
        e.preventDefault();

        if (fileContent === '') {
            window.ShowAlert('warning', BUTTON_ERROR);
            return
        }
        let jsonDataQuestion = JSON.parse(readQuestion)
        jsonDataQuestion.topicId = idReadTopic;
        console.log(jsonDataQuestion)
        const dataListenQuestion = await addReadingQuestion(
            jsonDataQuestion
        )
        console.log(dataListenQuestion)
        if (dataListenQuestion?.status === 201 || dataListenQuestion?.status === 204) {
            window.ShowAlert('success', CREATE_SUCCESS);
            setFileContent('')
        } else {
            window.ShowAlert('danger', BUTTON_ERROR);
        }

    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }



    const handleFileReadTopic = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            setReadTopic(e.target.result)
        };

        reader.readAsText(file);
    };
    const handleFileReadQuestion = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            setReadQuestion(e.target.result)
        };

        reader.readAsText(file);
    };
    const handleFileAudioListen = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            const Content = e.target.result;
            setListenTopic(Content)

        };

        reader.readAsText(file);
    };
    const handleFileListenQuestion = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            const content = e.target.result
            setListenQuestion(content)
        };

        reader.readAsText(file);
    };
    const handleSwapRead = () => {
        setFileContent('');
        setSucessListenQuestion(false)
        setSuccessReadTopic(true);
    }
    const handleSwapListenTopic = () => {
        setFileContent('');
        setSuccessListenTopic(true)
        setSucessListenQuestion(false);
    }
    const handleSwapReadTopic = () => {
        setFileContent('');
        setSuccessReadTopic(true)
        setSucessReadQuestion(false);
    }
    
    const handleSwapWrite = () => {
        setFileContent('');
        setSucessReadQuestion(false)
        setSucessWrite(true);
    }
    const handleSwapSpeak = () => {
        setFileContent('');
        setSucessWrite(false);
        setSucessSpeak(true)
    }
    const handleFileWrite = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            setWritingTopic(e.target.result)
        };

        reader.readAsText(file);
    };
    const handleFileSpeak = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result);
            setSpeakingTopic(e.target.result)
        };

        reader.readAsText(file);
    };

    return (
        <>
            <div className="container-fluid p-0" style={{ zIndex: 1 }}>
                <h1 className="h3 mb-3"></h1>

                <div className="row">
                    <div className="col-12">
                        <div className="card">

                            <div className="card-body">
                                {idExam === "" ?
                                    <>
                                        <Form.Group className="mb-3" controlId="formTitle">
                                            <Form.Label>Title </Form.Label>
                                            <Form.Control type="title" placeholder="Enter Title" value={title}
                                                onChange={(event) => { handleChangeTitle(event) }} />
                                        </Form.Group>
                                        <div style={{ justifyContent: "space-around", display: "flex" }}>



                                        </div>
                                        <div className="row">
                                            <div className="col-2">
                                                <button className="btn btn-primary" onClick={create}>{BUTTON_CREATE}</button>
                                            </div>
                                            <div className="col-2">
                                                <button className="btn btn-primary" onClick={() => { navigate('/home') }}>{BUTTON_CANCEL}</button>
                                            </div>

                                        </div>
                                    </>
                                    :
                                    <>

                                    </>
                                }
                                {
                                    successListenTopic === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File  Audio Listening</Form.Label>
                                                <Form.Control type="file" onChange={handleFileAudioListen} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label> Content:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>
                                            <div style={{ justifyContent: "space-around", display: "flex" }}>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createListenTopic}>{BUTTON_CREATE}</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    successListenQuestion === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File  Listen Question</Form.Label>
                                                <Form.Control type="file" onChange={handleFileListenQuestion} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Listen Question:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>
                                            <div style={{ justifyContent: "space-around", display: "flex" }}>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createListenQuestion}>{BUTTON_CREATE}</button>
                                                </div>
                                                
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={handleSwapListenTopic}>Chuyển Listen Topic</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={handleSwapRead}>Chuyển Read Topic</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    successReadTopic === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File Reading</Form.Label>
                                                <Form.Control type="file" onChange={handleFileReadTopic} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Reading Content:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>

                                            <div style={{ justifyContent: "space-around", display: "flex" }}>



                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createReadTopic}>{BUTTON_CREATE}</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    successReadQuestion === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File  Reading Question</Form.Label>
                                                <Form.Control type="file" onChange={handleFileReadQuestion} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Reading Question:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>
                                            <div style={{ justifyContent: "space-around", display: "flex" }}>



                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createReadQuestion}>{BUTTON_CREATE}</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={handleSwapReadTopic}>Chuyển Read Topic</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={handleSwapWrite}>Chuyển Write</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }

                                {
                                    successWrite === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File  Writing</Form.Label>
                                                <Form.Control type="file" onChange={handleFileWrite} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Writing Content:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>
                                            <div style={{ justifyContent: "space-around", display: "flex" }}>

                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createWrite}>{BUTTON_CREATE}</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={handleSwapSpeak}>Chuyển Speak</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }
                                {
                                    successSpeak === true ?
                                        <>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>File  Speaking</Form.Label>
                                                <Form.Control type="file" onChange={handleFileSpeak} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Speaking Content:</Form.Label>
                                                <Form.Control as="textarea" rows="10" value={fileContent} readOnly />
                                            </Form.Group>
                                            <div style={{ justifyContent: "space-around", display: "flex" }}>


                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={createSpeak}>{BUTTON_CREATE}</button>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => { navigate('/home') }}>Hủy bỏ</button>
                                                </div>

                                            </div>

                                        </>
                                        :
                                        <>
                                        </>
                                }


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}