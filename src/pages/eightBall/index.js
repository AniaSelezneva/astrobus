import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import * as styles from "./styles.module.scss"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js"
import answers from "../../utils/answers"
import Input from "./components/input"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function EightBall() {
  const canvas = useRef()
  const text = useRef()
  const [showMsg, setShowMsg] = useState(true)
  const [ballMoved, setBallMoved] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [questionAsked, setQuestionAsked] = useState(false)
  const [answer, setAnswer] = useState()
  const [loaded, setLoaded] = useState(false)

  const manager = new THREE.LoadingManager()

  function main() {
    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current })

    // Camera
    const fov = 80
    const aspect = 2
    const near = window.innerHeight / window.innerWidth
    const far = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 50

    // Controls
    const controls = new OrbitControls(camera, canvas.current)
    controls.target.set(0, 0, 0)
    controls.rotateSpeed = 0.3
    controls.update()
    controls.enableZoom = false
    controls.enableDamping = false
    controls.enablePan = false

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("rgb(75,187,188)")

    // Add 3d object
    const objLoader = new OBJLoader(manager)
    // Add ball with texture.
    const mtlLoader = new MTLLoader(manager)
    mtlLoader.load("/3d_models/8ball1.mtl", mtl => {
      mtl.preload()
      objLoader.setMaterials(mtl)
      objLoader.load("/3d_models/8ball1.obj", root => {
        scene.add(root)
      })
    })

    // Light
    {
      const renderer = new THREE.WebGLRenderer()
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap

      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-40, 30, 60)
      light.castShadow = true
      scene.add(light)
      scene.add(light.target)
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const pixelRatio = window.devicePixelRatio

      const width = (canvas.clientWidth * pixelRatio) | 0
      const height = (canvas.clientHeight * pixelRatio) | 0

      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    // Render
    function render() {
      if (canvas.current && resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.current.clientWidth / canvas.current.clientHeight
        camera.updateProjectionMatrix()
      }

      renderer.render(scene, camera)

      // Ball moved
      if (camera.position.x != 0 && camera.position.y != 0) {
        setBallMoved(true)
      }

      // Toggle show/hide message
      if (
        camera.position.y > -7 &&
        camera.position.y < 7 &&
        camera.position.x > -7 &&
        camera.position.x < 7
      ) {
        setShowMsg(true)
        setXOffset(Math.round(camera.position.x))
        setYOffset(Math.round(camera.position.y))
      } else {
        setShowMsg(false)
      }

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  useEffect(() => {
    main()
  }, [])

  // Show/hide message
  useEffect(() => {
    // Hide
    if (!showMsg) {
      text.current.animate(
        [
          // keyframes
          {
            transform: `scale(1)`,
            opacity: 1,
          },
          {
            transform: `scale(0)`,
            opacity: 0,
          },
        ],
        {
          // timing options
          duration: 200,
          easing: "linear",
          fill: "forwards",
        }
      )
    } else if (showMsg && ballMoved) {
      text.current.style.animation = "none"
      if (answer) {
        text.current.innerHTML = answer
      }
      // Show
      text.current.animate(
        [
          // keyframes
          {
            transform: `rotate(360deg) translate(${getRandomInt(
              10,
              50
            )}px, ${getRandomInt(10, 50)}px) 
        scale(0.5)`,
            opacity: 0,
          },
          {
            transform: `rotate(0deg) translate(${xOffset}px, ${yOffset}px) scale(1)`,
            opacity: 1,
          },
        ],
        {
          // timing options
          duration: 1000,
          easing: "linear",
          fill: "forwards",
        }
      )
    }
  }, [showMsg])

  // Change ball text to 'Turn me' after a question is asked.
  useEffect(() => {
    if (questionAsked) {
      text.current.innerHTML = "Turn me."
      setAnswer(answers[getRandomInt(0, answers.length - 1)])
      setQuestionAsked(false)
    }
  }, [questionAsked])

  manager.onLoad = () => {
    setLoaded(true)
  }

  // Removing touch-action inline property (only god knows where it comes from initially).
  useEffect(() => {
    canvas.current.style.removeProperty("touch-action")
  }, [])

  return (
    <div id={styles.wrapper}>
      {!loaded && (
        <div className={styles.cover}>
          <p>loading...</p>
        </div>
      )}
      {/* FORM */}
      <Input setQuestionAsked={setQuestionAsked} />

      <div className={styles.text} ref={text}>
        <p>Ask me something.</p>
      </div>

      <canvas ref={canvas} className={styles.canvas} />
    </div>
  )
}

export default EightBall
