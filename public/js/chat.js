let user;
const chatBox = document.getElementById('chatBox');

const socket = io({
    autoConnect: false
})



Swal.fire({
    title: 'Welcome to the chat',
    text: 'Please enter your username',
    input: 'text',
    inputValidator: (value) => {
        if (!value) {
            return 'You need to write something!'
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then((result) => {
    username = result.value;
    socket.connect();
})

// Listeners
chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user:username,message:chatBox.value});
            chatBox.value="";

        }
    }
})

//listeners

socket.on('log',data=>{
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message=>{
        messages = messages+ `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})

socket.on('newUser',data=>{
    if(username){
        Swal.fire({
            text:"New user connected",
            toast: true,
            position: 'top-right',
        })

    }
})