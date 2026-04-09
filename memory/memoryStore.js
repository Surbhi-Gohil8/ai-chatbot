const MAX_HISTORY = 50;
const store = new Map();

function getMemory(userId) {
    if (!store.has(userId)) {
        store.set(userId, []);
    }
    return store.get(userId);
}

function addMessage(userId, role, content) {
    const history = getMemory(userId);
    history.push({ role, content });

    if (history.length > MAX_HISTORY) {
        history.splice(0, history.length - MAX_HISTORY);
    }
}

function clearMemory(userId) {
    store.delete(userId);
}

module.exports = {
    getMemory,
    addMessage,
    clearMemory
};
