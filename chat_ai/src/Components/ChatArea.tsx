import { BsFillMicFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { useEffect, useState } from "react";

interface Message {
  message: string;
  isUser: boolean;
}

interface ChatAreaProps {
  socketConn: WebSocket | null | undefined;
}

function ChatArea({ socketConn }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [botMessage, setBotMessage] = useState<string>("");

  useEffect(() => {
    if (!socketConn) return;
    if (socketConn && socketConn.readyState === WebSocket.OPEN) {
      console.log("Connected");
    } else {
      console.log("Error connecting socket");
    }
  }, [socketConn]);

  const sendMessage = () => {
    if (socketConn) {
      try {
        const request = {
          prompt: newMessage,
          max_new_tokens: 250,
          auto_max_new_tokens: false,
          history: history,
          mode: "chat-instruct", // Valid options: 'chat', 'chat-instruct', 'instruct'
          character: "Example",
          instruction_template: "Vicuna-v1.1", //Will get autodetected if unset
          your_name: "You",
          //# 'name1': 'name of user', ////# Optional
          //# 'name2': 'name of character', ////# Optional
          //# 'context': 'character context', ////# Optional
          greeting: "greeting", ////# Optional
          //# 'name1_instruct': 'You', ////# Optional
          //# 'name2_instruct': 'Assistant', ////# Optional
          //# 'context_instruct': 'context_instruct', ////# Optional
          //# 'turn_template': 'turn_template', ////# Optional
          regenerate: false,
          _continue: false,
          chat_instruct_command:
            'Continue the chat dialogue below. Write a single reply for the character "<|character|>".\n\n<|prompt|>',
          // # Generation params. If 'preset' is set to different than 'None', the values
          // # in presets/preset-name.yaml are used instead of the individual numbers.
          preset: "None",
          do_sample: true,
          temperature: 0.7,
          top_p: 0.1,
          typical_p: 1,
          epsilon_cutoff: 0, //# In units of 1e-4
          eta_cutoff: 0,
          tfs: 1,
          top_a: 0,
          repetition_penalty: 1.18,
          repetition_penalty_range: 0,
          top_k: 40,
          min_length: 0,
          no_repeat_ngram_size: 0,
          num_beams: 1,
          penalty_alpha: 0,
          length_penalty: 1,
          early_stopping: false,
          mirostat_mode: 0,
          mirostat_tau: 5,
          mirostat_eta: 0.1,
          guidance_scale: 1,
          negative_prompt: "",
          seed: -1,
          add_bos_token: true,
          truncation_length: 2048,
          ban_eos_token: false,
          skip_special_tokens: true,
          stopping_strings: [],
        };

        socketConn.send(JSON.stringify(request));
      } catch (err) {
        console.log("error ", err);
      }
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const userMessage: Message = { message: newMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    sendMessage();
    if (socketConn) {
      socketConn.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.event === "text_stream") {
          const message = response.text;
          setBotMessage((prev) => (prev += message));
        }
        return () => {
          socketConn?.close();
        };
      };
    }
    const botMessages: Message = {
      message: botMessage,
      isUser: false,
    };
    setMessages((prev) => [...prev, botMessages]);
    setBotMessage("");
  };

  // const handleSendMessage = () => {
  //   if (newMessage.trim() === "") return;
  //   const userMessage: Message = { message: newMessage, isUser: true };
  //   setMessages([...messages, userMessage]);
  //   setNewMessage("");
  //   sendMessage();
  //   socketConn.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     console.log(response);
  //     if (response.event === "new") {
  //       const botMessage: Message = {
  //         message: response.data.text,
  //         isUser: false,
  //       };
  //       setMessages((prev) => [...prev, botMessage]);
  //     }
  //     return () => {
  //       socketConn?.close();
  //     };
  //   };
  //   // setMessages((prev) => [...prev, botMessage]);
  // };
  return (
    <div className="">
      <div className="flex flex-1 h-[calc(100vh-5rem)] p-10 relative">
        {messages.length > 0 ? (
          <div className="w-full overflow-y-auto relative">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.isUser ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`p-2 rounded-lg ${
                    message.isUser
                      ? "bg-blue-500 text-white mt-2 inline-block max-w-[70%]"
                      : "bg-gray-100 text-gray-700 mt-2 inline-block max-w-[70%]"
                  }`}
                >
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-lg font-poppins">Please post your query</p>
          </div>
        )}
      </div>

      {/* Input area */}

      <div className="flex flex-1 items-center justify-center  h-[5rem]">
        <div className="w-[80%] h-[2.5rem] flex items-center justify-center border border-black p-5 rounded-lg ">
          <input
            type="text"
            placeholder="Type new questions"
            className="w-full h-full p-5 focus:outline-none font-poppins"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <BsFillMicFill className="cursor-pointer mr-5" />
          <BiSend className="cursor-pointer" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
