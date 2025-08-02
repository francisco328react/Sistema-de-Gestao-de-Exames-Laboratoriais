import { useEffect, useState } from "react";
import axios from "axios";

interface Agendamento {
    id: string;
    data: string;
    paciente: {
        nome: string;
    };
    medico: {
        nome: string;
    };
    exame: {
        nome: string;
    }
}

export function AgendamentosPage() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    useEffect(() => {
        const fechAgendamentos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/agendamento");
                setAgendamentos(response.data);
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        }

        fechAgendamentos();
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Exames Agendados</h1>
            {agendamentos.length === 0 ? (
                <p>Nenhum exame agendado</p>
            ) : (
                <table className="w-full table-auto border border-gray-300 rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Paciente</th>
                            <th className="p-3">Médico</th>
                            <th className="p-3">Exame</th>
                            <th className="p-3">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendamentos.map((agend) => (
                            <tr key={agend.id} className="border-t hover:bg-gray-100">
                                <td className="p-3">{agend.paciente.nome}</td>
                                <td className="p-3">{agend.medico.nome}</td>
                                <td className="p-3">{agend.exame.nome}</td>
                                <td className="p-3">{new Date(agend.data).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}