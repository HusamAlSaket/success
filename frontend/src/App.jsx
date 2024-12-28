import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CodeManagement from "./components/CodeManagement";
import Sidebar from "./components/Sidebar"; // Import the Sidebar

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar /> {/* Sidebar Component */}
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
          {/* Main content */}
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/codes" element={<CodeManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
