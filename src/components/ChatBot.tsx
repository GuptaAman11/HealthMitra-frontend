import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToAI, analyzeConversation, fetchTTS } from '../hooks/aiApi';
import { useAllDoctors } from '../hooks/bookingHook';
import  bots  from '../data/bot';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type Doctor = {
  id: string;
  name: string;
  avatar?: string;
  specialization: string[];
};

function ChatBot() {
  const { doctors, loading: doctorsLoading, error } = useAllDoctors();
  const url = 'data:image/jpeg;base64,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'
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('Hinglish');
  const [selectedBotId, setSelectedBotId] = useState('');
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = useRef<any>(SpeechRecognition ? new SpeechRecognition() : null).current;

  useEffect(() => {
    if (recognition) {
      recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }, [language]);

  const startListening = () => {
    if (recognition) recognition.start();
    else alert('Speech recognition not supported');
  };

  const speakText = async (text: string) => {
    if (text === currentText && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      setCurrentText(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      const audioBlob = await fetchTTS(text , selectedBotId);
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
    } catch (err) {
      console.error('TTS Error:', err);
      setIsSpeaking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessageToAI(userMessage.text, language);
      const botMessage: Message = { sender: 'bot', text: response.reply };
      setMessages((prev) => [...prev, botMessage]);
      speakText(response.reply);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: '❌ Error contacting AI' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      const result = await analyzeConversation(messages, language);
      const spec = Array.isArray(result.suggestedDoctor)
        ? result.suggestedDoctor[0]
        : result.suggestedDoctor;

      setSpecialization(spec);
      const filtered = doctors.filter((doc) =>
        doc.specialization.join(' ').toLowerCase().includes(spec.toLowerCase())
      );
      setRecommendedDoctors(
        filtered.map((doc, i) => ({
          id: i.toString(),
          name: doc.name,
          avatar: doc.avatar,
          specialization: doc.specialization
        }))
      );
    } catch (err) {
      console.error('Analyze error:', err);
      alert('❌ Didnt find apporpriate solution Please specily more.');
    }
  };

  if (doctorsLoading) return <div>Loading doctors...</div>;
  if (error) return <div>Error loading doctors: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">🩺 AI Healthcare Chatbot</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded-lg px-3 py-2 bg-white w-full sm:w-auto">
            <option value="English">🌐 English</option>
            <option value="Hindi">🇮🇳 Hindi</option>
            <option value="Hinglish">🗣️ Hinglish</option>
          </select>
          <select value={selectedBotId} onChange={(e) => setSelectedBotId(e.target.value)} className="border rounded-lg px-3 py-2 bg-white w-full sm:w-auto">
            <option value="">🤖 Select Bot</option>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.id}>{bot.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Chat Area */}
      <div className="h-64 overflow-y-auto bg-white rounded-lg p-4 mb-4 shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </div>
            {msg.sender === 'bot' && (
              <button onClick={() => speakText(msg.text)} className="ml-2 text-blue-600 hover:text-blue-800">
                {isSpeaking && currentText === msg.text ? '⏹️' : '🔊'}
              </button>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-500 text-center">Typing...</p>}
        {messages.length > 1 && !loading && (
          <div className="text-center">
            <button onClick={handleAnalyze} className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 mt-2">
              🔍 Analyze Conversation
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your symptoms..." className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 ring-blue-300" />
        <button onClick={handleSend} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">Send</button>
        <button onClick={startListening} disabled={isSpeaking} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400">🎙️</button>
      </div>

      {/* Recommended Doctors */}
      {recommendedDoctors.length > 0 && (
        <section className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Recommended Doctors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedDoctors.slice(0, 3).map((doc) => (
            <div
                key={doc.id}
                className="border rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
                <img
                src={doc.avatar || url}
                alt={doc.name}
                className="w-20 h-20 rounded-full mb-3"
                />
                <h4 className="font-medium text-gray-800">{doc.name}</h4>
                <p className="text-gray-600 text-sm">{doc.specialization.join(', ')}</p>
            </div>
    ))}

          </div>
        </section>
      )}
    </div>
  );
}

export default ChatBot;
