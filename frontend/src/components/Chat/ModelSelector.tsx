import React from "react";

export default function ModelSelector() {
  return (
    <div className="flex gap-4 mt-4">
      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Local (Ollama)
      </button>
      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Cloud (Claude / OpenAI)
      </button>
    </div>
  );
}
