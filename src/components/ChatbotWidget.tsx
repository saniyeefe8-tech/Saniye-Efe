import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Minimize2, 
  MessageSquare,
  HelpCircle,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { ChatMessage } from '../types';
import { CHAT_QUICK_QUESTIONS } from '../data/initialData';

interface ChatbotWidgetProps {
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  externalPrompt,
  onClearExternalPrompt,
  isOpen,
  onToggleOpen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      text: 'Merhaba! Ben Saniye Öğretmen’in Bilişim ve Robotik Asistanıyım. 5. ve 6. sınıf bilişim dersleri, Mblock kod blokları, donanım veya algoritmalar hakkında ne sormak istersin?',
      timestamp: 'Şimdi',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external prompts (e.g. from buttons on the page)
  useEffect(() => {
    if (externalPrompt) {
      if (!isOpen) onToggleOpen();
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      // Send message history to API
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
          grade: '5. ve 6. Sınıf',
        }),
      });

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Cevap alınamadı, lütfen tekrar sorunuz.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.warn('Chat request failed, fallback message used:', error);
      const fallbackBotMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: 'Mblock blokları ve bilişim konularında sana yardımcı olmaya hazırım! Yeşil bayrak olayları, döngüler ve algoritmalar hakkında dilediğini sorabilirsin.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackBotMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        text: 'Sohbet temizlendi. 5. veya 6. sınıf bilişim dersleriyle ilgili yeni bir soru sorabilirsin!',
        timestamp: 'Şimdi',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button (when closed) */}
      {!isOpen && (
        <button
          id="chatbot-launcher-btn"
          onClick={onToggleOpen}
          aria-label="Sohbet Botunu Aç"
          className="relative group flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl shadow-blue-600/35 hover:scale-105 transition-all duration-200 cursor-pointer border border-blue-400/30"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white/20 p-0.5 overflow-hidden border border-white/40">
              <img
                src="/assets/teacher_avatar.jpg"
                alt="Saniye Öğretmen"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1">
              <span>Bilişim Asistanı</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            </div>
            <div className="text-[10px] text-blue-100">Soru sormak için tıkla</div>
          </div>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[380px] md:w-[420px] h-[560px] max-h-[82vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 p-0.5 overflow-hidden border border-white/30 shadow-xs">
                <img
                  src="/assets/teacher_avatar.jpg"
                  alt="Saniye Öğretmen"
                  className="w-full h-full object-cover rounded-[14px]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-blue-700 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Bilişim & Kodlama Asistanı</span>
                </h3>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span>Saniye Hoca AI Rehberi</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-medium">Çevrimiçi</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Sohbeti Temizle"
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                id="chatbot-minimize-btn"
                onClick={onToggleOpen}
                title="Kapat"
                className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-xs shadow-2xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[11px] text-slate-400">Öğretmen asistanı yanıt hazırlıyor...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 px-1 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-blue-500" />
              <span>Hızlı Sorular</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CHAT_QUICK_QUESTIONS.slice(0, 4).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              id="chatbot-input-field"
              placeholder="Bilişim veya kodlama hakkında sor..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <button
              id="chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || loading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              aria-label="Gönder"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
