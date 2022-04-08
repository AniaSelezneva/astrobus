import React, { useContext, useEffect, useState } from "react"
import * as styles from "../../pages/marriageMatch/styles.module.scss"
import { format } from "date-fns-tz"

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider.js"

function Dob({ num }) {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState("00:00")

  // Format time properly to send to Prokerala.
  const formatTime = (dateTime, timeZone) => {
    const date = new Date(dateTime)
    let timeWithOffset = format(date, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone,
    }) // 2014-10-25 06:46:20-04:00
    const offset = timeWithOffset.slice(-7) //-04:00

    return `${dateTime.slice(0, -1)}${offset}` // 2014-10-25T06:46:20-04:00
  }

  // When timezone, date or time changes, edit the dob in context.
  useEffect(() => {
    const ordinal = num === "first" ? 1 : 2

    if (state[num].timeZone) {
      dispatch({
        type: `set_final_dob_${ordinal}`,
        payload: formatTime(`${date}T${time}:00`, state[num].timeZone),
      })
    }
  }, [state[num].timeZone, date, time])

  // Dispatch full date+time string when date or time changes.
  useEffect(() => {
    dispatch({
      type: `set_dob_${num === "first" ? 1 : 2}`,
      payload: `${date}T${time}`,
    })
  }, [date, time])

  return (
    <>
      {/* DATE */}
      <div className={styles.date}>
        <label htmlFor={`date_${num}`}>Date of birth:</label>
        <input
          required
          type="date"
          id={`date_${num}`}
          name="date_of_birth"
          value={date}
          min="1900-01-01"
          max="2025-12-31"
          onChange={e => {
            setDate(e.target.value)
          }}
        ></input>
      </div>

      {/* TIME */}
      <div className={styles.time}>
        <label htmlFor={`time_${num}`}>Time of birth:</label>
        <input
          required
          type="time"
          id={`time_${num}`}
          name="time_of_birth"
          value={time}
          onChange={e => {
            setTime(e.target.value)
          }}
        ></input>
      </div>
    </>
  )
}

export default Dob
