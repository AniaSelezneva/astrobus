import React from "react"
import interpretations from "../../utils/interpretations.json"
import { GlobalStateContext } from "../../../../context/GlobalContextProvider"
import * as styles from "../styles.module.scss"

function Interpretations() {
  const state = React.useContext(GlobalStateContext)
  const markup = {
    present: undefined,
    challenge: undefined,
    past: undefined,
    future: undefined,
    above: undefined,
    below: undefined,
    advice: undefined,
    influences: undefined,
    hopes: undefined,
    outcome: undefined,
  }
  const [text, setText] = React.useState()

  React.useEffect(() => {
    if (state.cardsFlipped >= 10) {
      interpretations.tarot_interpretations.forEach(value => {
        if (value.fileName === state.chosenCards[0]) {
          markup.present = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[1]) {
          markup.challenge = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[2]) {
          markup.past = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[3]) {
          markup.future = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[4]) {
          markup.above = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[5]) {
          markup.below = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[6]) {
          markup.advice = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[7]) {
          markup.influences = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[8]) {
          markup.hopes = value.meanings.light.join(", ")
        } else if (value.fileName === state.chosenCards[9]) {
          markup.outcome = value.meanings.light.join(", ")
        }
      })

      const result = []

      Object.keys(markup).forEach((key, index) => {
        result.push(
          <div key={index}>
            <h3>{key}</h3>
            <p>{markup[key]}</p>
          </div>
        )
      })

      console.log(result)

      setText(result)
    }
  }, [state.cardsFlipped])

  return <div className={styles.interpretations_container}>{text}</div>
}

export default Interpretations
