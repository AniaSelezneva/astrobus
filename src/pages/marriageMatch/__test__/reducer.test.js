import React, { useReducer } from "react"
import { act } from "react-dom/test-utils"
import { render, fireEvent, cleanup } from "@testing-library/react"
import * as ACTIONS from "../../../context/actions.js"

import GlobalContextProvider, {
  initialState,
  reducer,
} from "../../../context/GlobalContextProvider.js"

afterEach(cleanup)

const initState = {
  first: {
    dob: new Date().toISOString().slice(0, -5),
    timeZone: null,
    finalDob: null,
    coord: null,
    coordStr: null,
    coordErr: false,
    timeZoneLoading: false,
  },
  second: {
    dob: new Date().toISOString().slice(0, -5),
    timeZone: null,
    finalDob: null,
    coord: null,
    coordStr: null,
    coordErr: false,
    timeZoneLoading: false,
  },
}

// TEST INITIAL REDUCER VALUES.
describe("test the reducer", () => {
  it("should return the initial state", () => {
    expect(initialState).toEqual(initState)
  })

  it("should set first date/time of birth", () => {
    expect(
      reducer(initialState, ACTIONS.set_dob_1("2021-07-30T19:18:29"))
    ).toEqual({
      ...initState,
      first: { ...initState.first, dob: "2021-07-30T19:18:29" },
    })
  })

  it("should set first coords", () => {
    expect(
      reducer(
        initialState,
        ACTIONS.set_coord_1({
          lat: 42.309961278312215,
          lng: -71.20761718749998,
        })
      )
    ).toEqual({
      ...initState,
      first: {
        ...initState.first,
        coord: { lat: 42.309961278312215, lng: -71.20761718749998 },
      },
    })
  })
})
