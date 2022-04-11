import * as React from "react"
import * as styles from "../styles.module.scss"

function Card({ num, fileName }) {
  const card = React.useRef()
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (active) {
      // If it's a second card (rotated)
      if (num === 1) {
        card.current.className = `${styles.is_active_second}`
      } else {
        card.current.className = `${styles.is_active}`
      }
    }
  }, [active])

  return (
    <div
      className={styles.spread_card}
      ref={card}
      onClick={() => {
        setActive(!active)
      }}
    >
      <div className={styles.card_front} />
      <img src={`/cards/${fileName}.jpg`} className={styles.card_back} />
    </div>
  )
}

export default Card
