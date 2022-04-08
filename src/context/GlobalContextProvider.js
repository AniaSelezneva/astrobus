import React, { createContext, useReducer } from "react"

export const initialState = {
  first: {
    dob: new Date().toISOString().slice(0, 10),
    timeZone: null,
    finalDob: null,
    coord: null,
    coordStr: null,
    coordErr: false,
    timeZoneLoading: false,
  },
  second: {
    dob: new Date().toISOString().slice(0, 10),
    timeZone: null,
    finalDob: null,
    coord: null,
    coordStr: null,
    coordErr: false,
    timeZoneLoading: false,
  },
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "set_dob_1":
      return { ...state, first: { ...state.first, dob: action.payload } }
    case "set_dob_2":
      return { ...state, second: { ...state.second, dob: action.payload } }
    case "set_coord_1":
      return { ...state, first: { ...state.first, coord: action.payload } }
    case "set_coord_2":
      return { ...state, second: { ...state.second, coord: action.payload } }
    case "remove_coord_1":
      return { ...state, first: { ...state.first, coord: null } }
    case "remove_coord_2":
      return { ...state, second: { ...state.second, coord: null } }
    case "set_coord_string_1":
      return { ...state, first: { ...state.first, coordStr: action.payload } }
    case "set_coord_string_2":
      return { ...state, second: { ...state.second, coordStr: action.payload } }
    case "remove_coord_string_1":
      return { ...state, first: { ...state.first, coordStr: null } }
    case "remove_coord_string_2":
      return { ...state, second: { ...state.second, coordStr: null } }
    case "set_timezone_1":
      return { ...state, first: { ...state.first, timeZone: action.payload } }
    case "set_timezone_2":
      return { ...state, second: { ...state.second, timeZone: action.payload } }
    case "remove_timezone_1":
      return { ...state, first: { ...state.first, timeZone: null } }
    case "remove_timezone_2":
      return { ...state, second: { ...state.second, timeZone: null } }
    case "set_final_dob_1":
      return { ...state, first: { ...state.first, finalDob: action.payload } }
    case "set_final_dob_2":
      return { ...state, second: { ...state.second, finalDob: action.payload } }
    case "set_coord_err_1":
      return { ...state, first: { ...state.first, coordErr: true } }
    case "set_coord_err_2":
      return { ...state, second: { ...state.second, coordErr: true } }
    case "remove_coord_err_1":
      return { ...state, first: { ...state.first, coordErr: false } }
    case "remove_coord_err_2":
      return { ...state, second: { ...state.second, coordErr: false } }
    case "timeZone_loading_1":
      return { ...state, first: { ...state.first, timeZoneLoading: true } }
    case "timeZone_loading_2":
      return { ...state, second: { ...state.second, timeZoneLoading: true } }
    case "timeZone_loaded_1":
      return { ...state, first: { ...state.first, timeZoneLoading: false } }
    case "timeZone_loaded_2":
      return { ...state, second: { ...state.second, timeZoneLoading: false } }

    default:
      throw new Error()
  }
}

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider

// Provider sends state and dispatch to all the lower components.
// Lower components will access it through useContext(store).
// Store is created here.
