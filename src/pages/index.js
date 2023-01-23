import * as React from "react"
import "./styles.scss"
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <div className="container">
      <ul>
        <li>
          <Link to="/today">Daily horoscope</Link>
        </li>
        {/* <li>
          <Link to="/week">Weekly horoscope</Link>
        </li> */}
        <li>
          <Link to="/marriageMatch">Marriage match</Link>
        </li>
        <li>
          <Link to="/eightBall">Magic eight ball</Link>
        </li>
        <li>
          <Link to="/tarot">Tarot reading</Link>
        </li>
      </ul>
    </div>
  )
}

export default IndexPage
