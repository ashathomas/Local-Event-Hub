
import { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function VoiceSearch({ onSearch }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice search is not supported in this browser.");
      return;
    }

    setError("");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {

      const transcript = event.results[0][0].transcript
        .trim()
        .replace(/[.!?]+$/, "");

      onSearch(transcript);

      setError("");
    };

    recognition.onerror = () => {
      setError("Could not recognize your voice. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={startListening}
        disabled={listening}
        aria-label="Search events using your voice"
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-60"
      >
        {listening ? (
          <FaMicrophoneSlash />
        ) : (
          <FaMicrophone />
        )}

        {listening ? "Listening..." : "Voice Search"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default VoiceSearch;
