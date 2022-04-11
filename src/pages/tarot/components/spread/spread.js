import * as React from "react"
import * as styles from "../styles.module.scss"
import Card from "./card"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function Spread({ amountChosen }) {
  const table = React.useRef()
  const [cards, setCards] = React.useState([])
  const names = [] // names of files
  const chosenNames = []

  const addNames = () => {
    // Add Major
    for (let i = 0; i < 22; i++) {
      names.push(`Major${i.toString().padStart(2, "0")}`)
    }
    // Add Coins, Cups, Swords, Wands
    for (let i = 1; i < 15; i++) {
      names.push(`Coins${i.toString().padStart(2, "0")}`)
      names.push(`Cups${i.toString().padStart(2, "0")}`)
      names.push(`Swords${i.toString().padStart(2, "0")}`)
      names.push(`Wands${i.toString().padStart(2, "0")}`)
    }
  }

  const chooseRandom = () => {
    let randomNum
    let limit = names.length

    for (let i = 0; i < 10; i++) {
      randomNum = getRandomInt(0, limit)
      chosenNames.push(names[randomNum])
      names.splice(randomNum, 1)
      limit--
    }
  }

  addNames()
  chooseRandom()

  const addCards = () => {
    const cards = []

    for (let i = 0; i < 10; i++) {
      cards.push(<Card key={i} num={i} fileName={chosenNames[i]} />)
    }
    return cards
  }

  React.useEffect(() => {
    setCards(addCards())
  }, [])

  // Show back of the card when it's chosen
  React.useEffect(() => {
    switch (amountChosen) {
      case 0:
        break
      case 1:
        table.current.firstElementChild.firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 2:
        table.current.children[1].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 3:
        table.current.children[2].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 4:
        table.current.children[3].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 5:
        table.current.children[4].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 6:
        table.current.children[5].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 7:
        table.current.children[6].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 8:
        table.current.children[7].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 9:
        table.current.children[8].firstElementChild.className = `${styles.card_front_chosen}`
        break
      case 10:
        table.current.children[9].firstElementChild.className = `${styles.card_front_chosen}`
        break

      default:
        break
    }
  }, [amountChosen])

  return (
    <div className={styles.spread_container}>
      <div className={styles.table} ref={table}>
        {cards}
      </div>
    </div>
  )
}

export default Spread