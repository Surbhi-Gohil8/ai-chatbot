Your README is already strong 👍 — it just needs **format fixing + slight professional polishing** (right now formatting is broken in sections like code blocks).

Here is your **corrected, clean, fully professional version (copy-paste ready)** 👇

---

```markdown
# Personality-Driven Career Chatbot

This project is a backend-only Node.js application that exposes an API for a personality-driven chatbot. The chatbot is designed to provide high-quality career guidance while exhibiting a unique and controlled personality in all responses.

The system integrates a free Large Language Model (LLM) via the Groq API and enforces strict behavioral rules using a carefully engineered system prompt.

---

## Overview

The chatbot operates on a dual-behavior mechanism:

- For **career-related queries**, it provides structured, intelligent, and actionable advice.
- For **non-career queries**, it responds in a deliberately confused and humorous manner while remaining polite.

Additionally, the chatbot includes rare dynamic behaviors such as "Alien Mode" and "Elvish Mode", making interactions more engaging and unpredictable.

---

## Key Features

- **Strict Personality Enforcement**
  - Every response begins with exactly one emoji
  - Uses `|||` to simulate natural pauses
  - Maintains consistent persona across all interactions
  
- **Context-Aware Responses**
  - Retains short-term conversation memory (last 10 messages per user)
  - Enables more natural and continuous conversations

- **Dynamic Behavior Injection**
  - Occasionally switches to:
    - Alien-like language (briefly)
    - Elvish-style phrases (briefly)
  - Randomly references an ongoing fictional conflict between elves and aliens

- **Rate Limiting**
  - Limits API usage to prevent abuse (100 requests per 15 minutes per client)

- **Modular Code Architecture**
  - Clean separation of concerns (routes, services, memory, config)

---

## Tech Stack

- Node.js
- Express.js
- Groq API (LLM Integration)
- Axios (HTTP requests)
- dotenv (environment management)

---

## Project Structure

```

.
├── config/
│   └── systemPrompt.js
├── memory/
│   └── memoryStore.js
├── routes/
│   └── chat.js
├── services/
│   └── llm.js
├── .env
├── .env.example
├── package.json
├── README.md
└── server.js

````

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
````

---

### 2. Configure Environment Variables

Create a `.env` file using the example:

```bash
cp .env.example .env
```

Add your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
PORT=3000
MODEL_NAME=llama-3.1-8b-instant
```

---

### 3. Run the Server

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## API Usage

### Endpoint

```
POST /api/chat
```

---

### Request Body

```json
{
  "userId": "user_123",
  "message": "How can I prepare for a software engineering interview?"
}
```

---

### Response

```json
{
  "reply": "💼 You should begin by strengthening your core concepts ||| focus on data structures and problem solving..."
}
```

---

### Example cURL Request

```bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{"userId": "demo_user", "message": "What is the capital of France?"}'
```

---

## System Prompt Design

The chatbot's behavior is controlled through a structured system prompt defined in `config/systemPrompt.js`.

The prompt enforces:

* Strict formatting rules (emoji + pauses)
* Context-based intelligence switching
* Rare randomized behaviors (alien/elvish modes)
* Continuous character consistency

This approach ensures predictable yet dynamic responses from the LLM while maintaining control over output quality.

---

## Memory Handling

The chatbot implements both short-term and long-term memory to maintain conversational context and improve user experience.

### Short-Term Memory

Short-term memory is managed using an in-memory data structure that maps each `userId` to recent conversation history.

- Stores up to 10 most recent messages per user
- Automatically removes older messages to control memory usage
- Enables contextual continuity within a single session

### Long-Term Memory

Long-term memory is implemented using a persistent `longTermMemory.json` file stored on disk.

- Stores up to 50 messages per user
- Persists data across server restarts
- Allows the chatbot to retain context beyond a single session

### Memory Strategy

- On each request, short-term memory is used for fast access and response generation
- Long-term memory acts as a backup and persistence layer
- Data is periodically trimmed to maintain performance and prevent excessive storage growth
---

## Future Improvements

* Integration with MongoDB or Redis for scalable storage
* Improved prompt tuning
* Logging and monitoring
* Deployment (Docker / Cloud)

---


