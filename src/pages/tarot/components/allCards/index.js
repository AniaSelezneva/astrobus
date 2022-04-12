import * as React from "react"
import * as styles from "../styles.module.scss"
import Card from "./card"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../../context/GlobalContextProvider"

const AllCards = () => {
  const cardWidth = 70
  let startMargin = 10
  const [endMargin, setEndMargin] = React.useState()
  const [step, setStep] = React.useState()
  const [cards, setCards] = React.useState([])
  const container = React.useRef()
  const state = React.useContext(GlobalStateContext)

  const addCards = () => {
    const cards = []

    for (let i = 0; i < 78; i++) {
      cards.push(<Card startMargin={startMargin} key={i} />)
      startMargin = startMargin + step
    }
    return cards
  }

  React.useEffect(() => {
    setEndMargin(window.innerWidth - (cardWidth + startMargin))
  }, [])

  React.useEffect(() => {
    setStep((endMargin - startMargin) / 84)
  }, [endMargin])

  React.useEffect(() => {
    setCards(addCards())
  }, [step])

  React.useEffect(() => {
    if (state.cardCount >= 10) {
      container.current.style.animationName = `${styles.cardsDisappear}`
      container.current.style.animationDuration = `1s`
      container.current.style.animationFillMode = `forwards`
      container.current.style.animationDelay = `0.6s`
    }
  }, [state.cardCount])

  return (
    <>
      <div className={styles.cards_container} ref={container}>
        {cards}
      </div>
    </>
  )
}

export default AllCards
