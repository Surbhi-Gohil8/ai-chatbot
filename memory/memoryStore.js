const fs = require('fs').promises;
const path = require('path');

const MAX_HISTORY = 50;
const MEMORY_FILE = path.join(__dirname, 'longTermMemory.json');

async function initStore() {
    try {
        await fs.access(MEMORY_FILE);
    } catch {
        await fs.writeFile(MEMORY_FILE, JSON.stringify({}));
    }
}
async function getStoreData() {
    await initStore();
    const data = await fs.readFile(MEMORY_FILE, 'utf-8');
    return JSON.parse(data);
}   
async function saveStoreData(data) {
    await fs.writeFile(MEMORY_FILE, JSON.stringify(data, null, 2));
}

async function getMemory(userId) {
    const store = await getStoreData();
    if (!store[userId]) {
        store[userId] = [];
        await saveStoreData(store);
    }
    return store[userId];
}

async function addMessage(userId, role, content) {
    const store = await getStoreData();
    if (!store[userId]) {
        store[userId] = [];
    }
    
    store[userId].push({ role, content });

    if (store[userId].length > MAX_HISTORY) {
        store[userId].splice(0, store[userId].length - MAX_HISTORY);
    }
    
    await saveStoreData(store);
}

async function clearMemory(userId) {
    const store = await getStoreData();
    if (store[userId]) {
        delete store[userId];
        await saveStoreData(store);
    }
}

module.exports = {
    getMemory,
    addMessage,
    clearMemory
};
