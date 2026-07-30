import { useEffect, useState } from "react";
import axios from "axios";

export default function Employees() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/employees`)
      .then(res => setEmployees(res.data));
  }, []);

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