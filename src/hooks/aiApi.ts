// src/api/chatbotApi.ts
const base_url = import.meta.env.VITE_AI_BACKEND_BASE_URL || 'http://localhost:4567';

export const sendMessageToAI = async (message: string, language: string) => {
    const res = await fetch(`${base_url}/api/a`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
    });
    if (!res.ok) throw new Error('Failed to contact AI');
    return res.json();
  };
  
  export const analyzeConversation = async (
    messages: { sender: string; text: string }[],
    language: string
  ) => {
    const res = await fetch(`${base_url}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
    });
    if (!res.ok) throw new Error('Failed to analyze conversation');
    return res.json();
  };
  
  export const fetchTTS = async (text: string , id:string) => {
    const res = await fetch(`${base_url}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text , id }),
    });
    if (!res.ok) throw new Error('Failed to fetch TTS audio');
    return res.blob();
  };
  