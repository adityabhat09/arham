import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Incentives() {
    const [employees,        setEmployees]        = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("all");
    const [rows,             setRows]             = useState([]);

    // Load employee list once for the dropdown
    useEffect(() => {
        axios.get(`${API}/employees`).then(res => setEmployees(res.data));
    }, []);

    const fetchIncentives = () => {
        if (selectedEmployee === "all") {
            // Management view — all employees
            axios.get(`${API}/incentives`).then(res => setRows(res.data));
        } else {
            // Individual employee view
            axios.get(`${API}/incentives/${selectedEmployee}`)
                .then(res => setRows([res.data]));
        }
    };

    useEffect(() => {
        fetchIncentives();
        const interval = setInterval(fetchIncentives, 5000);
        return () => clearInterval(interval);
    }, [selectedEmployee]);

    return (
        <>
            <h2>Incentives</h2>

            <div style={{ marginBottom: "16px" }}>
                <label htmlFor="emp-select" style={{ marginRight: "8px" }}>
                    View as:
                </label>
                <select
                    id="emp-select"
                    value={selectedEmployee}
                    onChange={e => setSelectedEmployee(e.target.value)}
                >
                    <option value="all">All Employees (Management)</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Total Trades</th>
                        <th>Total Quantity</th>
                        <th>Incentive</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.employeeId}>
                            <td>{row.employeeId}</td>
                            <td>{row.employeeName || "—"}</td>
                            <td>{row.totalTrades}</td>
                            <td>{row.totalQuantity}</td>
                            <td>₹ {row.incentive?.toLocaleString("en-IN")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}