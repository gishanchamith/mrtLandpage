
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GoogleGenAI } from '@google/genai';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const aiRef = useRef<GoogleGenAI | null>(null);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I'm your MRT Moratuwa Assistant. How can I help you today? You can ask me about campus facilities, city landmarks, or research programs." }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage = prompt.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setPrompt('');
    setLoading(true);

    try {
      if (!aiRef.current) {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
          setMessages(prev => [...prev, { role: 'assistant', content: "Missing API key. Please set GEMINI_API_KEY in a .env file." }]);
          setLoading(false);
          return;
        }
        const { GoogleGenAI } = await import('@google/genai');
        aiRef.current = new GoogleGenAI({ apiKey });
      }

      const response = await aiRef.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are a specialized assistant for the Moratuwa community (likely University of Moratuwa or the City of Moratuwa in Sri Lanka). Provide helpful, concise, and professional information about the campus, engineering, architecture, city landmarks, or student life. Use a friendly and academic tone.",
        },
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-4 md:p-6 border-b border-slate-800">
          <h1 className="text-xl md:text-2xl font-black">
            mrt <span className="font-light text-slate-400">=</span>
          </h1>
        </div>
        <nav className="flex md:flex-col gap-2 p-3 md:p-4 overflow-x-auto md:overflow-visible">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 rounded-xl text-xs sm:text-sm font-semibold transition-all min-w-[140px] md:w-full">
            <i className="fa-solid fa-house"></i> Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-800 rounded-xl text-xs sm:text-sm font-medium transition-all text-slate-400 hover:text-white min-w-[140px] md:w-full">
            <i className="fa-solid fa-envelope"></i> Mail
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-800 rounded-xl text-xs sm:text-sm font-medium transition-all text-slate-400 hover:text-white min-w-[180px] md:w-full">
            <i className="fa-solid fa-calendar"></i> Academic Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-800 rounded-xl text-xs sm:text-sm font-medium transition-all text-slate-400 hover:text-white min-w-[140px] md:w-full">
            <i className="fa-solid fa-graduation-cap"></i> Courses
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-900/20 rounded-xl text-xs sm:text-sm font-medium text-red-400 transition-all min-w-[140px] md:w-full md:mt-auto"
          >
            <i className="fa-solid fa-sign-out-alt"></i> Logout
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-14 md:h-16 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">MRT AI Assistant</h2>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs md:text-sm">JD</div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">John Doe</span>
          </div>
        </header>

        {/* Content Area - Chat Interface */}
        <div className="flex-grow overflow-hidden flex flex-col p-3 sm:p-4 md:p-8 bg-slate-50">
          <div className="flex-grow bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
            
            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}>
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50">
              <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me anything about Moratuwa..."
                  className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-sm"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-800 text-white h-12 px-4 sm:w-12 flex items-center justify-center rounded-xl shadow-md transition-all disabled:opacity-50 text-sm"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                AI can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
