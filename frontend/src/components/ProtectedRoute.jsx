import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // No login information
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  let user;

  // Check stored user data
  try {
    user = JSON.parse(userData);
  } catch (error) {
    console.error("Invalid user data:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // Only Student and Faculty are supported
  const validRoles = ["student", "faculty"];

  if (!user?.role || !validRoles.includes(user.role)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // Check whether the user's role is allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    // Faculty trying to access Student Dashboard
    if (user.role === "faculty") {
      return (
        <Navigate
          to="/faculty-dashboard"
          replace
        />
      );
    }

    // Student trying to access Faculty Dashboard
    if (user.role === "student") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;