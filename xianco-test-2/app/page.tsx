/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="not-prose bg-gray-900 text-gray-50 rounded-lg overflow-hidden my-2 border border-gray-700">
      <div className="flex justify-between items-center px-3 py-1.5 bg-gray-800/50 border-b border-gray-700/50">
        <span className="text-xs text-gray-400 font-mono">Code</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-gray-700/50"
          title="Salin kode"
        >
          {isCopied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Disalin!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Salin
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre ref={preRef} className="m-0 font-mono text-xs sm:text-sm">{children}</pre>
      </div>
    </div>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    // Tambahkan pesan pengguna dan placeholder AI secara optimis
    setMessages(prev => [
      ...prev,
      { role: 'user', content: userMessage },
      { role: 'ai', content: '' }
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({ error: 'Gagal membaca respons error dari server.' }));
        throw new Error(errorData.error || 'Terjadi kesalahan pada server.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setMessages(prev => {
          // Ambil pesan terakhir (placeholder AI) dan tambahkan chunk baru
          const lastMessage = prev[prev.length - 1];
          const updatedLastMessage = {
            ...lastMessage,
            content: lastMessage.content + chunk,
          };
          // Ganti placeholder dengan pesan yang sudah diupdate
          return [...prev.slice(0, -1), updatedLastMessage];
        });
      }
    } catch (error: any) {
      console.error(error);
      // Update placeholder AI dengan pesan error
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        const updatedLastMessage = { ...lastMessage, content: `Terjadi kesalahan: ${error.message}` };
        return [...prev.slice(0, -1), updatedLastMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          ✨ AI Assistant
        </h1>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Hapus Chat
          </button>
        )}
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
              <p className="text-lg font-medium">Halo! Ada yang bisa saya bantu?</p>
              <p className="text-sm mt-2">Ketik pesan Anda di bawah untuk memulai.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-5 py-3 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Styling untuk paragraf agar tidak terlalu rapat
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    // Styling untuk list
                    ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    // Styling untuk blok kode (Code Block)
                    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                    // Styling untuk kode inline (seperti `ini`)
                    code: ({ node, className, children, ...props }: any) => {
                      const { inline } = props;
                      return inline ? (
                        <code className={`${msg.role === 'user' ? 'bg-blue-700 text-blue-100' : 'bg-gray-100 text-red-500'} px-1 py-0.5 rounded font-mono text-sm`} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="bg-transparent text-inherit font-mono" {...props}>{children}</code>
                      );
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan Anda..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}