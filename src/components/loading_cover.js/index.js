import React from "react"
import loading_star from "../../images/loading_star_black.svg"
import * as styles from "./styles.module.scss"

function Cover() {
  return (
    <div className={styles.container} id="cover">
      <div className={styles.loading_star}>
        <img alt="loading" src={loading_star} />
      </div>
    </div>
  )
}

export default Cover
