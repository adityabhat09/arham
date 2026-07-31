/**
 * SSE Service — tracks all connected browser clients and broadcasts events.
 * No external packages needed; SSE is plain HTTP with a streaming response.
 */

const clients = new Set();

/** Register a new SSE response stream and auto-remove it when the client disconnects. */
function addClient(res) {
    clients.add(res);
    res.on("close", () => {
        clients.delete(res);
        console.log(`📡 SSE client disconnected (${clients.size} remaining)`);
    });
    console.log(`📡 SSE client connected (${clients.size} total)`);
}

/** Push a named SSE event to every connected client. */
function broadcast(event, data = {}) {
    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    let dead = [];
    clients.forEach(client => {
        try {
            client.write(message);
        } catch {
            // Client already gone — mark for removal
            dead.push(client);
        }
    });
    dead.forEach(c => clients.delete(c));
    console.log(`📢 Broadcast "${event}" to ${clients.size} client(s)`);
}

module.exports = { addClient, broadcast };
