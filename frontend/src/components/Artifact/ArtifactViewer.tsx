import React from "react";

export default function ArtifactViewer({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="mt-8 border rounded-lg overflow-hidden shadow">
      <iframe
        className="w-full h-96"
        srcDoc={content}
        sandbox="allow-scripts allow-same-origin"
        title="Artifact Viewer"
      />
    </div>
  );
}
