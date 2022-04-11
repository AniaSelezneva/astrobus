import * as React from "react"
import * as styles from "../styles.module.scss"
import Card from "./card"

const AllCards = ({ setAmountChosen, amountChosen }) => {
  const cardWidth = 70
  let startMargin = 10
  const [endMargin, setEndMargin] = React.useState()
  const [step, setStep] = React.useState()
  const [cards, setCards] = React.useState([])

  const addCards = () => {
    const cards = []

    for (let i = 0; i < 78; i++) {
      cards.push(
        <Card
          setAmountChosen={setAmountChosen}
          amountChosen={amountChosen}
          startMargin={startMargin}
          key={i}
        />
      )
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
    console.log(amountChosen)
  }, [amountChosen])

  return (
    <>
      <div className={styles.cards_container}>{cards}</div>
    </>
  )
}

export default AllCards
