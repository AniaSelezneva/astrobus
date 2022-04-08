import React from "react"
import GlobalContextProvider, {
  initialState,
} from "./src/context/GlobalContextProvider.js"

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider value={initialState}>
      {element}
    </GlobalContextProvider>
  )
}

export const onClientEntry = () => {
  const subscribeUrl = process.env.GATSBY_SUBSCRIBE_URL

  if (!("serviceWorker" in navigator || !("PushManager" in window))) {
    // Service Worker or push isn't supported on this browser, disable or hide UI.
    return
  } else {
    // If permission is not granted, ask for it (browser will not ask if it's denied already).
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission == "granted") {
          console.log("Permission to send notifications received")

          // Subscribe to push messages from a server.
          navigator.serviceWorker.ready.then(registration => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                // public key
                applicationServerKey: `BK_dbgH7sTI103CEQVfZ2S2-0Vc5MpmN8FWtJczcEKKvoyigf1DXOAZpM102ufbCaao8WZuT9dMXhJITAwTMbL4`,
              })
              .then(subscription => {
                const endpoint = subscription.endpoint
                const { auth, p256dh } = subscription.toJSON().keys

                fetch(`${subscribeUrl}subscribe`, {
                  method: "POST",
                  mode: "cors",
                  body: JSON.stringify({
                    endpoint,
                    p256dh,
                    auth,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "same-origin",
                })
              })
          })
        } else {
          console.log("Permission to send notifications denied")
        }
      })
    }
  }
}
