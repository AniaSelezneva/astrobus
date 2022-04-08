import * as React from "react"
import { useRef, useState, useEffect } from "react"
import * as styles from "./styles.module.scss"
import mapboxgl from "!mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.GATSBY_MAP_ACCESS_TOKEN

const Map = ({ lng, setLng, lat, setLat, setIsMarker, children }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  const [zoom, setZoom] = useState(9)

  //Create map
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    })
  }, [])

  // Add event listener to the map, place marker.
  useEffect(() => {
    if (!map.current) return // wait for map to initialize

    map.current.on("move", () => {
      // setLng(map.current.getCenter().lng.toFixed(4))
      // setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    const marker = new mapboxgl.Marker()

    // Place marker somewhere on the map initially.
    map.current.on("load", () => {
      marker.setLngLat({ lng, lat }).addTo(map.current)
    })

    map.current.on("click", event => {
      const coordinates = event.lngLat
      setLng(coordinates.lng)
      setLat(coordinates.lat)

      marker.setLngLat(coordinates).addTo(map.current)
      setIsMarker(true)
    })
  })

  return (
    <div className={styles.container}>
      <div className={styles.map_container}>
        <div className={styles.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} id={styles.map}></div>
      </div>
      {children}
    </div>
  )
}

export default Map
