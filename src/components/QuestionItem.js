import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(r => r.json())
    .then(() => onDelete(question))
  }

  function handleAnswerChange(event) {
    const newIndex = event.target.value
    const answerChange = {"correctIndex": newIndex}
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerChange)
    })
    .then(r => r.json())
    .then(updatedAnswer => onAnswerChange(updatedAnswer))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
