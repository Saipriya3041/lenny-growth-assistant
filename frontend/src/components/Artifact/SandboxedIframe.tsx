import React, { useRef, useEffect } from "react";

interface SandboxedIframeProps {
  html: string;
}

const SandboxedIframe: React.FC<SandboxedIframeProps> = ({ html }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title="artifact-preview"
      sandbox="allow-same-origin"
      className="w-full h-96 border rounded-md"
    />
  );
};

export default SandboxedIframe;
