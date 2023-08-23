# run-your-gpt
Repository for hiring of full stack role for gstudio.ai
# CHAT AI
# Chat Application with Authentication

This is a simple chat application with authentication built using React and React Router.

## Features

- User registration and login
- User authentication using hashed passwords stored in `localStorage`
- Chat interface where authenticated users can communicate
- WebSocket integration for real-time communication with the Gradio hosted socket

## Prerequisites

- Node.js and npm (or pnpm) installed
- A Gradio hosted socket URL (`VITE_WEB_SCOKET_URL`) for real-time communication

## Installation

1. Clone this repository:

   ```bash
   git clone [https://github.com/your-username/chat-application.git](https://github.com/SowreRajan-dev/run-your-gpt)
   cd chat_ai
2. Install dependencies using pnpm:
   ```bash
     pnpm install
3. Create a .env file in the root directory and set your Gradio hosted socket URL:
   ```bash
      VITE_WEB_SCOKET_URL=wss://your-gradio-socket-url.com
## Usage
1. Run the development server:
   ```bash
      pnpm run dev

2. Open your browser and navigate to http://localhost:5173.
3. If you're a new user, register using the registration page. Otherwise, log in with your credentials.
4. Once logged in, you'll be redirected to the chat interface, where you can exchange messages with other users.
5. To log out, click on the "Logout" button.
