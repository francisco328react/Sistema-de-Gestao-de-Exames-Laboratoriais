import { Router } from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
