import { useEffect, useState } from "react";

export function useChatStream(apiUrl: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(apiUrl);

    ws.onopen = () => {
      setConnected(true);
      console.log("✅ Connected to backend stream");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      setMessages((prev) => [...prev, data]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("❌ Disconnected from backend stream");
    };

    return () => ws.close();
  }, [apiUrl]);

  const sendMessage = (msg: string) => {
    const ws = new WebSocket(apiUrl);
    ws.onopen = () => ws.send(msg);
  };

  return { messages, connected, sendMessage };
}
