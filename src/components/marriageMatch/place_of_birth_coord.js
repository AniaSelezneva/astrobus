import React, { useContext } from "react"
import * as styles from "../../pages/marriageMatch/styles.module.scss"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider.js"

const coordRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/

function Place_of_birth_coord({ num }) {
  // 'first' or 'second'
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

  const ordinal = num === "first" ? 1 : 2

  // Check if coordinates are correct.
  const checkCoordStr = coord => {
    return coordRegex.test(coord)
  }

  // Handle typing coordinates by hand.
  const handleChange = e => {
    dispatch({ type: `remove_coord_${ordinal}` })
    const str = e.target.value
    dispatch({ type: `set_coord_string_${ordinal}`, payload: str })
    const isCorrect = checkCoordStr(str)

    if (isCorrect) {
      dispatch({ type: `remove_coord_err_${ordinal}` })
      const commaIndex = str.indexOf(",")
      dispatch({
        type: `set_coord_${ordinal}`,
        payload: {
          lat: str.slice(0, commaIndex).trim(),
          lng: str.slice(commaIndex + 1).trim(),
        },
      })
    } else {
      dispatch({ type: `remove_timezone_${ordinal}` })
      dispatch({ type: `set_coord_err_${ordinal}` })
    }
  }

  return (
    <div className={styles.coord}>
      <label htmlFor={`coord_${num}`}>Place of birth coordinates:</label>
      <input
        type="text"
        name={`coord_${num}`}
        id={`coord_${num}`}
        required
        value={
          state[num].coordStr
            ? state[num].coordStr
            : state[num].coord
            ? `${state[num].coord.lat},${state[num].coord.lng}`
            : "Please choose a place on the map"
        }
        onChange={e => {
          handleChange(e)
        }}
      />
      {/* Error */}
      <p
        className={styles.coord_err}
        style={{
          display: state[num].coordErr ? "block" : "none",
        }}
      >
        Coordinates incorrect
      </p>
    </div>
  )
}

export default Place_of_birth_coord
