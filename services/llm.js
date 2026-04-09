const Groq = require('groq-sdk');
const SYSTEM_PROMPT = require('../config/systemPrompt');

const groq = process.env.GROQ_API_KEY ? new Groq({
    apiKey: process.env.GROQ_API_KEY
}) : null;


async function generateChatReply(userHistory, newMessage) {
    if (!groq) {
        throw new Error('Groq API Key is not configured in environment variables.');
    }

    try {
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
            ...userHistory,
            {
                role: 'user',
                content: newMessage
            }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
           model: "llama-3.1-8b-instant", 
            temperature: 0.7, 
            max_tokens: 1024,
            top_p: 1,
        });

        return chatCompletion.choices[0]?.message?.content || '||| ERROR: No response generated.';
    } catch (error) {
        console.error('LLM API Error:', error.message);
        throw new Error('Failed to generate response from LLM.');
    }
}

module.exports = {
    generateChatReply
};
