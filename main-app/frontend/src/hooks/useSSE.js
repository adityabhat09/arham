import { useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL;

/**
 * useSSE — subscribes to the server's SSE stream and calls `onUpdate`
 * whenever a "cache-updated" event is pushed.
 *
 * Uses a ref so that changes to `onUpdate` (e.g. when filter state changes)
 * always invoke the latest version without reopening the SSE connection.
 */
export function useSSE(onUpdate) {
    const onUpdateRef = useRef(onUpdate);

    // Keep ref in sync with the latest callback on every render
    useEffect(() => {
        onUpdateRef.current = onUpdate;
    });

    useEffect(() => {
        const source = new EventSource(`${API}/events`);

        source.addEventListener("cache-updated", () => {
            console.log("🔔 cache-updated received — refreshing data");
            onUpdateRef.current();
        });

        source.addEventListener("connected", () => {
            console.log("✅ SSE connection established");
        });

        source.onerror = () => {
            // EventSource auto-reconnects — no manual handling needed
            console.warn("⚠️ SSE connection lost, browser will retry...");
        };

        return () => {
            source.close();
        };
    }, []); // Open once per component mount
}
