import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; 
import ProjectsPage from './pages/ProjectsPage'
import ProtectedRoute from './components/ProtectedRouter'; 

function App() {
  return (
    <div className="App">
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* --- Ruta por Defecto --- */}
        <Route path="/" element={<Navigate replace to="/login" />} />

        {/* --- Rutas Protegidas --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} /> {/* ¡NUEVO! */}
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;