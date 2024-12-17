import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "../AudioRecorder";

import RadioButton from "../utils/radiobutton";
import {
  User as IconUser,
  Lock,
  HelpCircle,
  LogOut as IconLogOut
} from 'react-feather';
import Form from 'react-bootstrap/Form';
import {
  getRamdomExam,
  getExamById,
  getExamListeningById,
  getExamReadingById,
  getExamSpeakingById,
  getExamWritingById
}
  from "../../services/exam"
import YouTubeEmbed from "./YouTubeEmbed";
import {
  feedbacklistening,
  feedbackReading,
  feedbackSpeaking,
  feedbackWriting
} from "../../services/feedback"

import { email } from "../../services/headers";

// 60 phút = 3600 giây
const TIME_EXAM = 3600

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function ExamMain() {
  const navigate = useNavigate();
  const [accountMenuToggle, setAccMenu] = useState(false);

  const [time, setTime] = useState(TIME_EXAM); // 60 phút = 3600 giây
  const intervalRef = useRef(null);
  const [isTime, setIsTime] = useState(true)

  const [titleExam, setTitleExam] = useState("")
  const [dataListenTopic1, setDataListenTopic1] = useState({});
  const [dataListenTopic2, setDataListenTopic2] = useState({});
  const [dataListenTopic3, setDataListenTopic3] = useState({});
  const [idListenTopicPart1, setIdListenTopicPart1] = useState("")
  const [idListenTopicPart2, setIdListenTopicPart2] = useState("")
  const [idListenTopicPart3, setIdListenTopicPart3] = useState("")

  const [readTopicPart1, setReadTopicPart1] = useState({})
  const [idReadTopicPart1, setIdReadTopicPart1] = useState("")
  const [idReadTopicPart2, setIdReadTopicPart2] = useState("")
  const [idReadTopicPart3, setIdReadTopicPart3] = useState("")
  const [dataReadTopic1, setDataReadTopic1] = useState({});
  const [dataReadTopic2, setDataReadTopic2] = useState({});
  const [dataReadTopic3, setDataReadTopic3] = useState({});

  const [contentReadPart1, setContentReadPart1] = useState("")

  const [idWriteTopicPart1, setIdWriteTopicPart1] = useState("")
  const [idWriteTopicPart2, setIdWriteTopicPart2] = useState("")

  const [audioUrl, setAudioUrl] = useState('');

  const [idSpeakTopicPart1, setIdSpeakTopicPart1] = useState("")

  const [speakTopicPart1, setSpeakTopicPart1] = useState({
    id: "",
    content: ""
  })

  const [isListenPart1, setIsListenPart1] = useState(false)
  const [isListenPart2, setIsListenPart2] = useState(false)
  const [isListenPart3, setIsListenPart3] = useState(false)
  const [isReadPart1, setIsReadPart1] = useState(false)
  const [isReadPart2, setIsReadPart2] = useState(false)
  const [isReadPart3, setIsReadPart3] = useState(false)
  const [isWritePart1, setIsWritePart1] = useState(false)
  const [isWritePart2, setIsWritePart2] = useState(false)
  const [isSpeakPart1, setIsSpeakPart1] = useState(false)

  const [listenQuestion1, setListenQuestion1] = useState([])
  const [listenQuestion2, setListenQuestion2] = useState([])
  const [listenQuestion3, setListenQuestion3] = useState([])
  const [readQuestion1, setReadQuestion1] = useState([])
  const [readQuestion2, setReadQuestion2] = useState([])
  const [readQuestion3, setReadQuestion3] = useState([])

  const [writeQuestion1, setWriteQuestion1] = useState("")
  const [writeQuestion2, setWriteQuestion2] = useState("")
  //Data Feedback

  const [selectedAnswersListen1, setSelectedAnswersListen1] = useState({});
  const [selectedAnswersListen2, setSelectedAnswersListen2] = useState({});
  const [selectedAnswersListen3, setSelectedAnswersListen3] = useState({});

  const [selectedAnswersRead1, setSelectedAnswersRead1] = useState({});
  const [selectedAnswersRead2, setSelectedAnswersRead2] = useState({});
  const [selectedAnswersRead3, setSelectedAnswersRead3] = useState({});

  const [dataSpeak, setDataSpeak] = useState({})

  const [videoIdPart1, setVideoIdPart1] = useState("https://www.youtube.com/embed/3j7oZiiAOd4?si=oyUmMY8zmMetD79t")
  const [videoIdPart2, setVideoIdPart2] = useState("https://www.youtube.com/embed/3j7oZiiAOd4?si=oyUmMY8zmMetD79t")
  const [videoIdPart3, setVideoIdPart3] = useState("https://www.youtube.com/embed/3j7oZiiAOd4?si=oyUmMY8zmMetD79t")

  const [writePart1, setWritePart1] = useState({
    topicId: "",
    essay: ""
  })
  const [writePart2, setWritePart2] = useState({
    topicId: "",
    essay: ""
  })

  const handleAudioData = (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    uploadAudio(audioBlob);
  };
  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();

    formData.append('file', audioBlob, 'recording.webm');
    formData.append('ContentType', 'audio/webm');
    formData.append('ContentDisposition', 'form-data');
    formData.append('Length', audioBlob.size);
    formData.append('Name', 'recording');
    formData.append('FileName', 'recording.webm');

    try {
      const response = await feedbackSpeaking(idSpeakTopicPart1, formData)
      console.log(response)
      console.log(response.data)
      if (response.status === 200) {
        setDataSpeak(response.data)
      }

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleClick = () => {
    // Reset thời gian về 60 phút
    setTime(TIME_EXAM);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswersFromChildListen1 = (answers) => {

    setSelectedAnswersListen1(answers);
  };
  const handleAnswersFromChildListen2 = (answers) => {

    setSelectedAnswersListen2(answers);
  };
  const handleAnswersFromChildListen3 = (answers) => {

    setSelectedAnswersListen3(answers);
  };

  const handleAnswersFromChildRead1 = (answers) => {
    setSelectedAnswersRead1(answers);
  };
  const handleAnswersFromChildRead2 = (answers) => {
    setSelectedAnswersRead2(answers);
  };
  const handleAnswersFromChildRead3 = (answers) => {
    setSelectedAnswersRead3(answers);
  };

  const handleClickSucess = async () => {
    const userConfirmed = window.confirm("Bạn chắc chắn muốn nộp bài?");

    if (userConfirmed) {
      setIsTime(true);
      const templistenTopic1 = updateSelection(dataListenTopic1, selectedAnswersListen1)
      const templistenTopic2 = updateSelection(dataListenTopic2, selectedAnswersListen2)
      const templistenTopic3 = updateSelection(dataListenTopic3, selectedAnswersListen3)

      const tempReadTopic1 = updateSelection(dataReadTopic1, selectedAnswersRead1)
      const tempReadTopic2 = updateSelection(dataReadTopic2, selectedAnswersRead2)
      const tempReadTopic3 = updateSelection(dataReadTopic3, selectedAnswersRead3)

      const feedbackListenTopic1 = await feedbacklistening(idListenTopicPart1, templistenTopic1)
      const feedbackListenTopic2 = await feedbacklistening(idListenTopicPart2, templistenTopic2)
      const feedbackListenTopic3 = await feedbacklistening(idListenTopicPart3, templistenTopic3)

      const feedbackReadTopic1 = await feedbackReading(idReadTopicPart1, tempReadTopic1)
      const feedbackReadTopic2 = await feedbackReading(idReadTopicPart2, tempReadTopic2)
      const feedbackReadTopic3 = await feedbackReading(idReadTopicPart3, tempReadTopic3)

      const feedbackWriteTopic1 = await feedbackWriting(idWriteTopicPart1, writePart1)

      const feedbackWriteTopic2 = await feedbackWriting(idWriteTopicPart2, writePart2)


      if (await feedbackListenTopic1.status === 200

        && await feedbackReadTopic1.status === 200

      ) {
        const newDataRead = [...feedbackReadTopic1.data, ...feedbackReadTopic2.data, ...feedbackReadTopic3.data]
        const newDataListen = [...feedbackListenTopic1.data, ...feedbackListenTopic2.data, ...feedbackListenTopic3.data]
        const newDataWrite = [{ content: writeQuestion1, data: feedbackWriteTopic1.data }, { content: writeQuestion2, data: feedbackWriteTopic2.data }]

        alert("Nộp bài thành công")
        const dataFeedBack = {
          dataRead: newDataRead,
          dataListen: newDataListen,
          dataWrite: newDataWrite,
          dataSpeak: dataSpeak
        }
        navigate('/feedback', {
          state: dataFeedBack
        });

      }


    } else {
    }
  }


  const handleChangWritePart1 = (e) => {
    setWritePart1(prevState => {
      return {
        ...prevState,
        essay: e.target.value
      }
    })
  }
  const handleChangWritePart2 = (e) => {
    setWritePart2(prevState => {
      return {
        ...prevState,
        essay: e.target.value
      }
    })
  }
  const convertToArray = (data) => {
    const result = Object.keys(data).map(key => ({ id: data[key].id }));
    return result;
  };

  const updateSelection = (data, selectedAnswers) => {
    const selectedIds = convertToArray(selectedAnswers);
    const updatedData = {
      ...data,
      questions: data.questions.map(question => ({
        ...question,
        answerOptions: question.answerOptions.map(option => ({
          ...option,
          isSelected: selectedIds.some(selected => selected.id === option.id)
        }))
      }))
    };
    return updatedData;
    //setDataListen1(updatedData);
  };

  const ClickNext = async () => {

    if (isListenPart1) {

      setIsListenPart1(false);
      setIsListenPart2(true);
      return;
    } else if (isListenPart2) {

      setIsListenPart2(false);
      setIsListenPart3(true);
      return;
    }

    else if (isListenPart3) {
      setIsListenPart3(false);
      setIsReadPart1(true);
      handleClick();
      return;
    }

    else if (isReadPart1) {
      setIsReadPart1(false);
      setIsReadPart2(true);
      return;
    }
    else if (isReadPart2) {
      setIsReadPart2(false);
      setIsReadPart3(true);

      return;
    }

    else if (isReadPart3) {
      setIsReadPart3(false);
      setIsWritePart1(true);
      handleClick();
      return;
    }

    else if (isWritePart1) {
      setIsWritePart1(false);
      setIsWritePart2(true);
      return;
    }
    else if (isWritePart2) {
      setIsWritePart2(false);
      setIsSpeakPart1(true);
      handleClick();
      return;
    }


  }

  function LogOut() {
    localStorage.clear();
    navigate('/');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRamdomExam()
        if (response && response?.data && response?.status === 200 && response?.data.length > 0) {
          const exams = response?.data
          const lengthExam = exams.length - 1
          const idExam = getRandomInt(0, lengthExam);
          const dataExam = await getExamById(exams[idExam].id)
          const dataListen = await getExamListeningById(exams[idExam].id)
          const dataRead = await getExamReadingById(exams[idExam].id)
          const dataSpeak = await getExamSpeakingById(exams[idExam].id)
          const dataWrite = await getExamWritingById(exams[idExam].id)
          if (dataExam?.status === 200 &&
            dataListen?.status === 200 &&
            dataRead?.status === 200 &&
            dataSpeak?.status === 200 &&
            dataWrite?.status === 200
          ) {

            setTitleExam(dataExam?.data?.title);

            // data Listen Part1
            setDataListenTopic1(dataListen?.data?.listeningTopics[0]);
            setVideoIdPart1(dataListen?.data?.listeningTopics[0].content)
            setIdListenTopicPart1(dataListen?.data?.listeningTopics[0].id)

            setListenQuestion1(dataListen?.data?.listeningTopics[0].questions)

            // data Listen Part2
            setDataListenTopic2(dataListen?.data?.listeningTopics[1]);
            setVideoIdPart2(dataListen?.data?.listeningTopics[1].content)

            setIdListenTopicPart2(dataListen?.data?.listeningTopics[1].id)
            setListenQuestion2(dataListen?.data?.listeningTopics[1].questions)

            // data Listen Part3
            setDataListenTopic3(dataListen?.data?.listeningTopics[2]);
            setVideoIdPart3(dataListen?.data?.listeningTopics[2].content)

            setIdListenTopicPart3(dataListen?.data?.listeningTopics[2].id)
            setListenQuestion3(dataListen?.data?.listeningTopics[2].questions)

            setIsListenPart1(true)
            // data Read Part1
            setIdReadTopicPart1(dataRead?.data?.readingTopics[0].id)
            setReadTopicPart1(dataRead?.data?.readingTopics[0])
            setContentReadPart1(dataRead?.data?.readingTopics[0].content)
            setReadQuestion1(dataRead?.data?.readingTopics[0].questions)
            setDataReadTopic1(dataRead?.data?.readingTopics[0]);

            // data Read Part2
            setIdReadTopicPart2(dataRead?.data?.readingTopics[1].id)
            setReadQuestion2(dataRead?.data?.readingTopics[1].questions)
            setDataReadTopic2(dataRead?.data?.readingTopics[1]);

            // data Read Part3
            setIdReadTopicPart3(dataRead?.data?.readingTopics[2].id)
            setReadQuestion3(dataRead?.data?.readingTopics[2].questions)
            setDataReadTopic3(dataRead?.data?.readingTopics[2]);

            // data Write Part1
            setIdWriteTopicPart1(dataWrite?.data?.writingTopics[0].id)
            setWriteQuestion1(dataWrite?.data?.writingTopics[0].content)
            setWritePart1(prevState => {
              return { ...prevState, topicId: dataWrite?.data?.writingTopics[0].id }
            })

            // data Write Part1
            setIdWriteTopicPart2(dataWrite?.data?.writingTopics[1].id)
            setWriteQuestion2(dataWrite?.data?.writingTopics[1].content)
            setWritePart2(prevState => {
              return { ...prevState, topicId: dataWrite?.data?.writingTopics[1].id }
            })

            // data Speak Part1
            setIdSpeakTopicPart1(dataSpeak?.data?.speakingTopics[0].id)
            setSpeakTopicPart1({
              id: dataSpeak?.data?.speakingTopics[0].id,
              content: dataSpeak?.data?.speakingTopics[0].content
            })
          }
        }

        // Cập nhật thời gian mỗi 1 giây
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

        }, 1000);

        return () => clearInterval(intervalRef.current);

      } catch (error) {

      } finally {

      }
    };
    fetchData();


  }, [])

  return (
    <>
      <div className="wrapper">
        <nav className="navbar navbar-expand navbar-light navbar-bg"
          style={{ position: "fixed", zIndex: 999, width: "100%" }}>
          <div className="col-2">
            {
              email() !== "" ?
                <>
                  <button className="btn btn-danger center" >
                    {email()}
                  </button>
                </>
                :
                <>
                </>
            }

          </div>
          <div className="col-2">
            <button className="btn btn-primary center" onClick={handleClickSucess}>
              Nộp bài
            </button>
          </div>
          <div className="col-2">
            {
              titleExam !== "" ?

                <h4 className="btn btn-info">
                  Exam: {titleExam}
                </h4>
                :
                <>
                </>
            }
          </div>


          <div className="col-2">
            {
              isTime === true ?
                <>
                  <h4 className="btn btn-warning">
                    Time: {formatTime(time)}
                  </h4>
                </>
                :
                <>
                  <h4 className="btn btn-warning">
                    Time: 00:00
                  </h4>
                </>
            }

          </div>

          <div className="navbar-collapse collapse">

            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown" onClick={() => {
                setAccMenu(!accountMenuToggle)
              }}>
                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                  href="#"
                  data-bs-toggle="dropdown">
                  <IconUser></IconUser>
                </a>
                <a className="nav-link dropdown-toggle d-none d-sm-inline-block"
                  data-bs-toggle="dropdown">
                  <IconUser></IconUser>
                  <span className="text-dark">{sessionStorage.getItem('name')}</span>
                </a>
                <div
                  className={'dropdown-menu dropdown-menu-end ' + (accountMenuToggle ? 'show' : '')}
                  style={{ left: "auto", right: 0 }}>
                  <a className="dropdown-item" onClick={() => {
                    navigate('/accInfo')
                  }}>
                    <IconUser height="18" width="18" strokeWidth="2"
                      style={{ marginRight: 5 }}></IconUser>
                    Thông tin tài khoản</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item"
                    onClick={() => {
                      navigate('/changePassword')
                    }}>
                    <Lock height="18" width="18" strokeWidth="2"
                      style={{ marginRight: 5 }}></Lock>
                    Đổi mật khẩu</a>
                  <a className="dropdown-item">
                    <HelpCircle height="18" width="18" strokeWidth="2"
                      style={{ marginRight: 5 }}></HelpCircle>
                    Trợ giúp</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" onClick={LogOut} >
                    <IconLogOut height="18" width="18" strokeWidth="2"
                      style={{ marginRight: 5 }}></IconLogOut>
                    Đăng xuất</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="main">
          <main className="content" style={{ marginTop: 50, overflowY: "scroll" }}>
            {
              isListenPart1 === true ?
                <>
                  <h3>
                    {readTopicPart1.content}
                  </h3>
                  <YouTubeEmbed videoId={videoIdPart1} /> {/* Thay thế videoId bằng ID của video YouTube bạn muốn nhúng */}
                  <br />

                  <RadioButton onAnswersChange={handleAnswersFromChildListen1} message={listenQuestion1} />
                  <br />
                  <br />
                  <br />
                  <br />
                </>

                :
                <>
                </>
            }
            {
              isListenPart2 === true ?
                <>
                  <h3>
                    {readTopicPart1.content}
                  </h3>
                  <YouTubeEmbed videoId={videoIdPart2} /> {/* Thay thế videoId bằng ID của video YouTube bạn muốn nhúng */}
                  <br />
                  <RadioButton onAnswersChange={handleAnswersFromChildListen2} message={listenQuestion2} />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isListenPart3 === true ?
                <>
                  <h3>

                  </h3>
                  <YouTubeEmbed videoId={videoIdPart3} /> {/* Thay thế videoId bằng ID của video YouTube bạn muốn nhúng */}
                  <br />
                  <RadioButton onAnswersChange={handleAnswersFromChildListen3} message={listenQuestion3} />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isReadPart1 === true ?
                <>
                  <div className="container">
                    <div className="left-pane">
                      <h3>
                        {contentReadPart1}
                      </h3>
                    </div>
                    <div className="right-pane">
                      <RadioButton onAnswersChange={handleAnswersFromChildRead1} message={readQuestion1} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isReadPart2 === true ?
                <>
                  <div className="container">
                    <div className="left-pane">
                      <h3>
                        {contentReadPart1}
                      </h3>
                    </div>
                    <div className="right-pane">
                      <RadioButton onAnswersChange={handleAnswersFromChildRead2} message={readQuestion2} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isReadPart3 === true ?
                <>
                  <div className="container">
                    <div className="left-pane">
                      <h3>
                        {contentReadPart1}
                      </h3>
                    </div>
                    <div className="right-pane">
                      <RadioButton onAnswersChange={handleAnswersFromChildRead3} message={readQuestion3} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isWritePart1 === true ?
                <>
                  <div className="container-fluid p-0">
                    <h3>
                      {writeQuestion1}
                    </h3>
                    <div className="card"></div>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><strong>Your answer</strong></Form.Label>
                        <Form.Control as="textarea" rows={8} onChange={handleChangWritePart1} />
                      </Form.Group>
                    </Form>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isWritePart2 === true ?
                <>
                  <div className="container-fluid p-0">

                    <h3>
                      {writeQuestion2}
                    </h3>

                    <div className="card"></div>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><strong>Your answer</strong></Form.Label>
                        <Form.Control as="textarea" rows={8} onChange={handleChangWritePart2} />
                      </Form.Group>
                    </Form>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }
            {
              isSpeakPart1 === true ?
                <>
                  <div className="container-fluid p-0">

                    <h3>
                      {speakTopicPart1.content}
                    </h3>

                    <div className="card"></div>
                    <div className="row">
                      <div className="col-5">
                        <AudioRecorder onAudioData={handleAudioData} />
                      </div>
                      <div className="col-5">
                        {audioUrl && <audio src={audioUrl} controls />}
                      </div>
                    </div>


                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
                :
                <>
                </>
            }


          </main>
          <footer className="footertestkill ">
            <div className="container-fluid">

              <div className="row text-muted  ">

                <div className="col p-3 mb-2 btn btn-info text-dark centered-skill">
                  <div className="row text-start">
                    <div className="col">
                      <p className="mb-0">
                        {isListenPart1 === true ?
                          <>
                          <button className="text-dark btn btn-primary" >
                          part1
                            </button>
                            
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part1
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                    <div className="col">
                      <p className="mb-0">
                        {isListenPart2 === true ?
                          <>
                          <button className="text-dark btn btn-primary" >
                          part2
                            </button>
                            
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part2
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                    <div className="col">
                      <p className="mb-0">
                        {isListenPart3 === true ?
                          <>
                          <button className="text-dark btn btn-primary" >
                          part3
                            </button>
                            
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part3
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="row center-text d-flex justify-content-center align-items-center">
                    Listening
                  </div>

                </div>
                <div className="col p-3 mb-2 btn btn-success  text-dark centered-skill">
                  <div className="row text-start">
                    <div className="col">
                      <p className="mb-0">
                        {isReadPart1 === true ?
                          <>
                            <button className="text-dark btn btn-primary" >
                          part1
                            </button>
                          </>
                          :
                          <>
                          <button className="text-dark btn" >
                          part1
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                    <div className="col">
                      <p className="mb-0">
                        {isReadPart2 === true ?
                          <>
                          <button className="text-dark btn btn-primary" >
                          part2
                            </button>
                            
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part2
                            </button>
                          </>
                        }
                      </p>
                    </div>
                    <div className="col">
                      <p className="mb-0">
                        {isReadPart3 === true ?
                          <>
                            <button className="text-dark btn btn-primary" >
                          part3
                            </button>
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part3
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="row center-text d-flex justify-content-center align-items-center">
                    Reading
                  </div>

                </div>
                <div className="col p-3 mb-2 btn btn-info text-dark centered-skill">
                  <div className="row text-start">
                    <div className="col">
                      <p className="mb-0">
                        {isWritePart1 === true ?
                          <>
                          <button className="text-dark btn btn-primary" >
                          part1
                            </button>
                            
                          </>
                          :
                          <>
                          <button className="text-dark btn " >
                          part1
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>
                    <div className="col">
                      <p className="mb-0">
                        {isWritePart2 === true ?
                          <>
                            <button className="text-dark btn btn-primary" >
                          part2
                            </button>
                          </>
                          :
                          <>
                          <button className="text-dark btn" >
                          part2
                            </button>
                            
                          </>
                        }
                      </p>
                    </div>

                  </div>
                  <div className="row center-text d-flex justify-content-center align-items-center ">
                    Writing
                  </div>

                </div>
                <div className="col p-3 mb-2 btn btn-success  text-dark centered-skill">
                  <div className="row text-center">
                    <div className="col">
                      <p className="mb-0 ">
                        {isSpeakPart1 === true ?
                          <>
                            <button className="text-dark btn btn-primary" >
                              part1
                            </button>
                          </>
                          :
                          <>
                            <button className="text-dark btn" >
                              part1
                            </button>

                          </>
                        }
                      </p>
                    </div>

                  </div>
                  <div className="row center-text d-flex justify-content-center align-items-center">
                    Speaking
                  </div>

                </div>
                <div className="col text-start centered-div">

                  <div className="row ">
                    <div className="col  centered-div">
                      <button className="btn btn-info" onClick={ClickNext}>
                        Next
                      </button>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </footer>
        </div>
      </div>
      <div>
        <div className="row">
          <nav className="navbar navbar-expand navbar-light navbar-bg"
            style={{ position: "fixed", zIndex: 999, width: "100%" }}>
          </nav>
        </div>
      </div>

    </>
  )
}