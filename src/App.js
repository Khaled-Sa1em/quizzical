import React from 'react'
import { nanoid } from 'nanoid'
import './css/App.css'

import Question from './components/question'
let result = 0
function App() {
  // ! states
  // const [started, setStarted] = React.useState(false)
  const [started, setStarted] = React.useState(0)
  // const [finished, setFinished] = React.useState(false)
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
      right: false,
      wrong: false,
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
    // ! this done the job but i don't no is there another way or not
    if (started) {
      getQuestions()
    }
  }, [started])

  React.useEffect(() => {
    setQuestionsElements(
      questions.map((ques) => (
        <Question key={ques.id} handleChoice={handleChoice} {...ques} />
      )),
    )
  }, [questions])

  // add selected and remove it from others
  function handleChoice(quesID, correct, ansBody) {
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
  function gettingStarted() {
    setStarted(1)
  }

  //!!! check values

  // let wrong = 0
  function gettingChecked() {
    if (!checked) {
      result = 0
      const checkQuestions = questions.map((ques) => ({
        ...ques,
        answers: ques.answers.map((answer) => {
          if (ques.correct === answer.body) {
            if (answer.selected) result++
            return { ...answer, right: true }
          } else if (answer.selected) {
            return { ...answer, wrong: true }
          } else {
            return { ...answer }
          }
        }),
      }))
      setChecked(true)
      setQuestions(checkQuestions)
    } else {
      setChecked(false)
      setStarted((prev) => prev + 1)
    }
  }

  return (
    <div className="main">
      <div className="container">
        {started ? (
          <div className="">
            {questionsElements}

            <div className="small-menu">
              {checked && (
                <p>
                  your score in exam {started} is <span className='result'>{result}</span> out of{' '}
                  {questions.length}{' '}
                </p>
              )}
              <button className="btn" onClick={gettingChecked}>
                {checked ? 'play-again' : 'Check values'}
              </button>
            </div>
          </div>
        ) : (
          <div className="main-menu">
            <h1 className="title">Quizzical</h1>
            <p className="desc">Check Your knowledge</p>

            <button className="btn " onClick={gettingStarted}>
              start quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
