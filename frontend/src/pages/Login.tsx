import { useNavigate } from "react-router-dom";
import { AuthForm } from "../context/FormContext";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const navigate = useNavigate();
    const { login: doLogin } = useAuth();

    const handleLogin = async (email: string, senha: string) => {
        try {
            const { token } = await login(email, senha);
            doLogin(token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Falha no login');
        }
    }

    return (
        <AuthForm onSubmit={handleLogin} />
    )
}