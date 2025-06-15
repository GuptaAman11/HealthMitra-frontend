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
      setRecommendedDoctors(filtered);
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
            {recommendedDoctors.map((doc) => (
              <div key={doc.id} className="border rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition">
                <img src={doc.avatar || '/avatar-placeholder.png'} alt={doc.name} className="w-20 h-20 rounded-full mb-3" />
                <h4 className="font-medium text-gray-800">{doc.name}</h4>
                <p className="text-gray-600 text-sm">{doc.specialization.join(', ')}</p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600">Book Now</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ChatBot;
