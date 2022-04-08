import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import Set_coord_btn from "../components/set_coord_btn"

let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

// RENDERING TEST
// When map is clicked (isMarker prop is true), button is enabled.
it("enables when map is clicked", () => {
  act(() => {
    render(
      <Set_coord_btn
        num="1"
        isMarker={true}
        coord={{ lat: 42.24378766522858, lng: -71.246755981445 }}
      />,
      container
    )
  })

  expect(container.querySelector(".set_coord_btn_1").disabled).not.toBeTruthy()
})
