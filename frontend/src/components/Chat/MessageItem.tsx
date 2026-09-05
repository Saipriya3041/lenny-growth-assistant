import React from "react";

export default function MessageItem({ message }: { message: string }) {
  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <p className="text-gray-800 whitespace-pre-line">{message}</p>
    </div>
  );
}
