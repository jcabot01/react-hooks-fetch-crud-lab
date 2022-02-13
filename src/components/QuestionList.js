import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [isQuestions, setIsQuestions] = useState([])

  // useEffect/fetch GET.  Set State to incoming JSON data.
  useEffect(()=> {
    fetch("http://localhost:4000/questions") 
      .then((r) => r.json())
      .then((questions) => {
        setIsQuestions(questions)
      })
  }, []);

  function deleteQuestionButton(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = isQuestions.filter((question) => question.id !== id)
      setIsQuestions(updatedQuestions);
    });
  }
  
  function updateAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),  //pass in correctIndex as the part to be updated
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = isQuestions.map((question) => {
          if(question.id === updatedQuestion.id){
            return updatedQuestion;
          } else {
          return question;
          }
        });
        setIsQuestions(updatedQuestions);
      });
  }


  //set variable containing <QuestionItem/> component, map over the current State of questions to render to page. 
  const questionItems = isQuestions.map((question) => (
    <QuestionItem 
      key = {question.id}
      question = {question}
      onDeleteClick = {deleteQuestionButton}
      onChange = {updateAnswerChange}
    />
  ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
