/**
 * @typedef {Object} Message
 * @property {string} user - The user's name.
 * @property {string} content - The content of the message.
 * @property {string} created_at - The timestamp when the message was created.
 */

/**
 * @type {HTMLUListElement}
 */
const ul = document.getElementById('messages')

/**
 * @type {HTMLFormElement}
 */
const formElement = document.getElementById('form')

/**
 * @type {HTMLInputElement}
 */
const messageInput = document.getElementById('message')

/**
 * Add a message to the chat interface.
 * @param {Message} message - The message object containing user, content, and created_at properties.
 * @param {boolean} [mine=false] - Indicates if the message is sent by the user.
 */
const addMessage = (message, mine = false) => {
  const li = document.createElement('li')
  li.innerHTML = `<li class="flex items-start ${
    mine ? '' : 'flex-row-reverse text-end'
  } gap-2">
          <img
            src="./assets/pp.png"
            width="60"
            height="60"
            alt="Profile Picture"
            class="rounded-full w-[60px] aspect-square"
          />
          <div>
            <h2 class="font-bold text-lg">${message.user}</h2>
            <p class="text-gray-500">${message.content}</p>
            <span class="text-xs font-medium">${message.created_at}</span>
          </div>
        </li>`
  ul.appendChild(li)
}

/**
 * @type {SocketIOClient.Socket}
 */
const socket = io('http://localhost:4000')

socket.on('connect', () => {
  console.log(socket.id)
  console.log('Connected')
  formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value
    console.log(message)
    if (!message) return
    socket.emit('SEND_EXIST', message)
    console.log({
      user: socket.id,
      content: message,
      created_at: new Date().toLocaleString(),
    })
    addMessage(
      {
        user: socket.id,
        content: message,
        created_at: new Date().toLocaleString(),
      },
      true
    )
  })
  socket.on('disconnect', () => {
    console.log(socket.id)
    console.log('Disconnected')
  })

  socket.on('NEW_MESSAGE', (d) => {
    if (d.user === socket.id) return
    console.log('NEW_MESSAGE', d)
    addMessage(d)
  })
})
