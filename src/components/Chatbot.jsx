import { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setTimeout(() => {
        const botMessage = { sender: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMessage]);
        setTyping(false);
      }, 800);
    } catch (err) {
      const errorMsg = { sender: "bot", text: "Erreur de connexion 😢" };
      setMessages((prev) => [...prev, errorMsg]);
      setTyping(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearMessages = () => setMessages([]);

  // Drag
  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className="fixed w-60 bg-white border shadow-lg rounded-xl flex flex-col text-sm"
      style={{ top: position.y, left: position.x }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <div
        className="p-2 flex justify-between items-center cursor-move bg-black text-white rounded-t-xl text-sm"
        onMouseDown={handleMouseDown}
      >
        <h3 className="font-semibold text-sm">Chatbot 💬</h3>
        <button
          onClick={clearMessages}
          className="text-pink-300 hover:text-pink-500 transition-colors text-xs"
        >
          Supprimer
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto h-48 flex flex-col gap-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`inline-block p-1 rounded-xl max-w-[70%] break-words transition-all duration-300
                ${
                  msg.sender === "user"
                    ? "bg-black text-white animate-fade-in text-xs"
                    : "bg-pink-100 text-pink-700 animate-fade-in text-xs"
                }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <span className="inline-block p-1 rounded-xl max-w-[70%] break-words bg-pink-100 text-pink-700 animate-fade-in italic text-xs">
              Bot est en train d’écrire...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-1 p-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-xs"
          placeholder="Écris ton message..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black text-white px-2 py-1 rounded-xl hover:bg-gray-800 transition-colors text-xs"
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
