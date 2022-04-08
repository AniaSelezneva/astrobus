self.addEventListener("push", event => {
  const { message, title, action } = event.data.json()

  self.registration.showNotification(title, {
    body: message,
    actions: [{ action, title: "continue reading" }],
  })
})

self.addEventListener("notificationclick", event => {
  event.waitUntil(clients.openWindow(event.action))
})
