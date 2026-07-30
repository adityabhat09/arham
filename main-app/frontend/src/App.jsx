import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
import Trades from "./pages/Trades";
import Employees from "./pages/Employees";
import MyClients from "./pages/MyClients";
import Incentives from "./pages/Incentives";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/myclients" element={<MyClients />} />
        <Route path="/incentives" element={<Incentives />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;