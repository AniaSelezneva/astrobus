import React from "react"
import { useEffect, useRef, useState } from "react"
import * as style from "../styles.module.scss"
import Back from "../../images/back2.svg"
import StarImg from "../../images/star.svg"

function StarsBackground({ setLoaded }) {
  const starsTotal = 20
  const canvasRef = useRef()
  const backRef = useRef()
  let timeoutId
  let resizeObserver
  const [stars, setStars] = useState([])
  const [isTouch, setIsTouch] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }

  function moveStars() {
    stars.forEach(star => {
      star.move()
    })
  }

  class Star {
    constructor(serial) {
      this.star = document.createElement("img")
      this.star.setAttribute("id", `${style.star}${serial}`)
      this.star.setAttribute("class", `${style.star}`)
      this.star.setAttribute("src", `${StarImg}`)

      this.height = window.innerWidth / 50
      this.width = this.height

      this.position = {}
      this._getNewPosition()

      this.star.style.left = `${this.position.x}px`
      this.star.style.top = `${this.position.y}px`

      this._append()
    }

    _getNewPosition() {
      this.position = {
        x: getRandomInt(this.width + 20, window.innerWidth - (this.width + 20)),
        y: getRandomInt(
          this.width + 20,
          backRef.current.offsetHeight - (this.height + 20)
        ),
      }
    }

    _append() {
      canvasRef.current.appendChild(this.star)
    }

    move() {
      this._getNewPosition()
      this.star.style.transitionDuration = "5s"
      this.star.style.left = `${this.position.x}px`
      this.star.style.top = `${this.position.y}px`
    }
  }

  // Attach resize observer.
  useEffect(() => {
    // Observer (works both on first page paint and resize).
    // If it's not the initial paint
    // (all stars are loaded)...
    if (stars.length === starsTotal) {
      resizeObserver = new ResizeObserver(entries => {
        // Resize canvas (so background image is scaled properly)
        const backgroundHeight = entries[0].target.offsetHeight

        canvasRef.current.style.height = `${backgroundHeight}px`
        if (!isInitialLoad) {
          moveStars()
          setIsInitialLoad(false)
        }
      })

      resizeObserver.observe(backRef.current)
    }
  }, [stars.length])

  // Unobserve
  useEffect(() => {
    return () => {
      resizeObserver.unobserve(backRef.current)
    }
  }, [])

  // Change canvas ref height, create stars
  useEffect(() => {
    const interval = setInterval(() => {
      // create stars when background image is loaded (to calculate stars' size)
      if (backRef.current && backRef.current.offsetHeight > 0) {
        // change height of canvas ref
        canvasRef.current.style.height = `${backRef.current.offsetHeight}px`
        // create stars
        for (let i = 0; i < starsTotal; i++) {
          const newStar = new Star(i)
          setStars(prevStars => {
            prevStars.push(newStar)
            return prevStars
          })
        }
        setLoaded(true)
        clearInterval(interval)
      }
    }, 400)
  }, [])

  // Detect if a touch device is used
  useEffect(() => {
    const cb = () => {
      setIsTouch(true)
    }
    window.addEventListener("touchstart", cb, false)
  }, [])

  return (
    <div className={style.top}>
      <div id={style.canvas} ref={canvasRef} />
      <img
        ref={backRef}
        src={Back}
        id={style.back}
        onMouseEnter={() => {
          if (!isTouch) {
            timeoutId = setTimeout(() => {
              moveStars()
            }, 1000)
          }
        }}
        onMouseLeave={() => {
          clearTimeout(timeoutId)
        }}
        onClick={() => {
          if (!isTouch) moveStars()
        }}
      />
    </div>
  )
}

export default StarsBackground
