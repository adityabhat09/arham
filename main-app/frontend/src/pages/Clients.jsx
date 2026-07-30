import axios from "axios";
import { useEffect, useState } from "react";

export default function Clients() {

  const [clients, setClients] = useState([]);

  const fetchClients = () => {
    axios
      .get("http://localhost:4000/clients")
      .then(res => setClients(res.data));
  };

  useEffect(() => {
    fetchClients();

    const interval = setInterval(fetchClients, 5000);

    return () => clearInterval(interval);
  }, []);

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