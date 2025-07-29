import { useState, useEffect } from "react";

interface ExameAgendado {
    id: string;
    nome: string;
    data: string;
    paciente: { nome: string };
    medico: { nome: string };
}

export function ExamesAgendados() {
    const [exames, setExames] = useState<ExameAgendado[]>([]);

    useEffect(() => {
        async function fetchExames() {
            try {
                const response = await fetch('http://localhost:3000/agendamentos');
                const data = await response.json();
                setExames(data);
            } catch (error) {
                console.error('Erro ao buscar exames agendados:', error);
            }
        }

        fetchExames();
    }, []);

    return(
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Exames agendados</h2>
            <div className="space-y-4">
                {exames.map((exame) => (
                    <div key={exame.id} className="p-4 rounded-xl bg-white shadow flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{exame.nome}</p>
                            <p className="text-gray-600">
                                Paciente: {exame.paciente.nome} | Médico: {exame.medico.nome}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Data: {new Date(exame.data).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}