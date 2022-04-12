import * as React from "react"
import AllCards from "./components/allCards"
import Interpretations from "./components/interpretations"
import Spread from "./components/spread/spread"
import { GlobalStateContext } from "../../context/GlobalContextProvider"

const IndexPage = () => {
  const state = React.useContext(GlobalStateContext)
  return (
    <>
      <AllCards />

      <Spread />
      <Interpretations />
    </>
  )
}

export default IndexPage
