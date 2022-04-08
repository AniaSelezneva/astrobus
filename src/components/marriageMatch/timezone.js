import React, { useContext, useEffect, useState } from "react"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider.js"
import * as ACTIONS from "../../context/actions.js"

function Timezone({ num }) {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const [error, setError] = useState(false)

  // Get time zone.
  // Returns a promise (json or err).
  const getTimeZone = async coords => {
    const query =
      "https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/" +
      coords.lng +
      "," +
      coords.lat +
      ".json?access_token=" +
      process.env.GATSBY_MAP_ACCESS_TOKEN

    const requestOptions = {
      method: "GET",
    }

    try {
      const res = await fetch(query, requestOptions)
      return await res.json()
    } catch (error) {
      return error
    }
  }

  // Get corresponding timezones when coordinates are chosen.
  useEffect(async () => {
    const ordinal = num === "first" ? 1 : 2
    // Remove error.
    setError(false)
    async function setTimeZone() {
      try {
        // Sending GET request...
        const data = await getTimeZone(state[num].coord)

        // If it's somewhere in the ocean (not proper for mapbox)...
        if (!data.features[0]) {
          // remove timezone,
          dispatch(ACTIONS[`remove_timezone_${ordinal}`])
          // set coordinates error,
          dispatch(ACTIONS[`set_coord_err_${ordinal}`])
          // finish loading.
          dispatch(ACTIONS[`timeZone_loaded_${ordinal}`])

          return
        }
        // If timezone is loaded correctly...
        const timeZone = data.features[0].properties.TZID
        // set timezone,
        dispatch(ACTIONS[`set_timezone_${ordinal}`](timeZone))
        // finish loading.
        dispatch(ACTIONS[`timeZone_loaded_${ordinal}`])
      } catch (error) {
        console.log(`Error occured: ${error}`)
        setError(true)
      }
    }

    if (state[num].coord) {
      // Timezone starts loading...
      dispatch(ACTIONS[`timeZone_loading_${ordinal}`])
      setTimeZone()
    }
  }, [state[num].coord])

  return (
    <p className="timezone">
      {error
        ? "Error occured"
        : `Timezone:
     ${
       state[num].timeZoneLoading
         ? "loading..."
         : state[num].timeZone
         ? state[num].timeZone
         : "not derermined"
     }`}
    </p>
  )
}

export default Timezone
