import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import FeedBackWrite from './FeedBackWrite';
import { FaLeaf } from 'react-icons/fa';
import FeedBackSpeak from './FeedBackSpeak';

const Feedback = () => {
    const navigate = useNavigate();
    const [isListen, setIsListen] = useState(true)
    const [isRead, setIsRead] = useState(false)
    const [isWrite, setIsWrite] = useState(false)
    const [isSpeak, setIsSpeak] = useState(false)
    const location = useLocation();
    const data = location.state;
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
        const data = location.state;
        if(!data.dataListen && !data.dataRead && !data.dataWrite) {
            navigate('/home')
        }
    },[location])

    return (
        <>
            {
                isListen === true ?
                    <>
                        <div>
                            <h1>Feedback Listen</h1>
                            <Quiz data={data.dataListen} />
                        </div>
                    </>
                    :
                    <>
                    </>
            }
             {
                isRead === true ?
                    <>
                        <div>
                            <h1>Feedback Read</h1>
                            <Quiz data={data.dataRead} />
                            
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