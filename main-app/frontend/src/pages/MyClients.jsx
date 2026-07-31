import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function MyClients() {
    const [employees,        setEmployees]        = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [clients,          setClients]          = useState([]);

    // Load employee list once for the dropdown
    useEffect(() => {
        axios.get(`${API}/employees`).then(res => {
            setEmployees(res.data);
            if (res.data.length > 0) {
                setSelectedEmployee(String(res.data[0].id));
            }
        });
    }, []);

    const fetchMyClients = () => {
        if (!selectedEmployee) return;
        axios.get(`${API}/my-clients/${selectedEmployee}`)
            .then(res => setClients(res.data));
    };

    useEffect(() => {
        fetchMyClients();
        const interval = setInterval(fetchMyClients, 2000);
        return () => clearInterval(interval);
    }, [selectedEmployee]);

    const selectedName = employees.find(e => String(e.id) === selectedEmployee)?.name || "";

    return (
        <>
            <h2>My Clients</h2>

            <div style={{ marginBottom: "16px" }}>
                <label htmlFor="emp-select" style={{ marginRight: "8px" }}>
                    Employee:
                </label>
                <select
                    id="emp-select"
                    value={selectedEmployee}
                    onChange={e => setSelectedEmployee(e.target.value)}
                >
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
                {selectedName && (
                    <span style={{ marginLeft: "12px", color: "#888" }}>
                        {clients.length} client(s) assigned
                    </span>
                )}
            </div>

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