# 🗨️ Chat Application

> A **real-time chat application** built to connect people instantly through WebSocket communication. Lightweight, fast, and user-friendly for seamless conversations!

---

## 🚀 Features

### 💬 Real-Time Messaging
- Powered by **Spring WebSocket**, ensuring low-latency communication.

### 👥 Group Chats
- Create and join chat rooms for collaborative conversations.

### 🎨 Sleek User Interface
- Designed to provide an intuitive and responsive experience for both desktop and mobile users.

### 🔔 Notifications
- Receive updates for new messages in real-time.

---

## 🛠️ Technologies Used

| **Backend**        | **Frontend**         | **Communication**    |
|---------------------|----------------------|----------------------|
| **Spring Boot**     | Basic HTML/CSS/JS    | **WebSocket Protocol** |
| **Spring WebSocket**| Optional: React.js   | Full-Duplex Messaging |

---

## 🖥️ Getting Started

### ⚙️ Prerequisites
1. Java 17+ installed.
2. Node.js 16+ installed (optional for React frontends).
3. A basic knowledge of WebSocket communication.

---

### 📥 Installation

1. Clone the repository:
   git clone https://github.com/Dachev1/Chat-Application.git
   cd Chat-Application

3. Build the backend:
./mvnw clean install

4. Run the Spring Boot server:
./mvnw spring-boot:run

5. (Optional) Start the frontend:
If using React, navigate to the frontend directory and run:

npm install
npm start

Access the application at http://localhost:8080.

🎯 How It Works
User Connection:

Users connect to the WebSocket server through an endpoint.
Messaging:

Messages are broadcast in real-time to all participants in a room.
Room Management:

Dynamic creation of chat rooms for group interactions.

🤝 Contributing
We welcome contributions! To get started:

Fork this repository.
Create a feature branch: git checkout -b feature/YourFeature.
Commit your changes: git commit -m "Add YourFeature".
Push to the branch: git push origin feature/YourFeature.
Submit a pull request.

🛡️ License
This project is licensed under the MIT License. See the LICENSE file for details.

🌟 Acknowledgements
Spring Framework for its robust WebSocket support.
The open-source community for continuous inspiration and support.

Let’s chat! 🗨️
