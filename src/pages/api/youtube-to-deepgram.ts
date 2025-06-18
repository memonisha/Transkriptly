import type { NextApiRequest, NextApiResponse } from "next";
import youtubedl from "youtube-dl-exec";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing YouTube URL" });

  try {
    // Step 1: Use youtube-dl to get direct audio URL
    const info: any = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        "referer:youtube.com",
        "user-agent:googlebot"
      ]
    });

    const audioUrl = info?.url;
    if (!audioUrl) throw new Error("Audio URL not found");

    // Step 2: Send audio URL to Deepgram
    const dgRes = await fetch("https://api.deepgram.com/v1/listen", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: audioUrl }),
    });

    const dgData = await dgRes.json();

    const transcript = dgData?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    return res.status(200).json({ transcript });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to process" });
  }
}
