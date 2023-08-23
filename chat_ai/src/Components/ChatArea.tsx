import { BsFillMicFill, BsStopFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { useEffect, useState } from "react";
import useWhisper from "@chengsokdara/use-whisper";
import useSpeechRecognition from "../Hooks/useSpeechRecognition";

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
  const [messageCount, setMessageCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [botMessageLoading, setBotMessageLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { isSignedIn: false }
  );
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const {
    hasRecognitionSupport,
    isListening,
    startListening,
    stopListening,
    text,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!socketConn) return;
    if (socketConn && socketConn.readyState === WebSocket.OPEN) {
      console.log("Connected");
      setSocketConnected(true);
    } else {
      console.log("Error connecting socket");
    }
  }, []);

  useEffect(() => {
    if (text.length > 0) {
      setNewMessage((prev) => prev + " " + text);
      setShowPopup(false);
    }
  }, [text]);
  useEffect(() => {
    if (socketConn) {
      let accumulatedText = "";

      socketConn.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.event === "text_stream") {
          const message = response.text;
          accumulatedText += message;

          if (message.trim() !== "" && message.endsWith(".")) {
            setBotMessageLoading(false);
            const botResponse = {
              message: accumulatedText,
              isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);

            // Reset the accumulated text
            accumulatedText = "";
          }
        }
      };
    }

    // return () => {
    //   socketConn?.close();
    // };
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
    if (messageCount >= 25) {
      return;
    }
    const userMessage: Message = { message: newMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setMessageCount((prevCount) => prevCount + 1);

    sendMessage();
  };

  return (
    <div className="">
      <div className="flex flex-1 h-[calc(100vh-5rem)] p-10 relative">
        {messages.length > 0 ? (
          <div className="w-full overflow-y-auto relative p-5  scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-rounded-md scrollbar-track-gray-100 ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.isUser ? "text-right" : ""}`}
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
            {/* Conditionally render the loading screen */}
            {botMessageLoading && (
              <div className="flex justify-center items-center h-16">
                <p>Loading...</p>
              </div>
            )}
            {!botMessageLoading && botMessage && (
              <div className="mb-2 text-right">
                <p className="p-2 rounded-lg bg-gray-100 text-gray-700 mt-2 inline-block max-w-[70%]">
                  {botMessage}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-lg font-poppins">Please post your query</p>
          </div>
        )}
      </div>

      {/* Input area */}

      <div className="flex flex-1 items-center justify-center  h-[5rem]">
        <div className="w-[80%] h-[2.5rem] flex items-center justify-center border relative border-black p-5 rounded-lg ">
          <input
            type="text"
            placeholder="Type new questions"
            className={`w-full h-full p-5 focus:outline-none font-poppins ${
              user.isSignedin ? "" : "cursor-not-allowed"
            }`}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            onKeyDown={(e) => {
              if (newMessage.length > 0 && e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={user.isSignedin ? false : true}
          />
          <BsFillMicFill
            className="cursor-pointer mr-5"
            onClick={togglePopup}
          />
          {showPopup && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-5">
                <div className="text-lg font-semibold mb-3">
                  {isListening ? "Recording..." : "Click to start Recording"}
                </div>
                <button
                  className="btn px-5 py-2 mx-1"
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? <BsStopFill /> : <BsFillMicFill />}
                </button>
                <button className="btn px-5 py-2 mx-1" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
          <BiSend className="cursor-pointer" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
