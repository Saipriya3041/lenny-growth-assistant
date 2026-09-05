import { useState } from "react";

type Model = "ollama" | "cloud";
type Workspace = "chat" | "ship30" | "artifacts";

type Source = {
  id: number;
  episode: string;
  title: string;
  excerpt: string;
  score: string;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const sources: Source[] = [
  {
    id: 1,
    episode: "Episode 142",
    title: "How to Build Products People Love",
    excerpt:
      "Talk to customers continuously and use their problems to guide product decisions.",
    score: "94%",
  },
  {
    id: 2,
    episode: "Episode 98",
    title: "Product-Market Fit",
    excerpt:
      "The strongest growth loops begin with a product that solves an important problem.",
    score: "89%",
  },
  {
    id: 3,
    episode: "Episode 176",
    title: "Growth and Retention",
    excerpt:
      "Retention is often the foundation that makes sustainable growth possible.",
    score: "84%",
  },
];

function App() {
  const [workspace, setWorkspace] = useState<Workspace>("chat");
  const [model, setModel] = useState<Model>("ollama");
  const [input, setInput] = useState("");
  const [artifactOpen, setArtifactOpen] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    const question = input.trim();

    if (!question) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    /*
      TEMPORARY UI RESPONSE.

      Later replace this with:
      useChatStream()
      -> backend
      -> RAG retrieval
      -> Ollama / Cloud model
    */

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Based on the retrieved podcast context, the strongest recommendation is to start with customer problems rather than features. Talk to users continuously, identify repeated pain points, and validate the problem before investing heavily in a solution.",
        sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 600);
  };

  const newConversation = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="app-shell">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">L</div>

          <div>
            <div className="brand-name">
              Lenny
            </div>

            <div className="brand-subtitle">
              Growth Assistant
            </div>
          </div>
        </div>

        <button
          className="new-chat"
          onClick={newConversation}
        >
          <span>＋</span>
          New conversation
        </button>

        <div className="sidebar-section">
          <div className="section-label">
            WORKSPACE
          </div>

          <button
            className={`sidebar-item ${
              workspace === "chat" ? "active" : ""
            }`}
            onClick={() => setWorkspace("chat")}
          >
            <span>◉</span>
            Grounded Chat
          </button>

          <button
            className={`sidebar-item ${
              workspace === "ship30" ? "active" : ""
            }`}
            onClick={() => setWorkspace("ship30")}
          >
            <span>✎</span>
            Ship 30 for 30
          </button>

          <button
            className={`sidebar-item ${
              workspace === "artifacts" ? "active" : ""
            }`}
            onClick={() => setWorkspace("artifacts")}
          >
            <span>◇</span>
            Artifacts
          </button>
        </div>

        <div className="sidebar-section">
          <div className="section-label">
            KNOWLEDGE BASE
          </div>

          <div className="knowledge-card">
            <div className="knowledge-icon">
              ◈
            </div>

            <div>
              <strong>
                Lenny's Podcast
              </strong>

              <span>
                Transcript knowledge base
              </span>
            </div>
          </div>

          <div className="knowledge-stat">
            <span>Indexed transcripts</span>
            <strong>500+</strong>
          </div>

          <div className="knowledge-stat">
            <span>Vector database</span>
            <strong className="online">
              ● Online
            </strong>
          </div>
        </div>

        <div className="sidebar-section system-section">
          <div className="section-label">
            SYSTEM
          </div>

          <SystemStatus
            name="RAG Pipeline"
            status="Operational"
          />

          <SystemStatus
            name="PostgreSQL"
            status="Connected"
          />

          <SystemStatus
            name={model === "ollama" ? "Ollama" : "Cloud AI"}
            status="Active"
          />
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">
            S
          </div>

          <div>
            <strong>
              Workspace
            </strong>

            <span>
              Product & Growth
            </span>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* HEADER */}

        <header className="topbar">

          <div>
            <div className="page-title">
              {workspace === "chat"
                ? "Grounded Conversation"
                : workspace === "ship30"
                ? "Ship 30 for 30"
                : "Artifacts"}
            </div>

            <div className="page-description">
              {workspace === "chat"
                ? "Answers grounded in Lenny's Podcast transcripts"
                : workspace === "ship30"
                ? "Transform insights into high-retention essays"
                : "Generated Markdown and HTML artifacts"}
            </div>
          </div>

          <div className="topbar-actions">

            <div className="model-control">

              <span className="model-label">
                MODEL
              </span>

              <select
                value={model}
                onChange={(e) =>
                  setModel(e.target.value as Model)
                }
              >
                <option value="ollama">
                  Ollama · Local
                </option>

                <option value="cloud">
                  Cloud · Claude / OpenAI
                </option>
              </select>

              <span className="model-status">
                ●
              </span>

            </div>

            <button className="icon-button">
              ⚙
            </button>

          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <div className="content">

          {workspace === "chat" && (
            <ChatWorkspace
              messages={messages}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              artifactOpen={artifactOpen}
              setArtifactOpen={setArtifactOpen}
            />
          )}

          {workspace === "ship30" && (
            <ShipWorkspace />
          )}

          {workspace === "artifacts" && (
            <ArtifactWorkspace />
          )}

        </div>

      </main>
    </div>
  );
}

/* ==================================================
   CHAT WORKSPACE
================================================== */

function ChatWorkspace({
  messages,
  input,
  setInput,
  sendMessage,
  artifactOpen,
  setArtifactOpen,
}: {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  artifactOpen: boolean;
  setArtifactOpen: (value: boolean) => void;
}) {
  return (
    <div className="workspace-grid">

      <section className="chat-panel">

        {messages.length === 0 ? (
          <div className="welcome">

            <div className="welcome-mark">
              ✦
            </div>

            <div className="eyebrow">
              RETRIEVAL-AUGMENTED GROWTH INTELLIGENCE
            </div>

            <h1>
              What do you want to
              <br />
              <span>learn from Lenny?</span>
            </h1>

            <p>
              Ask questions about product strategy, growth,
              retention, user research, positioning and more.
              Every answer is grounded in retrieved podcast transcripts.
            </p>

            <div className="example-grid">

              <ExampleCard
                icon="🎯"
                title="Product strategy"
                text="How should I prioritize product opportunities?"
                setInput={setInput}
              />

              <ExampleCard
                icon="📈"
                title="Growth"
                text="What are the most effective growth loops?"
                setInput={setInput}
              />

              <ExampleCard
                icon="👥"
                title="User research"
                text="How should I interview users effectively?"
                setInput={setInput}
              />

              <ExampleCard
                icon="🔁"
                title="Retention"
                text="How can I improve product retention?"
                setInput={setInput}
              />

            </div>

          </div>
        ) : (

          <div className="messages">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`message-row ${message.role}`}
              >

                <div className="message-avatar">
                  {message.role === "assistant"
                    ? "✦"
                    : "S"}
                </div>

                <div className="message-body">

                  <div className="message-role">
                    {message.role === "assistant"
                      ? "LENNY"
                      : "YOU"}
                  </div>

                  <div className="message-text">
                    {message.content}
                  </div>

                  {message.sources && (
                    <div className="sources">

                      <div className="sources-heading">
                        <span>
                          ◈
                        </span>

                        Retrieved sources

                        <span className="source-count">
                          {message.sources.length}
                        </span>
                      </div>

                      {message.sources.map((source) => (
                        <SourceCard
                          key={source.id}
                          source={source}
                        />
                      ))}

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

        <div className="composer-area">

          <div className="composer">

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Lenny about product growth..."
            />

            <div className="composer-bottom">

              <div className="composer-info">
                <span>
                  ◈
                </span>

                RAG enabled

                <span className="divider">
                  |
                </span>

                Transcript grounded
              </div>

              <button
                className="send"
                onClick={sendMessage}
                disabled={!input.trim()}
              >
                ↑
              </button>

            </div>

          </div>

          <div className="composer-note">
            Answers are generated only from retrieved podcast context.
          </div>

        </div>

      </section>

      {artifactOpen && (
        <aside className="artifact-panel">

          <div className="artifact-header">

            <div>
              <div className="artifact-title">
                Artifact
              </div>

              <div className="artifact-subtitle">
                Generated output
              </div>
            </div>

            <button
              onClick={() => setArtifactOpen(false)}
              className="close-button"
            >
              ×
            </button>

          </div>

          <div className="artifact-tabs">

            <button className="selected">
              Preview
            </button>

            <button>
              Markdown
            </button>

            <button>
              HTML
            </button>

          </div>

          <div className="artifact-preview">

            <div className="preview-empty">

              <div className="preview-icon">
                ◇
              </div>

              <strong>
                No artifact generated
              </strong>

              <p>
                Ask Lenny a question and generate
                a Ship 30 for 30 essay or artifact.
              </p>

            </div>

          </div>

          <div className="artifact-footer">

            <span>
              Sandbox
            </span>

            <span className="secure">
              ● Secure
            </span>

          </div>

        </aside>
      )}

      {!artifactOpen && (
        <button
          className="open-artifact"
          onClick={() => setArtifactOpen(true)}
        >
          ◇ Artifact
        </button>
      )}

    </div>
  );
}

/* ==================================================
   SHIP 30 WORKSPACE
================================================== */

function ShipWorkspace() {
  return (
    <div className="ship30">

      <div className="ship-header">

        <div className="ship-icon">
          ✎
        </div>

        <div>

          <div className="eyebrow">
            CONTENT ENGINE
          </div>

          <h1>
            Ship 30 for 30
          </h1>

          <p>
            Turn a grounded insight into a high-retention,
            approximately 1,250-word essay.
          </p>

        </div>

      </div>

      <div className="ship-grid">

        <div className="ship-card">

          <label>
            SOURCE INSIGHT
          </label>

          <textarea
            placeholder="Paste or select a grounded insight from your Lenny conversation..."
          />

        </div>

        <div className="ship-card">

          <label>
            ESSAY STRUCTURE
          </label>

          <div className="structure-list">

            <StructureItem
              number="01"
              title="Hook"
              text="Create an attention-grabbing opening"
            />

            <StructureItem
              number="02"
              title="Core idea"
              text="Explain the central insight"
            />

            <StructureItem
              number="03"
              title="Evidence"
              text="Support the idea with examples"
            />

            <StructureItem
              number="04"
              title="Action"
              text="Give readers practical steps"
            />

            <StructureItem
              number="05"
              title="Closing"
              text="End with a memorable takeaway"
            />

          </div>

        </div>

      </div>

      <button className="generate-button">
        ✦ Generate 1,250-word essay
      </button>

    </div>
  );
}

/* ==================================================
   ARTIFACT WORKSPACE
================================================== */

function ArtifactWorkspace() {
  return (
    <div className="artifact-full">

      <div className="artifact-full-header">

        <div>
          <div className="eyebrow">
            ARTIFACT VIEWER
          </div>

          <h1>
            Generated Artifacts
          </h1>

          <p>
            Securely render Markdown and HTML generated by the assistant.
          </p>
        </div>

        <div className="sandbox-badge">
          ● Sandboxed
        </div>

      </div>

      <div className="artifact-large">

        <div className="artifact-large-toolbar">
          <span>
            Untitled artifact
          </span>

          <div>
            <button>Preview</button>
            <button>Markdown</button>
            <button>HTML</button>
          </div>
        </div>

        <div className="artifact-large-body">

          <div className="empty-artifact">
            <div>
              ◇
            </div>

            <strong>
              Your artifact will appear here
            </strong>

            <span>
              Generate an essay, framework, or HTML experience
              from a grounded conversation.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

/* ==================================================
   SMALL COMPONENTS
================================================== */

function SystemStatus({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="system-status">

      <span className="system-dot">
        ●
      </span>

      <span>
        {name}
      </span>

      <small>
        {status}
      </small>

    </div>
  );
}

function ExampleCard({
  icon,
  title,
  text,
  setInput,
}: {
  icon: string;
  title: string;
  text: string;
  setInput: (value: string) => void;
}) {
  return (
    <button
      className="example-card"
      onClick={() => setInput(text)}
    >

      <span className="example-icon">
        {icon}
      </span>

      <span className="example-content">

        <strong>
          {title}
        </strong>

        <span>
          {text}
        </span>

      </span>

      <span className="example-arrow">
        ↗
      </span>

    </button>
  );
}

function SourceCard({
  source,
}: {
  source: Source;
}) {
  return (
    <div className="source-card">

      <div className="source-top">

        <span className="source-episode">
          {source.episode}
        </span>

        <span className="source-score">
          {source.score} match
        </span>

      </div>

      <strong>
        {source.title}
      </strong>

      <p>
        {source.excerpt}
      </p>

    </div>
  );
}

function StructureItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="structure-item">

      <span className="structure-number">
        {number}
      </span>

      <div>
        <strong>
          {title}
        </strong>

        <span>
          {text}
        </span>
      </div>

    </div>
  );
}

export default App;