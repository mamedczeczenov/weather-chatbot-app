import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCF5leYvrZ6iHmo6j7oI_Jc6k4XyDrLK-A");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GeminiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const result = await model.generateContent(input);
      const reply = result.response.text();

      // Add bot reply
      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Error: Could not get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatbox}>
      <h2>💬 Gemini AI Chat</h2>
      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#0078ff" : "#444",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading} style={styles.button}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatbox: {
    maxWidth: 400,
    margin: "20px auto",
    background: "#222",
    color: "white",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    height: 500,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 10,
  },
  message: {
    padding: "8px 12px",
    borderRadius: 8,
    maxWidth: "80%",
  },
  inputBox: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "none",
    outline: "none",
  },
  button: {
    background: "#0078ff",
    border: "none",
    color: "white",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
  },
};
