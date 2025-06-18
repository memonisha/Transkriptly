export async function getTranscript(input: string): Promise<string> {
  const res = await fetch("/api/youtube-to-deepgram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: input }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch transcript");
  }

  return data.transcript;
}
