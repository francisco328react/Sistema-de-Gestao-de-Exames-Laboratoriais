import { useState } from "react";

interface AuthFormProps {
    onSubmit: (email: string, senha: string, nome?: string) => void;
    isLogin?: boolean;
}

export const AuthForm = ({ onSubmit, isLogin = true }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit(email, senha, nome);
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="p-4 bg-white shadow-lg rounded-lg max-w-md max-auto mt-20"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isLogin ? 'Login' : 'Cadastro'}
            </h2>
            {!isLogin && (
                <input 
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
            )}
            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
            />
            <input 
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
                {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
        </form>
    );
}