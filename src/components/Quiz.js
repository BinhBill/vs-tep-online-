import React from 'react';

const Quiz = ({ data }) => {
    return (
        <div className="card">
            {data.map((item, index) => (
                <div className="card " key={index}>
                <h3>{item.question}</h3>
                {item.selectedAnswer === item.correctAnswer ?
                <>
                <p class="text-success"><strong>Selected Answer:</strong> {item.selectedAnswer}</p>
                <p class="text-success"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                <p><strong>Explanation:</strong> {item.explanation}</p>
                </>
                :
                <>
                <p class="text-danger"><strong>Selected Answer:</strong> {item.selectedAnswer}</p>
                <p class="text-success"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                <p><strong>Explanation:</strong> {item.explanation}</p>
                </>
                }
                
            </div>
                
            ))}
        </div>
    );
};

export default Quiz;