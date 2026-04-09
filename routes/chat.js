const express = require('express');
const router = express.Router();
const memoryStore = require('../memory/memoryStore');
const { generateChatReply } = require('../services/llm');

router.post('/chat', async (req, res) => {
    try {
        const { userId, message } = req.body;
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: 'Valid userId is required' });
        }
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Valid message is required' });
        }

        const userHistory = await memoryStore.getMemory(userId);

        let reply;
        try {
            reply = await generateChatReply(userHistory, message);
        } catch (llmError) {
            return res.status(503).json({ error: llmError.message });
        }

        await memoryStore.addMessage(userId, 'user', message);
        await memoryStore.addMessage(userId, 'assistant', reply);

        return res.json({ reply });

    } catch (error) {
        console.error('Chat endpoint error:', error);
        return res.status(500).json({ error: 'Internal server error while processing chat.' });
    }
});

module.exports = router;
