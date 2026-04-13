import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: req.body.messages
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "server error" });
    }
});

app.listen(10000);
