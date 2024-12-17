import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

function RadioButton({ onAnswersChange, message }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});


  const handleChange = (questionId, optionId, optionContent) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [questionId]: {
        id: optionId
      }
    };
    setSelectedAnswers(newSelectedAnswers);
  };
  useEffect(() => {
    onAnswersChange(selectedAnswers);
  }, [selectedAnswers, onAnswersChange]);

  return (

    <>
      <Form>
        {
          message.map((question, questionIndex) => (
            <div key={question.id}>
              <Form.Label htmlFor="inputPassword5">
                <strong>
                  Question : {question.content}
                </strong>
              </Form.Label>
              {question.answerOptions.map((option, optionIndex) => (
                <div key={option.id}>
                  <Form.Check
                    type="radio"
                    id={`q${question.id}-option${optionIndex}`}
                    key={option.id}
                    label={option.content}
                    name={`question${question.id}`}
                    checked={selectedAnswers[question.id]?.id === option.id}
                    value={option.content}

                    onChange={() => handleChange(question.id, option.id, option.content)}
                  />
                </div>
              ))}
              <br />
            </div>

          ))
        }


      </Form>
    </>


  )

}

export default RadioButton;