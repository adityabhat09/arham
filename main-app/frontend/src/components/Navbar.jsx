import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Clients</Link> |{" "}
      <Link to="/trades">Trades</Link> |{" "}
      <Link to="/employees">Employees</Link> |{" "}
      <Link to="/myclients">My Clients</Link> |{" "}
      <Link to="/incentives">Incentives</Link>
    </nav>
  );
}