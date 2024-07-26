import { jwtDecode } from "jwt-decode";

export default function protectedRoute(requiredRole) {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (requiredRole && userRole !== requiredRole) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
}
