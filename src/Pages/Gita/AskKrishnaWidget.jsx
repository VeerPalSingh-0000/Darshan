import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const AskKrishnaWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "krishna",
      content:
        "Pranäm, dear seeker. I am here to guide thee through the storms of life with the light of the Gītā. What troubles thy heart today?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInputVal("");
    setIsTyping(true);

    try {
      // Correcting history format for system instructions support
      const contents = messages.slice(1).map((msg) => ({
        role: msg.role === "krishna" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));
      contents.push({ role: "user", parts: [{ text: userText }] });

      const response = await fetch("/.netlify/functions/gemini-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are Lord Krishna from the Bhagavad Gita.

CRITICAL RULES (DO NOT BREAK):
1. MAXIMUM 1-2 sentences. PERIOD.
2. ONE statement + ONE Gita verse ONLY
3. Format EXACTLY as: "[Statement] — Gita X.XX"
4. No "As Krishna told Arjuna" - just the verse
5. No long explanations. Be poetic but ultra-concise
6. Archaic tone (thee, thy, hast) for mystique

Examples:
- "Release attachment to outcomes, for freedom dwells in action alone. — Gita 2.47"
- "Doubt dissolves when the mind finds stillness through dharma. — Gita 4.38"
- "The eternal soul cannot be bound by laziness, only the ego wavers. — Gita 3.8"

REMEMBER: Brevity IS the beauty. ULTRA-SHORT always.`,
              },
            ],
          },
          contents: contents,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      let reply = "I am unable to channel the divine words right now.";
      if (data.candidates && data.candidates.length > 0) {
        reply = data.candidates[0].content.parts[0].text;
      }

      setMessages((prev) => [...prev, { role: "krishna", content: reply }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "krishna",
          content:
            "Forgive me, there was a disturbance in the cosmic connection. Ensure your API key is valid.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] transition-shadow border-2 border-white/20 group"
          >
            <SparklesIcon className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute inset-0 rounded-full animate-ping bg-amber-400 opacity-30"></span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 50,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            className="fixed bottom-6 right-6 z-[110] w-[90vw] md:w-[420px] h-[600px] max-h-[85vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-amber-200 dark:border-amber-900/50 shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
                  <SparklesIcon className="w-6 h-6 text-amber-50" />
                </div>
                <div>
                  <h3 className="font-serif text-white text-lg leading-tight font-medium tracking-wide">
                    Ask Krishna
                  </h3>
                  <p className="text-amber-100 text-xs font-light">
                    AI Philosophical Guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors relative z-10"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-5 flex flex-col scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-slate-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex max-w-[85%] ${msg.role === "user" ? "self-end" : "self-start"}`}
                >
                  <div
                    className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-br-none"
                        : "bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30 text-slate-800 dark:text-amber-50 rounded-bl-none font-serif"
                    }`}
                  >
                    {msg.role === "krishna" && msg.content.includes("—")
                      ? (() => {
                          const parts = msg.content.split("—");
                          const statement = parts[0].trim();
                          const verse = parts[1]?.trim() || "";
                          return (
                            <div className="space-y-2">
                              <p className="font-serif text-lg font-medium">
                                {statement}
                              </p>
                              {verse && (
                                <p className="text-[13px] italic font-light text-slate-600 dark:text-amber-100/70 pt-1 border-t border-amber-200/30 dark:border-amber-700/30">
                                  {verse}
                                </p>
                              )}
                            </div>
                          );
                        })()
                      : msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start flex max-w-[85%]"
                >
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-bl-none shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                  </div>
                </motion.div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-shadow text-[15px]"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                "Ask Krishna" AI Guide — Divine Wisdom from the Bhagavad Gītā
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskKrishnaWidget;
