import * as React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import quotes from "../quotes/quotes.json" //1643
import Cover from "../components/loading_cover.js/index.js"
import StarsBackground from "./components/StarsBackground"
import Go_to_top from "../components/go_to_top"
import * as style from "./styles.module.scss"

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [quote] = useState(getRandomQuote())

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }

  function getRandomQuote() {
    const quote = quotes[getRandomInt(0, 1643)]
    return (
      <>
        <q>{quote.text}</q>
        <figcaption>{quote.author}</figcaption>
      </>
    )
  }

  return (
    <div className={style.container}>
      {!loaded && <Cover />}
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/today">Horoscope today</Link>
            </li>
            <li>
              <Link to="/week">Weekly horoscope</Link>
            </li>
            <li>
              <Link to="/marriageMatch">Marriage matching</Link>
            </li>
            <li>
              <Link to="/eightBall">Magic 8-ball</Link>
            </li>
            <li>
              <Link to="/tarot">Tarot</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={style.main}>
        <StarsBackground setLoaded={setLoaded} />
        {children}
      </main>

      <footer>
        © {new Date().getFullYear()}
        <figure className={style.quote}>{quote}</figure>
      </footer>

      <Go_to_top />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
