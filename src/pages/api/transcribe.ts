import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL in request body" });
  }

  try {
    const response = await fetch("https://api.deepgram.com/v1/listen", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),  // <== send URL in JSON body
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    const transcript = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    res.status(200).json({ transcript });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
