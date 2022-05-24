import * as React from "react"
import { useContext } from "react"
import { GlobalStateContext } from "../../context/GlobalContextProvider.js"

const Submit = ({ setError, setResult, setLoading, loading }) => {
  const state = useContext(GlobalStateContext)

  // Get access token.
  const getToken = async () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

    const urlencoded = new URLSearchParams()
    urlencoded.append("grant_type", "client_credentials")
    urlencoded.append("client_id", "6eb3e27f-6817-499b-9e58-51355865948a")
    urlencoded.append(
      "client_secret",
      "KG0Wz2fswdgxIAtEhjEIuAFsme7gUA74qXrrGNNO"
    )

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    }

    try {
      const res = await fetch(
        `https://add-cors-headers.herokuapp.com/https://api.prokerala.com/token`,
        requestOptions
      )
      return await res.json()
    } catch (error) {
      return error
    }
  }

  // Get matching response.
  const getMatching = async accessToken => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    const url = `https://add-cors-headers.herokuapp.com/https://api.prokerala.com/v2/astrology/kundli-matching?ayanamsa=5&girl_coordinates=${state.first.coord.lat},${state.first.coord.lng}&boy_coordinates=${state.second.coord.lat},${state.second.coord.lng}&girl_dob=${state.first.finalDob}&boy_dob=${state.second.finalDob}`

    try {
      const res = await fetch(url, requestOptions)
      return await res.json()
    } catch (error) {
      return error
    }
  }

  // Handle button click (get access token).
  const handleClick = async () => {
    setLoading(true)
    try {
      let token = await getToken()
      token = token.access_token
      const res = await getMatching(token)
      setResult(res.data.message.description)
      setError(null)
      setLoading(false)
    } catch (error) {
      setError(error)
      setResult(null)
      setLoading(false)
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={
        state.first.coord &&
        state.second.coord &&
        state.first.timeZone &&
        state.second.timeZone &&
        !loading
          ? false
          : true
      }
    >
      Submit!
    </button>
  )
}

export default Submit
