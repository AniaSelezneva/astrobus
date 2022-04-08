import * as React from "react"
import * as styles from "./styles.module.scss"
import moment from "moment"

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const Week = ({
  pageContext: {
    data: {
      data: {
        allWeekInfo: { edges },
      },
    },
  },
}) => {
  const week = { start: undefined, end: undefined }
  week.start = moment().startOf("week").add(1, "days").format("MMMM Do YYYY")
  week.end = moment().endOf("week").add(1, "days").format("MMMM Do YYYY")

  //Articles markup.
  const articles = () => {
    return edges.map((edge, index) => (
      <article className={styles.article} key={index}>
        <h3>{edge.node.header}</h3>
        <div className={styles.info}>{edge.node.text}</div>
      </article>
    ))
  }

  return (
    <div className={styles.container}>
      <h1>{`${week.start} - ${week.end}`}</h1>
      {articles()}
    </div>
  )
}

export default Week
