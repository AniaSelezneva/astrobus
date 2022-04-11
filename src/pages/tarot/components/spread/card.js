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

  // Show back of the card when it's chosen
  React.useEffect(() => {
    if (num === state.cardCount) {
      cardFront.current.className = `${styles.card_front_chosen}`
    }
  }, [state.cardCount])

  const callback = () => {
    if (state.cardCount >= 10) {
      dispatch(add_cards_flipped)
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
      <img src={`/cards/${fileName}.jpg`} className={styles.card_back} />
    </div>
  )
}

export default Card
