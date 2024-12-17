import React from 'react';

const FeedBackWrite = ({ data }) => {
    
    return (
        <div className="card">
            {data.map((item, index) => (
                <div className="card " key={index}>
                <h3>{item.content}</h3>
                <p><strong>Feedback :</strong> {item.data.feedback}</p>
                <p><strong>Sample Essay:</strong> {item.data.sampleEssay}</p>
            </div>
                
            ))}
        </div>
    );
};

export default FeedBackWrite;