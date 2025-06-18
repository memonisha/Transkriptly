'use client';
import { useState } from "react";
import { getTranscript } from "@/lib/transcribe";

export default function TranscribePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const output = await getTranscript(input);
    setResult(output);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Georgia, serif" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "1rem" }}>Transcribe YouTube Video 🎥</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste YouTube URL here..."
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginBottom: "1rem"
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Transcribing..." : "Transcribe"}
      </button>

      {result && (
        <>
          <div style={{
            marginTop: "24px",
            backgroundColor: "#f0f0f0",
            padding: "16px",
            borderRadius: "8px",
            color: "#333",
            fontFamily: "monospace",
            fontSize: "14px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word"
          }}>
            <strong>Transcript:</strong>
            <div>{result}</div>
          </div>

          <button
            onClick={handleDownload}
            style={{
              marginTop: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Download Transcript (.txt)
          </button>
        </>
      )}
    </div>
  );
}
