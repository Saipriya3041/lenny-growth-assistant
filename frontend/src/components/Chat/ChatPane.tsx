"use client";
import React, { useState } from "react";
import ModelSelector from "./ModelSelector";
import MessageItem from "./MessageItem";
import ArtifactViewer from "../Artifact/ArtifactViewer";
import { queryBackend } from "../../lib/api";
import { useChatStream } from "../../hooks/useChatStream";

export default function ChatPane() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [artifact, setArtifact] = useState("");
  const [loading, setLoading] = useState(false);

  const { messages, connected } = useChatStream("ws://localhost:8000/ws");

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const data = await queryBackend(question);
      setAnswer(data.answer);
      setArtifact(`<h2>${question}</h2><p>${data.answer}</p>`);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("⚠️ Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mt-4">
        Lenny Growth Assistant
      </h1>

      <ModelSelector />

      <div className="flex flex-col items-center">
        <input
          className="border p-3 rounded w-full max-w-xl mt-6 shadow-sm"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about growth strategies..."
        />
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={askQuestion}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {connected && (
        <p className="text-green-600 text-center">Connected to backend ✅</p>
      )}

      {answer && <MessageItem message={answer} />}
      {artifact && <ArtifactViewer content={artifact} />}

      {messages.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Live Stream:</h2>
          {messages.map((msg, i) => (
            <MessageItem key={i} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}
