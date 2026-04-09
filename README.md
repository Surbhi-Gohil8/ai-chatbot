# Personality-Driven Career Chatbot

This project is a backend-only Node.js application that provides an API for a personality-driven chatbot. The chatbot delivers high-quality career guidance while maintaining a consistent and controlled personality across all interactions.

It integrates a free Large Language Model (LLM) using the Groq API and enforces strict behavioral rules through a structured system prompt.

---

## Overview

The chatbot follows a dual-behavior approach:

- For career-related queries, it provides structured, intelligent, and actionable responses.
- For non-career queries, it responds in a deliberately confused and humorous manner while remaining polite.

It also includes rare dynamic behaviors such as Alien Mode and Elvish Mode to make interactions more engaging.

---

## Features

- Strict personality enforcement (emoji rule and pause formatting)
- Context-aware responses using conversation memory
- Dynamic behavior injection (alien and elvish modes)
- Rate limiting to prevent API abuse
- Clean and modular backend architecture

---

## Tech Stack

- Node.js
- Express.js
- Groq API
- Axios
- dotenv

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
```

---

## Setup

**Install dependencies:**

```bash
npm install
```

**Create environment file:**

```bash
cp .env.example .env
```

**Add the following variables:**

```env
GROQ_API_KEY=your_api_key_here
PORT=3000
MODEL_NAME=llama-3.1-8b-instant
```

**Run the server:**

```bash
npm start
```

Server runs at `http://localhost:3000`

---

## API

**Endpoint:**

```
POST /api/chat
```

**Request body:**

```json
{
  "userId": "user_123",
  "message": "How can I prepare for a software engineering interview?"
}
```

**Response:**

```json
{
  "reply": "💼 You should begin by strengthening your core concepts ||| focus on data structures and problem solving..."
}
```

---

## System Prompt

The chatbot behavior is controlled using a structured system prompt. It enforces formatting rules, switches intelligence based on topic, and introduces rare dynamic behaviors while maintaining consistency.

---

## Memory Handling

The system uses both short-term and long-term memory.

**Short-term memory:**

- Stores up to 10 recent messages per user
- Enables contextual continuity within a session

**Long-term memory:**

- Stored in a persistent JSON file
- Stores up to 50 messages per user
- Maintains context across server restarts

---

## Future Improvements

- Database integration (MongoDB or Redis)
- Improved prompt tuning
- Logging and monitoring
- Cloud deployment

---

## Notes

- Uses a free LLM API (Groq)
- API keys are managed using environment variables
- Designed for development and demonstration purposes

---

## Author

Developed as part of a backend engineering assignment focused on API design, prompt engineering, and conversational AI.