import { useState, useEffect } from "react";
import axios from "axios";

interface Agendamento {
    id: number;
    dataHora: string;
    pacciente: {
        nome: string;
    };
    exame: {
        nome: string;
    };
    medico: {
        nome: string;
    };
}

export function ReagendamentoExame() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [novosHoararios, setNovosHosrarios] = useState<Record<number, string>>({});

    useEffect(() => {
        axios.get("http://localhost:3000/agendamento")
        .then((res) => setAgendamentos(res.data))
        .catch((err) => console.error("Erro ao buscar agendamentos", err));

    }, []);

    const handleReagendar = async (id: number) => {
        try {
            await axios.put(`http://localhost:3000/agendamento/${id}`, {
                dataHora: novosHoararios[id],
            });
        } catch (error) {
            console.error("Erro ao reagendar", error);
            alert("Erro ao reagendar");
        }
    }

    return(
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Reagendar Exames</h1>

            {agendamentos.map((reag) => (
                <div key={reag.id} className="border p-4 rounded-lg mb-4 shadow">
                    <p><strong>Paciente:</strong> {reag.pacciente.nome}</p>
                    <p><strong>Exame:</strong> {reag.exame.nome}</p>
                    <p><strong>Médico:</strong> {reag.medico?.nome ?? 'N/A'}</p>
                    <p><strong>Agendado para::</strong> {new Date(reag.dataHora).toLocaleString()}</p>

                    <input 
                        type="datetime-local"
                        value={novosHoararios[reag.id] || ''}
                        onChange={(e) => setNovosHosrarios({ ...novosHoararios, [reag.id]: e.target.value })}
                        className="mt-2 border rounded px-2 py-1"
                    />

                    <button
                        onClick={() => handleReagendar(reag.id)}
                        className="ml-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Reagdendar
                    </button>
                </div>
            ))}
        </div>
    );
}