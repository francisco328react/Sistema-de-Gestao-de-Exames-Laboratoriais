import { useNavigate } from "react-router-dom";
import { AuthForm } from "../context/FormContext";
import { register } from "../services/authService";

export const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (email: string, senha: string, nome?: string) => {
        try {
            await register(nome || '', email, senha);
            alert('Cadastro realizado');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar");
        }
    }

    return (
        <AuthForm onSubmit={handleRegister} isLogin={false} />
    )
}