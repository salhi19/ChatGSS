const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = "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";

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with OpenAI API");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
