import * as React from "react"
import { useState, useEffect, useContext } from "react"
import * as styles from "./styles.module.scss"
import Map from "../../components/map"
import Submit from "../../components/marriageMatch/submit.js"
import manIcon from "../../images/man.svg"

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider.js"
import loading_star from "../../images/loading_star.svg"
import Set_coord_btn from "../../components/marriageMatch/set_coord_btn"
import Place_of_birth_coord from "../../components/marriageMatch/place_of_birth_coord"
import Timezone from "../../components/marriageMatch/timezone"
import Dob from "../../components/marriageMatch/dob"

const MarriageMatch = () => {
  const state = useContext(GlobalStateContext)

  const [loading, setLoading] = useState(false)

  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)

  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  // Is marker placed on the map?
  const [isMarker, setIsMarker] = useState(false)

  // Deal with submit errors.
  useEffect(() => {
    if (error) console.log("Error occured: ", error)
  }, [error])

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h2>Get kundli matching</h2>
        {/* MAP */}
        <Map
          lat={lat}
          setLat={setLat}
          lng={lng}
          setLng={setLng}
          setIsMarker={setIsMarker}
        >
          <div className={styles.button_container}>
            {/* First */}
            <Set_coord_btn num={1} isMarker={isMarker} coord={{ lat, lng }} />
            {/* Second */}
            <Set_coord_btn num={2} isMarker={isMarker} coord={{ lat, lng }} />
          </div>
        </Map>
        <form className={styles.form}>
          {/* FIRST PERSON */}
          <div className={styles.person}>
            {/* Header */}
            <img src={manIcon} alt="man icon" />
            {/* Coordinates */}
            <Place_of_birth_coord num={"first"} />
            {/* Timezone */}
            <Timezone num={"first"} />
            {/* Date of birth */}
            <Dob num={"first"} />
          </div>
          {/* SECOND PERSON*/}
          <div className={styles.person}>
            <img src={manIcon} alt="man icon" />
            {/* Coordinates */}
            <Place_of_birth_coord num={"second"} />
            {/* Timezone */}
            <Timezone num={"second"} />
            {/* Date of birth */}
            <Dob num={"second"} />
          </div>
        </form>
        {/* SUBMIT */}
        <div className={styles.submit_btn_container}>
          {loading ? (
            <div className={styles.loading_star}>
              <img alt="loading" src={loading_star} />
            </div>
          ) : (
            <Submit
              setError={setError}
              setResult={setResult}
              setLoading={setLoading}
              loading={loading}
            />
          )}
        </div>
        {/* RESULT TEXT, ERROR OR LOADING ANIMATION */}
        <div className={styles.result}>
          {error ? (
            <p className={styles.error_main}>
              Error occured, please try again later
            </p>
          ) : (
            <p>{result}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarriageMatch
