import { useEffect, useState } from "react";
import axios from "axios";

export default function Trades() {
    const [trades, setTrades] = useState([]);

    const [clientId, setClientId] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const loadTrades = () => {
        let url = `${import.meta.env.VITE_API_URL}/trades?`;

        if (clientId) url += `clientId=${clientId}&`;
        if (from) url += `from=${from}&`;
        if (to) url += `to=${to}`;

        axios.get(url).then(res => setTrades(res.data));
    };

    useEffect(() => {
        if (clientId || from || to) return;

        loadTrades();

        const interval = setInterval(loadTrades, 2000);

        return () => clearInterval(interval);
    }, [clientId, from, to]);

    return (
        <>
            <h2>Trades</h2>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="number"
                    placeholder="Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                />

                <label style={{ marginLeft: "15px", marginRight: "5px" }}>
                    From:
                </label>

                <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />

                <label style={{ marginLeft: "15px", marginRight: "5px" }}>
                    To:
                </label>

                <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />

                <button onClick={loadTrades} style={{ marginLeft: "10px" }}>
                    Search
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Trade ID</th>
                        <th>Client ID</th>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {trades.map(trade => (
                        <tr key={trade.tradeId}>
                            <td>{trade.tradeId}</td>
                            <td>{trade.clientId}</td>
                            <td>{trade.symbol}</td>
                            <td>{trade.quantity}</td>
                            <td>{trade.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}