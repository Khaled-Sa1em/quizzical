import React from 'react'
import { nanoid } from 'nanoid'
import Answer from './answer'
export default function Question(props) {
  // initialize answers Elements
  const [answers, setAnswer] = React.useState(props.answers)

  const answersElements = answers.map((answer) => (
    <Answer
      handleChoice={() =>
        props.handleChoice(props.id, props.correct, answer.body)
      }
      body={answer.body}
      id={answer.id}
      key={nanoid()}
      selected={answer.selected}
    />
  ))

  React.useEffect(() => {
    setAnswer(props.answers)
  }, [props.answers])

  return (
    <div className="quesContainer">
      <p className="ques">{props.body}</p>
      <div className="answers">{answersElements}</div>
    </div>
  )
}
