import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}