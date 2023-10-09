import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((fetchedQuestions) => setQuestions(fetchedQuestions));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDelete(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleAnswerChange(updatedAnswer) {
    const updatedQuestions = questions.map((question) => {
      if (question.correctIndex === updatedAnswer) {
        return updatedAnswer
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={handleDelete} onAnswerChange={handleAnswerChange}/>
      )}
    </main>
  );
}

export default App;
