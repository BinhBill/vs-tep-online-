import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Quiz from './Quiz';
import FeedBackWrite from './FeedBackWrite';
import FeedBackSpeak from './FeedBackSpeak';

const Feedback = () => {
    const [isListen, setIsListen] = useState(true)
    const [isRead, setIsRead] = useState(false)
    const [isWrite, setIsWrite] = useState(false)
    const [isSpeak, setIsSpeak] = useState(false)
    const location = useLocation();
    const data = location.state;
    
    const dataListen = data.dataListen;
    const countCorrectListen = dataListen.filter(item => item.selectedAnswer === item.correctAnswer).length;
    const pointListen = `Total Point: ${countCorrectListen} / ${dataListen.length}`

    const dataRead = data.dataRead;
    const countCorrectRead = dataRead.filter(item => item.selectedAnswer === item.correctAnswer).length;
    const pointRead = `Total Point: ${countCorrectRead} / ${dataRead.length}`
    const handleClickNext = () => {
        if (isListen) {
            setIsListen(false)
            setIsRead(true)
            return;
        }
        if (isRead) {
            setIsRead(false)
            setIsWrite(true)
            return;
        }
        if (isWrite) {
            setIsWrite(false)
            setIsSpeak(true)
            return;
        }
    }
    useEffect(()=> {
        
    },[])

    return (
        <>
            {
                isListen === true ?
                    <>
                        <div className='row'>
                        <h1 className='col-5'>Feedback Listen </h1>
                            <h1 className='col-2 btn btn-success'>
                            {pointListen}
                            </h1>
                        </div>
                        <div className='row'>
                            <div className='col'>
                            <Quiz data={data.dataListen} />
                            </div>
                            
                            </div>
                    </>
                    :
                    <>
                    </>
            }
             {
                isRead === true ?
                    <>
                    <div className='row'>
                        <h1 className='col-5'>Feedback Read </h1>
                            <h1 className='col-2 btn btn-success'>
                            {pointRead}
                            </h1>
                        </div>
                        <div className='row'>
                            <div className='col'>
                            <Quiz data={data.dataRead} />
                            </div>
                            
                            </div>                        
                    </>
                    :
                    <>
                    </>
            }
             {
                isWrite === true ?
                    <>
                        <div>
                            <h1>Feedback Write</h1>
                            <FeedBackWrite data={data.dataWrite} />
                        </div>
                    </>
                    :
                    <>
                    </>
            }
            {
                isSpeak === true ?
                    <>
                        <div>
                            <h1>Feedback Speak</h1>
                            <FeedBackSpeak data={data.dataSpeak} />
                        </div>
                    </>
                    :
                    <>
                    </>
            }

            <br />
            <div className='row'>
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={handleClickNext}>Next</button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Feedback;