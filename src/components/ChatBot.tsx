import React, { useState, useEffect, useRef } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('Hinglish');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Setup speech recognition
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  const startListening = () => {
    if (recognition) recognition.start();
    else alert('Speech recognition not supported in this browser.');
  };

  const [currentText, setCurrentText] = useState<string | null>(null);

const speakText = async (text: string) => {
  // If same message is clicked again → toggle stop
  if (text === currentText && audioRef.current && !audioRef.current.paused) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsSpeaking(false);
    setCurrentText(null);
    return;
  }

  // If another audio is playing, stop it first
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  try {
    const response = await fetch('http://localhost:4567/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch TTS');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentText(text);

    audio.onplay = () => setIsSpeaking(true);
    audio.onpause = () => setIsSpeaking(false);
    audio.onended = () => {
      setIsSpeaking(false);
      setCurrentText(null);
      audioRef.current = null;
    };

    audio.play();
  } catch (error) {
    console.error('TTS Error:', error);
    setIsSpeaking(false);
  }
};

  
  
  

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4567/api/a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, language }),
      });

      const data = await res.json();
      const botReply = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botReply]);
      speakText(data.reply);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: '❌ Error contacting AI' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recognition) {
      recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    }
  }, [language]);

  const handleAnalyze = async () => {
    try {
      const res = await fetch("http://localhost:4567/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, language }),
      });
  
      const data = await res.json();
  
      if (!data || !data.suggestedDoctor) {
        alert("❌ Sorry, I couldn’t determine your issue. Please consult a general physician.");
        return;
      }
  
      alert(`📋 Summary:
  Doctor: ${data.suggestedDoctor}
  Urgency: ${data.urgency}
  Test Suggestion: ${data.testSuggestion}
  Reason: ${data.summary}
  
  ✅ You can now book an appointment.`);
      
      // You could also store it in a state and render a "Book" button conditionally
  
    } catch (err) {
      console.error("Analyze error:", err);
      alert("❌ Analysis failed. Try again.");
    }
  };
  
  

  return (
    <div className="max-w-xl mx-auto mt-8 border rounded-xl p-4 shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">🩺 AI Healthcare Chatbot</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Select Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Hinglish">Hinglish</option>
        </select>
      </div>

      <div className="h-64 overflow-y-auto border rounded mb-3 p-2 bg-gray-50">
      {messages.map((msg, idx) => (
  <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
    <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
      {msg.text}
    </div>
    {msg.sender === 'bot' && (
  <button
    onClick={() => speakText(msg.text)}
    className={`text-sm mt-1 ml-1 ${
      isSpeaking && currentText === msg.text
        ? 'text-red-600'
        : 'text-blue-600 hover:underline'
    }`}
  >
    {isSpeaking && currentText === msg.text ? '⏹️ Stop' : '🔊 Listen'}
  </button>
)}



  </div>
      ))}
      {messages.length > 1 && !loading && (
  <div className="text-center mt-2">
    <button
      onClick={handleAnalyze}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      🔍 Analyze Conversation
    </button>
  </div>
)}

        {loading && <div className="text-sm text-gray-500">Typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter symptoms or use mic..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
        <button
          onClick={startListening}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          disabled={isSpeaking}
        >
          🎙️
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
