import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}
