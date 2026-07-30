import { useEffect, useState } from "react";
import axios from "axios";

export default function MyClients() {

  const [clients, setClients] = useState([]);

  const fetchMyClients = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/my-clients/1`)
      .then(res => setClients(res.data));
  };

  useEffect(() => {
    fetchMyClients();

    const interval = setInterval(fetchMyClients, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>My Clients</h2>

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