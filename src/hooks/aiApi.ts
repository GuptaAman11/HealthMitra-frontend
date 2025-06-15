// src/api/chatbotApi.ts

export const sendMessageToAI = async (message: string, language: string) => {
    const res = await fetch('http://localhost:4567/api/a', {
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
    const res = await fetch('http://localhost:4567/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
    });
    if (!res.ok) throw new Error('Failed to analyze conversation');
    return res.json();
  };
  
  export const fetchTTS = async (text: string , id:string) => {
    const res = await fetch('http://localhost:4567/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text , id }),
    });
    if (!res.ok) throw new Error('Failed to fetch TTS audio');
    return res.blob();
  };
  