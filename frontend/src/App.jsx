import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Dashboard */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["faculty"]}
            >
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;