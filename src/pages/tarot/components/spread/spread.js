import * as React from "react"
import * as styles from "../styles.module.scss"
import Card from "./card"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../../context/GlobalContextProvider"
import { add_cards, remove_spread } from "../../../../context/actions.js"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function Spread() {
  const table = React.useRef()
  const [cards, setCards] = React.useState([])
  const [names, setNames] = React.useState([]) // names of files
  const chosenCards = []
  const dispatch = React.useContext(GlobalDispatchContext)
  const state = React.useContext(GlobalStateContext)

  const addNames = () => {
    const result = []
    // Add Major
    for (let i = 0; i < 22; i++) {
      result.push(`Major${i.toString().padStart(2, "0")}`)
    }
    // Add Coins, Cups, Swords, Wands
    for (let i = 1; i < 15; i++) {
      result.push(`Coins${i.toString().padStart(2, "0")}`)
      result.push(`Cups${i.toString().padStart(2, "0")}`)
      result.push(`Swords${i.toString().padStart(2, "0")}`)
      result.push(`Wands${i.toString().padStart(2, "0")}`)
    }

    setNames(result)
  }

  const chooseRandom = () => {
    let randomNum
    let limit = names.length

    for (let i = 0; i < 10; i++) {
      randomNum = getRandomInt(0, limit)
      chosenCards.push(names[randomNum])
      names.splice(randomNum, 1)
      limit--
    }

    dispatch(add_cards(chosenCards))
  }

  const addCards = () => {
    const cards = []

    for (let i = 1; i <= 10; i++) {
      cards.push(<Card key={i} num={i} fileName={chosenCards[i - 1]} />)
    }
    return cards
  }

  React.useEffect(() => {
    addNames()
    chooseRandom()
    setCards(addCards())
  }, [])

  // Show back of the card when it's chosen
  // React.useEffect(() => {
  //   switch (amountChosen) {
  //     case 0:
  //       break
  //     case 1:
  //       table.current.firstElementChild.firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 2:
  //       table.current.children[1].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 3:
  //       table.current.children[2].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 4:
  //       table.current.children[3].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 5:
  //       table.current.children[4].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 6:
  //       table.current.children[5].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 7:
  //       table.current.children[6].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 8:
  //       table.current.children[7].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 9:
  //       table.current.children[8].firstElementChild.className = `${styles.card_front_chosen}`
  //       break
  //     case 10:
  //       table.current.children[9].firstElementChild.className = `${styles.card_front_chosen}`
  //       break

  //     default:
  //       break
  //   }
  // }, [amountChosen])

  return (
    <div className={styles.spread_container}>
      <div
        className={styles.info}
        style={
          state.cardCount < 10
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <p>Think of a question to ask</p>
        <p>Choose {10 - state.cardCount} cards</p>
      </div>

      <button
        style={
          state.cardCount > 9
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
        onClick={() => {
          dispatch(remove_spread)
          addNames()
          chooseRandom()
          setCards(addCards())
        }}
      >
        reset
      </button>

      <div className={styles.table} ref={table}>
        {cards}
      </div>
    </div>
  )
}

export default Spread
