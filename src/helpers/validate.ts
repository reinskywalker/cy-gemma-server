import axios from "axios";

export const validate = async (apikey: string): Promise<boolean> => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`;

    const requestBody = {
        contents: [
            {
                parts: [{ text: "Hi" }],
            },
        ],
    };

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("✅ Key valid:", apikey.slice(0, 10), "...");
        return true;
    } catch (error: any) {
        console.error("❌ Invalid key:", apikey.slice(0, 10), "...", error?.response?.data || error.message);
        return false;
    }
};
