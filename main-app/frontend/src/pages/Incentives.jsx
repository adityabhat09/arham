import { useEffect, useState } from "react";
import axios from "axios";

export default function Incentives() {

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/incentives/1")
      .then(res => setData(res.data));
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