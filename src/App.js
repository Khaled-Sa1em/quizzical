import React from 'react'
import { nanoid } from 'nanoid'
import './css/App.css'

import Question from './components/question'

function App() {
  // ! states
  // const [started, setStarted] = React.useState(false)
  const [started, setStarted] = React.useState(true)
  const [checked, setChecked] = React.useState(false)
  // questions Data
  const [questions, setQuestions] = React.useState([])
  // questions elements
  const [questionsElements, setQuestionsElements] = React.useState([])

  // shuffleArray
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)
  // return array of objects
  const arrayOfObjects = (arr) =>
    arr.map((element) => ({
      body: element,
      id: nanoid(),
      selected: false,
    }))
  // fetch data
  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple',
      )
      const data = await res.json()
      const questions = []
      // here
      data.results.forEach((ques) => {
        questions.push({
          id: nanoid(),
          body: ques.question,
          correct: ques.correct_answer,
          answers: arrayOfObjects(
            shuffleArray([...ques.incorrect_answers, ques.correct_answer]),
          ),
        })
        // state questions data => from data
        setQuestions(questions)
      })
    }
    getQuestions()
  }, [started])

  React.useEffect(() => {
    setQuestionsElements(
      questions.map((ques) => (
        <Question key={ques.id} handleChoice={handleChoice} {...ques} />
      )),
    )
  }, [questions])

  // console.log(questions)
  // add selected and remove it from others
  function handleChoice(quesID, correct, ansBody) {
    console.log(quesID, correct === ansBody)
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === quesID
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.body === ansBody
                  ? { ...answer, selected: !answer.selected }
                  : { ...answer, selected: false },
              ),
            }
          : question,
      ),
    )
  }

  return (
    <div className="main">
      <div className="container">
        {started ? (
          <div className="">{questionsElements}</div>
        ) : (
          <div className="app">
            <h1 className="title">Quizzical</h1>
            <p className="desc">Some desc if needed</p>
            {/* Menu   */}
            <button className="btn ">start quiz</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
