import * as React from "react"
import AllCards from "./components/allCards"
import Spread from "./components/spread/spread"

const IndexPage = () => {
  const [amountChosen, setAmountChosen] = React.useState(0)

  return (
    <>
      <AllCards setAmountChosen={setAmountChosen} amountChosen={amountChosen} />
      <Spread amountChosen={amountChosen} />
    </>
  )
}

export default IndexPage
