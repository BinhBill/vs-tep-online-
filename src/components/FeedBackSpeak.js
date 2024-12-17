import React from 'react';

const FeedBackSpeak = ({ data }) => {
    
    return (
        <div className="card">
            {
                data !== undefined ? 
                <>
                <div className="card " >
                <h3>{data.content}</h3>
                <p><strong>Feedback:</strong> {data.feedback}</p>
                <p><strong>Sample Essay:</strong> {data.sampleEssay}</p>
            </div>
                </>
                :
                <>
                <div className="card " >
                <h3></h3>
                <p><strong>Feedback:</strong> </p>
                <p><strong>Sample Essay:</strong> </p>
            </div>
                </>
            }
            
            
        </div>
    );
};

export default FeedBackSpeak;