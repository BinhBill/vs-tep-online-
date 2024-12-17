import React from 'react';

const Quiz = ({ data }) => {
    return (
        <div className="card">
            {data.map((item, index) => (
                <div className="card " key={index}>
                <h3>{item.question}</h3>
                <p><strong>Selected Answer:</strong> {item.selectedAnswer}</p>
                <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                <p><strong>Explanation:</strong> {item.explanation}</p>
            </div>
                
            ))}
        </div>
    );
};

export default Quiz;