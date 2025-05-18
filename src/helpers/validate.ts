import axios, { AxiosError } from "axios";

export const validate = async (apikey: string): Promise<boolean> => {
  if (!apikey) return false;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: "Hi" }],
      },
    ],
  };

  try {
    await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(`✅ Valid key: ${apikey.slice(0, 10)}...`);
    return true;
  } catch (err) {
    const error = err as AxiosError;

    const reason =
      (error.response?.data as { error?: { message?: string } })?.error?.message ||
      error.message ||
      "Unknown error";

    console.error(`❌ Invalid key: ${apikey.slice(0, 10)}...`, reason);
    return false;
  }
};
