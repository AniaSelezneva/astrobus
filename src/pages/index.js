import * as React from "react"
import "./styles.scss"
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <div className="container">
      <Link to="/today">Daily horoscope</Link>
      <Link to="/week">Weekly horoscope</Link>
      <Link to="/marriageMatch">Marriage match</Link>
      <Link to="/eightBall">Magic eight ball</Link>
      <Link to="/tarot">Tarot reading</Link>
    </div>
  )
}

export default IndexPage
