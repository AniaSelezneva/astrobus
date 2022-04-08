import React, { useContext } from "react"
import { GlobalDispatchContext } from "../../context/GlobalContextProvider.js"

function Set_coord_btn({ num, isMarker, coord: { lat, lng } }) {
  const dispatch = useContext(GlobalDispatchContext)

  return (
    <button
      className={`set_coord_btn_${num}`}
      disabled={isMarker ? false : true}
      onClick={() => {
        dispatch({ type: `remove_coord_err_${num}` })
        dispatch({ type: `remove_coord_string_${num}` })
        dispatch({ type: `set_coord_${num}`, payload: { lat, lng } })
      }}
    >
      Set {num === 1 ? `first` : "second"} coordinates
    </button>
  )
}

export default Set_coord_btn
