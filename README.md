# Personality-Driven Career Chatbot

A complete Node.js backend project that provides an API for a highly stylized, personality-driven chatbot focused on career guidance. This API is powered by the Groq LLM (Large Language Model) via the Llama 3 model.

## Features

- **Strict Persona Constraints**: The chatbot adheres strictly to a rigid system prompt.
  - Answers career questions with high intelligence.
  - Answers non-career questions humorously, with total confusion.
  - Randomly activates "Alien Mode" or "Elvish Mode".
  - Always begins every message with exactly one emoji.
  - Uses "|||" for dramatic pauses.
- **Short-Term Memory**: Keeps up to 10 previous conversational turns per `userId` stored locally in-memory.
- **Rate Limiting**: Limits clients to 100 requests per 15 minutes to prevent abuse.
- **Clean Architecture**: Modular structure dividing app definition, routing, data storage, LLM logic, and config.

## Project Structure

\`\`\`text
.
├── config/
│   └── systemPrompt.js   # Chatbot persona rules and constraints
├── memory/
│   └── memoryStore.js    # In-memory history tracker (limit max 10)
├── routes/
│   └── chat.js           # API route handling POST /api/chat
├── services/
│   └── llm.js            # Configuration and invocation of the Groq API
├── .env                  # Environment Variables (Ignored in git)
├── .env.example          # Environment Variables Template
├── package.json          
├── package-lock.json
├── README.md
└── server.js             # Main application entry point
\`\`\`

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment Variables**
   - Copy the example config file:
     \`\`\`bash
     cp .env.example .env
     \`\`\`
   - Open `.env` and fill in your [Groq API Key](https://console.groq.com):
     \`\`\`env
     GROQ_API_KEY="your_actual_api_key"
     PORT=3000
     \`\`\`

3. **Run the Server**
   \`\`\`bash
   npm start
   \`\`\`
   *Alternatively, if using `nodemon`, you can run `nodemon server.js` for hot-reloads.*

## API Usage

### `POST /api/chat`

Sends a message strictly tied to a user identity for history maintenance.

**Headers**
\`\`\`http
Content-Type: application/json
\`\`\`

**Request Body Example**
\`\`\`json
{
  "userId": "user_12345",
  "message": "Can you help me prepare for a frontend developer interview?"
}
\`\`\`

**Response Example (Success)**
\`\`\`json
{
  "reply": "💼 I would be glad to assist you ||| the first step is to focus on core JavaScript concepts..."
}
\`\`\`

### Example `cURL` request:

\`\`\`bash
curl -X POST http://localhost:3000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"userId": "demo_user", "message": "What is the capital of France?"}'
\`\`\`

*(Expected Behavior: Since asking about capitals is NOT career-related, the AI will act extremely dumb or confused while remaining polite, due to the system prompt's instructions).*

## System Prompt Design

The core of this AI lies within the heavily constrained `config/systemPrompt.js`. Large Language Models, notably Groq APIs utilizing `llama-3.1-8b-instant`, respond well to explicitly structured prompt definitions. By clearly demarcating sections using rules such as `EMOJI RULE (STRICT)` and explicitly explaining how rule switches operate based on topical logic, we force the AI to process conversational context carefully before streaming output back. 

## Memory Handling

Memory handling is accomplished via `memory/memoryStore.js`. 
- **Methodology**: It uses a standard Javascript `Map` instance mapping `userId` strings to an array of objects representing messages (`{ role: "user" | "assistant", content: "..." }`).
- **Memory Optimization**: Upon the receipt of every message, history arrays are actively slice-truncated to ensure they only store the most recent `10` messages dynamically avoiding unneeded overhead padding into LLM tokens over time.

---

*Note: For a production environment, you should transition from in-memory objects to a persistent cache engine such as Redis or a MongoDB database.*
