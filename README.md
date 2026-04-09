# 🤖 Personality-Driven Career Chatbot

A backend-only Node.js API for a personality-driven chatbot that delivers intelligent career guidance while maintaining a consistent, controlled personality across all interactions. Powered by the **Groq API** with a free LLM.

---

## ✨ Features

- **Dual-mode responses** — structured career advice for relevant queries; deliberately confused and humorous responses for off-topic ones
- **Strict personality enforcement** — emoji rules and pause formatting (`|||`) baked into every reply
- **Conversation memory** — short-term (session) and long-term (persistent) memory per user
- **Dynamic behavior injection** — rare Alien Mode and Elvish Mode for engaging interactions
- **Rate limiting** — prevents API abuse out of the box
- **Modular architecture** — clean separation of config, memory, routes, and services

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| LLM Provider | Groq API |
| HTTP Client | Axios |
| Config | dotenv |

---

## 📁 Project Structure

```
.
├── config/
│   └── systemPrompt.js      # Personality and behavior rules
├── memory/
│   └── memoryStore.js       # Short-term and long-term memory handling
├── routes/
│   └── chat.js              # API route definitions
├── services/
│   └── llm.js               # Groq API integration
├── .env                     # Environment variables (not committed)
├── .env.example             # Environment variable template
├── package.json
├── README.md
└── server.js                # Entry point
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
GROQ_API_KEY=your_api_key_here
PORT=3000
MODEL_NAME=llama-3.1-8b-instant
```

### 3. Start the server

```bash
npm start
```

The server will be running at `http://localhost:3000`.

---

## 📡 API Reference

### `POST /api/chat`

Send a message to the chatbot.

**Request Body**

```json
{
  "userId": "user_123",
  "message": "How can I prepare for a software engineering interview?"
}
```

**Response**

```json
{
  "reply": "💼 You should begin by strengthening your core concepts ||| focus on data structures and problem solving..."
}
```

> **Note:** Responses use `|||` as a pause/separator and always include a relevant emoji, as enforced by the system prompt.

---

## 🧠 Memory System

The chatbot maintains context across both sessions and server restarts.

| Type | Storage | Limit |
|---|---|---|
| Short-term | In-memory | 10 messages per user |
| Long-term | Persistent JSON file | 50 messages per user |

---

## 🎭 Personality Modes

| Mode | Trigger | Behavior |
|---|---|---|
| Career Mode | Career-related queries | Structured, actionable, intelligent guidance |
| Confused Mode | Off-topic queries | Politely puzzled and humorous |
| 👽 Alien Mode | Rare / random | Responds as if from another planet |
| 🧝 Elvish Mode | Rare / random | Responds with Tolkien-esque language |

---

## 🔮 Roadmap

- [ ] Database integration (MongoDB or Redis)
- [ ] Improved prompt tuning and persona depth
- [ ] Logging and monitoring (Winston / Datadog)
- [ ] Cloud deployment (Railway / Render / AWS)

---

## ⚠️ Notes

- Uses a **free-tier LLM** via the Groq API — no paid OpenAI subscription required
- All API keys are managed through environment variables and never hardcoded
- Designed for development and demonstration purposes

---

## 👤 Author

Developed as part of a backend engineering assignment focused on API design, prompt engineering, and conversational AI.