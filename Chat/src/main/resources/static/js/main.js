'use strict';

// DOM Elements
const usernamePage = document.querySelector('#username-page');
const chatPage = document.querySelector('#chat-page');
const usernameForm = document.querySelector('#usernameForm');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#message');
const messageArea = document.querySelector('#messageArea');
const connectingElement = document.querySelector('.connecting');

let stompClient = null;
let username = null;

const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
];

/**
 * Connects the user to the chat server.
 */
const connect = (event) => {
    username = document.querySelector('#name').value.trim();

    if (username) {
        // Switch to chat page
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        // Initialize WebSocket connection
        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
};

/**
 * Called when successfully connected to the server.
 */
const onConnected = () => {
    // Subscribe to the public topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Notify the server about the new user
    stompClient.send(
        '/app/chat.addUser',
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    connectingElement.classList.add('hidden');
};

/**
 * Handles connection errors.
 */
const onError = () => {
    connectingElement.textContent =
        'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
};

/**
 * Sends a message to the server.
 */
const sendMessage = (event) => {
    const messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT',
        };

        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
        messageInput.value = ''; // Clear input
    }

    event.preventDefault();
};

/**
 * Handles incoming messages.
 */
const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    const messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = `${message.sender} joined!`;
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = `${message.sender} left!`;
    } else {
        messageElement.classList.add('chat-message');

        // Avatar
        const avatarElement = document.createElement('i');
        avatarElement.textContent = message.sender[0];
        avatarElement.style.backgroundColor = getAvatarColor(message.sender);
        messageElement.appendChild(avatarElement);

        // Username
        const usernameElement = document.createElement('span');
        usernameElement.textContent = message.sender;
        messageElement.appendChild(usernameElement);
    }

    // Message content
    const textElement = document.createElement('p');
    textElement.textContent = message.content;
    messageElement.appendChild(textElement);

    // Append to message area and scroll to bottom
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
};

/**
 * Generates a color for the user's avatar based on their username.
 */
const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (const char of messageSender) {
        hash = 31 * hash + char.charCodeAt(0);
    }
    return colors[Math.abs(hash % colors.length)];
};

// Event Listeners
usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
