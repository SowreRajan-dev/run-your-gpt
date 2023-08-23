import { useEffect, useState } from "react";
import ChatArea from "../Components/ChatArea";

function ChatPage() {
  const [socket, setSocket] = useState<WebSocket | null>();
  useEffect(() => {
    // Establishing socket connection to gradio.
    establishWebSocketConnection();
  }, []);

  const establishWebSocketConnection = () => {
    const newSocket = new WebSocket(import.meta.env.VITE_WEB_SCOKET_URL);

    newSocket.onopen = () => {
      setSocket(newSocket);
    };

    newSocket.onclose = (event) => {
      console.error("WebSocket connection closed with code: ", event.code);
      // Attempt to reconnect after 5 seconds
      setTimeout(establishWebSocketConnection, 5000);
    };
  };
  return (
    <div className="">
      <ChatArea socketConn={socket} />
    </div>
  );
}

export default ChatPage;
