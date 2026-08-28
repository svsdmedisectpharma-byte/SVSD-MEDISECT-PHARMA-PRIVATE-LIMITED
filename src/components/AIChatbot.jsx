import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, Send, X, Sparkles, RefreshCw, AlertCircle, User, ShieldCheck, ChevronDown } from 'lucide-react';
import medicinesData from '../data/medicines.json';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I am the **Medisect AI Pharma Assistant**. I can help you with details about our DCGI-approved formulations, generic compositions, dosages, packaging, and therapeutic indications.\n\n*Note: Information is for trade & educational reference. Always consult a registered medical practitioner for prescription guidance.*',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    '💊 What antibiotics do you market?',
    '🧪 Details about MEDICLAV-625 LB',
    '❤️ Cardiac & Diabetic medicines',
    '📞 Trade & Sales Desk Contact',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    if (!customText) setInput('');
    setIsLoading(true);

    // Placeholder assistant message for streaming
    const assistantMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body received from server.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(dataStr);
              const token = parsed.choices?.[0]?.delta?.content || parsed.content || '';
              if (token) {
                streamedContent += token;
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = {
                    role: 'assistant',
                    content: streamedContent,
                  };
                  return newMsgs;
                });
              }
            } catch (err) {
              // Ignore partial JSON parse errors in SSE stream
            }
          } else if (trimmed && !trimmed.startsWith('data:')) {
            // Direct plain text chunk fallback
            streamedContent += trimmed;
            setMessages((prev) => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1] = {
                role: 'assistant',
                content: streamedContent,
              };
              return newMsgs;
            });
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = {
          role: 'assistant',
          content:
            '⚠️ *I am currently unable to reach the server API. Please ensure your `OPENROUTER_API_KEY` is configured in `.env` or contact our Trade Desk directly at +91 75874 32458.*',
        };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] max-h-[82vh] mb-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#0E5284]/20 shadow-[0_12px_40px_rgba(14,82,132,0.22)] flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#0E5284] to-[#0F753A] text-white flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm">
                  <span>Medisect AI Assistant</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/20 text-white font-normal">GPT-OSS</span>
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> WHO-GMP & DCGI Verified
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-[#1E3A52]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-[#0E5284]/10 border border-[#0E5284]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#0E5284]" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#0E5284] to-[#1A6BA8] text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-[#F0F4F8] border border-slate-200 text-[#1E3A52] rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.content || (isLoading && idx === messages.length - 1 ? (
                    <span className="flex items-center gap-1 text-[#5A7A91]">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0E5284]" />
                      Generating response...
                    </span>
                  ) : null)}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-[#0F753A]/10 border border-[#0F753A]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-[#0F753A]" />
                  </div>
                )}
              </div>
            ))}

            {/* Quick Suggestions (shown if only 1 message) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-bold text-[#5A7A91] uppercase tracking-wider px-1">Suggested Questions:</p>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="text-left px-3.5 py-2 rounded-xl bg-white border border-[#0E5284]/15 hover:border-[#0E5284]/40 hover:bg-[#E8F1F8] text-[#0E5284] font-semibold transition-all cursor-pointer text-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="px-4 py-1.5 bg-[#E8F1F8]/80 border-t border-b border-[#0E5284]/10 text-[10px] text-[#5A7A91] flex items-center gap-1.5 font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-[#0E5284] shrink-0" />
            <span>Consult a registered doctor for medical prescriptions.</span>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Medisect medicines..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#1E3A52] placeholder-[#5A7A91]/60 focus:outline-none focus:border-[#0E5284] transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#0F753A] hover:bg-[#0E5284] text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-green flex items-center gap-2.5 px-5 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_24px_rgba(15,117,58,0.35)] hover:scale-105 transition-all cursor-pointer group"
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5" />
            <span>Close AI Assistant</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
            </div>
            <span>AI Pharma Assistant</span>
          </>
        )}
      </button>
    </div>
  );
};
