import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recoginition: any = null;
if ("webkitSpeechRecognition" in window) {
  recoginition = new webkitSpeechRecognition();
  recoginition.lang = "en-US";
  recoginition.continous = true;
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recoginition) return;
    recoginition.onresult = (event: SpeechRecognitionEvent) => {
      setText(event.results[0][0].transcript);
      //     recoginition.stop();
      //   setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recoginition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recoginition.stop();
  };
  return {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport: !!recoginition,
  };
};
export default useSpeechRecognition;
