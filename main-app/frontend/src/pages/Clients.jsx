import { useEffect, useState } from "react";
import axios from "axios";
import { useSSE } from "../hooks/useSSE";

const API = import.meta.env.VITE_API_URL;

export default function Clients() {
    const [clients, setClients] = useState([]);

    const fetchClients = () => {
        axios.get(`${API}/clients`).then(res => setClients(res.data));
    };

    // Initial load
    useEffect(() => { fetchClients(); }, []);

    // Live update — re-fetch the instant the server pushes "cache-updated"
    useSSE(fetchClients);

    return (
        <>
            <h2>Clients</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>PAN</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.pan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}