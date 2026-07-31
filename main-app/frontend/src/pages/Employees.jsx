import { useEffect, useState } from "react";
import axios from "axios";
import { useSSE } from "../hooks/useSSE";

const API = import.meta.env.VITE_API_URL;

export default function Employees() {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = () => {
        axios.get(`${API}/employees`).then(res => setEmployees(res.data));
    };

    // Initial load
    useEffect(() => { fetchEmployees(); }, []);

    // Live update
    useSSE(fetchEmployees);

    return (
        <>
            <h2>Employees</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}