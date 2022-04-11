import * as React from "react"
import * as styles from "../styles.module.scss"

function Card({ startMargin, setAmountChosen }) {
  const card = React.useRef()
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (active) {
      card.current.className = `${styles.is_chosen}`
    }
  }, [active])

  return (
    <img
      ref={card}
      className={styles.card}
      style={{ marginLeft: `${startMargin}px` }}
      onClick={() => {
        setActive(!active)
        setAmountChosen(prevValue => prevValue + 1)
      }}
      src="/cards/Back.jpg"
    ></img>
  )
}

export default Card
