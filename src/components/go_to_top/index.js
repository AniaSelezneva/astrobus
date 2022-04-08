import React, { useRef, useEffect } from "react"
import * as styles from "./styles.module.scss"

function Go_to_top() {
  const buttonRef = useRef()

  const showBtn = () => {
    buttonRef.current.style.animation = `${styles.fadein} 1s forwards`
    setTimeout(() => {
      buttonRef.current.style.display = "block"
    }, 1000)
  }

  const hideBtn = () => {
    buttonRef.current.style.animation = `${styles.fadeout} 1s forwards`
    setTimeout(() => {
      buttonRef.current.style.display = "none"
    }, 1000)
  }

  useEffect(() => {
    setInterval(() => {
      const distance = window.scrollY

      if (distance > 50) {
        showBtn()
      } else if (distance < 50) {
        hideBtn()
      }
    }, 500)
  }, [])

  return (
    <div>
      <button
        id={styles.wait_btn}
        ref={buttonRef}
        onClick={() => window.scrollTo(0, 0)}
      >
        up
      </button>
    </div>
  )
}

export default Go_to_top
