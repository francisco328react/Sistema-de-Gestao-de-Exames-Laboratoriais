import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ExamesAgendados } from "../pages/ExamesAgendados";
import { AgendamentosPage } from "../pages/AgendamentosPage";
import { ReagendamentoExame } from "../pages/ReagendarExame";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/exames" element={<ExamesAgendados />} />
                <Route path="/agendamentos" element={<AgendamentosPage />} />
                <Route path="/reagendamentos" element={<ReagendamentoExame />} />
            </Routes>
        </BrowserRouter>
    )
}