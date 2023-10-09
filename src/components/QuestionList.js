import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onAnswerChange }) {
  if (!questions) {
    return (
      <section>
        <h1>Quiz Questions</h1>
        <ul>Loading...</ul>
      </section>
    );
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      {questions.map((question) => (
      <QuestionItem key={question.id} question={question} onDelete={onDelete} onAnswerChange={onAnswerChange}/>))}
    </section>
  );
}

export default QuestionList;
