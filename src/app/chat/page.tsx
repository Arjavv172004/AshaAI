'use client';

import { useState, useRef, useEffect } from 'react';
import { Poppins, Ultra } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hello! I am ASHA, how may I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative bg-[#FCF5EB]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src="/bgvid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Chat Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#BA4B2F] bg-opacity-95 rounded-[2rem] overflow-hidden shadow-xl">
          {/* Chat Header */}
          <div className="p-6 text-center">
            <h1 className={`${ultra.className} text-4xl text-white`}>
              Hello! I am ASHA, how may I help you?
            </h1>
          </div>

          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="bg-white rounded-[2rem] mx-4 mb-4 p-6 h-[500px] overflow-y-auto flex flex-col gap-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${poppins.className} max-w-[80%] rounded-[1.5rem] px-6 py-3 
                    ${message.type === 'user' 
                      ? 'bg-[#BA4B2F] text-white' 
                      : 'bg-[#FCF5EB] text-[#BA4B2F]'
                    }`}
                >
                  {message.type === 'bot' ? (
                    <div>
                      {message.content.split(/\n|\r\n/).map((line, i) => {
                        // If the line starts with a bullet or dash, render as a list item
                        if (/^[-•\u2022]/.test(line.trim())) {
                          return (
                            <li key={i} style={{ marginLeft: '1.5em', listStyle: 'disc' }}>{line.replace(/^[-•\u2022]\s*/, '')}</li>
                          );
                        }
                        return line.trim() ? <div key={i}>{line}</div> : <br key={i} />;
                      })}
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${poppins.className} bg-[#FCF5EB] text-[#BA4B2F] rounded-[1.5rem] px-6 py-3 flex items-center gap-2`}>
                  <span>Typing</span>
                  <span className="typing-dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`${poppins.className} flex-1 px-6 py-3 rounded-full border-2 border-[#BA4B2F] focus:outline-none focus:border-[#a3442a] text-[#BA4B2F] placeholder-[#BA4B2F] placeholder-opacity-60`}
              />
              <button
                type="submit"
                className={`${ultra.className} px-8 py-3 bg-[#BA4B2F] text-white rounded-full hover:bg-[#a3442a] transition-colors`}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx global>{`
        .typing-dots {
          display: inline-block;
          margin-left: 2px;
        }
        .dot {
          display: inline-block;
          animation: blink 1.4s infinite both;
          font-weight: bold;
          font-size: 1.5em;
          line-height: 0;
          color: #BA4B2F;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </main>
  );
} 