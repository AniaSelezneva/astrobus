import * as React from "react"
import * as styles from "./styles.module.scss"

const IndexPage = () => {
  const cardWidth = 70
  let startMargin = 10
  const endMargin = window.innerWidth - (cardWidth + startMargin)
  const step = (endMargin - startMargin) / 78
  console.log(window.innerWidth, endMargin)

  const addCards = () => {
    const cards = []
    for (let i = 0; i < 78; i++) {
      cards.push(
        <div
          key={i}
          className={styles.card}
          style={{ marginLeft: `${startMargin}px` }}
          onClick={() => {
            this.classList.toggle("is-flipped")
          }}
        >
          <div className={styles.card_face_front}>front</div>
          <div className={styles.card_face_back}>back</div>
        </div>
      )
      startMargin += step
    }
    return cards
  }

  return <div className={styles.container}>{addCards()}</div>
}

export default IndexPage
