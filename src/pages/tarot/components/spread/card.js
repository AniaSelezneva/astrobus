import * as React from "react"
import * as styles from "../styles.module.scss"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../../context/GlobalContextProvider"
import { add_cards_flipped } from "../../../../context/actions.js"

function Card({ num, fileName }) {
  const card = React.useRef()
  const cardFront = React.useRef()
  const state = React.useContext(GlobalStateContext)
  const dispatch = React.useContext(GlobalDispatchContext)
  const [clicked, setClicked] = React.useState(false) // not to be able to cound clicks on the same card

  // Show back of the card when it's chosen
  React.useEffect(() => {
    if (num === state.cardCount) {
      cardFront.current.className = `${styles.card_front_chosen}`

      window.getComputedStyle(card.current, ":after").style = "display: none"
    }
  }, [state.cardCount])

  const callback = () => {
    if (state.cardCount >= 10) {
      if (!clicked) {
        dispatch(add_cards_flipped)
        setClicked(true)
      }
      // If it's a second card (rotated)
      if (num === 2) {
        card.current.className = `${styles.is_active_second}`
      } else {
        card.current.className = `${styles.is_active}`
      }
    }
  }

  return (
    <div className={styles.spread_card} ref={card} onClick={callback}>
      <div className={styles.card_front} ref={cardFront} />
      <img
        src={`/cards/${fileName}.jpg`}
        className={styles.card_back}
        alt={`${fileName}`}
      />
    </div>
  )
}

export default Card
