// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css'; // Agregamos un archivo CSS para estilo global

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Gestión de Gastos</h1>
        {/* Puedes agregar una barra de navegación aquí si lo deseas */}
      </header>

      <main>
        <Dashboard />
      </main>

      <footer>
        <p>&copy; 2025 Gestión de Gastos</p>
      </footer>
    </div>
  );
};

export default App;
