import React, { useState, useEffect, useRef } from "react"

function Input({ setQuestionAsked }) {
  const [question, setQuestion] = useState("")
  const [savedQuestion, setSavedQuestion] = useState("")
  const input = useRef()
  const [questionSent, setQuestionSent] = useState(false)

  const url = process.env.GATSBY_SUBSCRIBE_URL

  const sendQuestionToServer = () =>
    fetch(`${url}ask`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        question: savedQuestion,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })

  return (
    <form>
      <div>
        <label htmlFor="name">Your YES/NO question: </label>
        <input
          ref={input}
          value={question}
          type="text"
          name="name"
          id="name"
          required
          onChange={e => {
            setQuestion(e.target.value)
          }}
        ></input>
        <button
          onClick={async e => {
            e.preventDefault()

            if (question.trim().length > 0) {
              setQuestionAsked(true)
              setQuestionSent(true)
              setSavedQuestion(question)
              setQuestion("")
              try {
                await sendQuestionToServer()
              } catch (error) {
                console.log(error)
              }
            }
          }}
        >
          Ask
        </button>
        <p style={{ visibility: questionSent ? "visible" : "hidden" }}>
          Your question was: {savedQuestion}
        </p>
      </div>
    </form>
  )
}

export default Input
