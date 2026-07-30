import { useEffect, useState } from "react";
import axios from "axios";

export default function Incentives() {

  const [data, setData] = useState({});

  const fetchIncentives = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/incentives/1`)
      .then(res => setData(res.data));
  };

  useEffect(() => {
    fetchIncentives();

    const interval = setInterval(fetchIncentives, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>Incentives</h2>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Total Trades</th>
            <th>Total Quantity</th>
            <th>Incentive</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{data.employeeId}</td>
            <td>{data.totalTrades}</td>
            <td>{data.totalQuantity}</td>
            <td>₹ {data.incentive}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}