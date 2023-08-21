import { useEffect, useState } from "react";
import ChatArea from "../Components/ChatArea";

function ChatPage() {
  const [socket, setSocket] = useState<WebSocket | null>();
  useEffect(() => {
    // Establishing socket connection to gradle.
    const newSocket = new WebSocket(import.meta.env.VITE_WEB_SCOKET_URL);
    setSocket(newSocket);
  }, []);
  return (
    <div className="">
      <ChatArea socketConn={socket} />
    </div>
  );
}

export default ChatPage;
