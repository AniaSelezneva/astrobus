import * as React from "react"
import { useEffect } from "react"
import * as styles from "./styles.module.scss"

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const Today = ({ pageContext }) => {
  // Articles markup.
  const articles = Object.keys(pageContext).map((sign, index) => {
    return (
      <article className={styles.article} key={index}>
        <h3>{sign.substr(0, sign.length - 4).capitalize()}</h3>
        <div className={styles.color}>
          <div
            className={styles.square}
            style={{
              background: `${
                pageContext[sign].color.split(" ").length > 1
                  ? pageContext[sign].color.split(" ")[1].toLowerCase()
                  : pageContext[sign].color.split(" ")[0].toLowerCase()
              }`,
            }}
          ></div>
          <p>Your color today is {pageContext[sign].color.toLowerCase()}</p>
        </div>
        <div className={styles.info}>
          <ul className={styles.additionalInfo}>
            <strong> ({pageContext[sign].date_range})</strong>{" "}
            <li>Your compatibility is: {pageContext[sign].compatibility}</li>
            <li>Your lucky number is: {pageContext[sign].lucky_number}</li>
            <li>Your lucky time is: {pageContext[sign].lucky_time}</li>
            <li>Your mood is: {pageContext[sign].mood}</li>
          </ul>
          <p className={styles.mainText}>{pageContext[sign].description}</p>
        </div>
      </article>
    )
  })

  // Check if color is present.
  const isThereColor = el => {
    if (
      el.style.backgroundColor === "" ||
      el.style.backgroundColor === undefined ||
      el.style.backgroundColor === null
    ) {
      return false
    } else return true
  }

  // Style square that doesn't have a css color.
  const styleColorless = el => {
    el.style.backgroundColor = "grey"
    const p = document.createElement("p")
    p.innerHTML = "?"
    el.appendChild(p)
  }

  // Check if all colors are present.
  const checkColors = () => {
    const coloredSquares = document.getElementsByClassName(`${styles.square}`)

    //console.log(coloredSquares)
    for (let i = 0; i < coloredSquares.length; i++) {
      if (!isThereColor(coloredSquares[i])) {
        styleColorless(coloredSquares[i])
      }
    }
  }

  // Check colors.
  useEffect(() => {
    checkColors()
  }, [])

  return (
    <div className={styles.container}>
      <h1>{pageContext.aquariusData.current_date}</h1>
      {articles}
    </div>
  )
}

export default Today
