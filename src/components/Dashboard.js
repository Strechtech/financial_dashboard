import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { calculateTotal } from '../utils/helpers'; 

// Registramos los elementos necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [gastos, setGastos] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevoMonto, setNuevoMonto] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    // Validación mejorada
    if (!nuevaCategoria || !nuevoMonto || isNaN(nuevoMonto) || parseFloat(nuevoMonto) <= 0) {
      setError("Por favor, complete todos los campos correctamente.");
      return;
    }

    const nuevoGasto = {
      id: Date.now(),
      categoria: nuevaCategoria,
      monto: parseFloat(nuevoMonto),
    };

    setGastos([...gastos, nuevoGasto]);
    setNuevaCategoria('');
    setNuevoMonto('');
    setError('');
  };

  // Función para eliminar un gasto
  const eliminarGasto = (id) => {
    setGastos(gastos.filter(gasto => gasto.id !== id));
  };

  // Preparar los datos para el gráfico de pastel
  const prepararDatosGrafico = () => {
    const categorias = gastos.reduce((acc, gasto) => {
      if (acc[gasto.categoria]) {
        acc[gasto.categoria] += gasto.monto;
      } else {
        acc[gasto.categoria] = gasto.monto;
      }
      return acc;
    }, {});

    const labels = Object.keys(categorias);
    const data = Object.values(categorias);

    return {
      labels,
      datasets: [
        {
          label: 'Gastos por Categoría',
          data,
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6'],
        },
      ],
    };
  };

  // Opciones para el gráfico de pastel, ajustando el tamaño
  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,  // Permite ajustar el tamaño
    plugins: {
      legend: {
        position: 'top',
      },
    },
    elements: {
      arc: {
        borderWidth: 2, // Bordes de las porciones del gráfico
      },
    },
    cutout: '70%',  // Reducción del radio del gráfico (corte central)
  };

  return (
    <div>
      <h1>Dashboard de Gastos</h1>

      {/* Mensaje de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulario para ingresar nuevos gastos */}
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Categoría</label>
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Ej. Comida, Transporte"
          />
        </div>

        <div>
          <label>Monto</label>
          <input
            type="number"
            value={nuevoMonto}
            onChange={(e) => setNuevoMonto(e.target.value)}
            placeholder="Monto en $"
          />
        </div>

        <button type="submit">Registrar Gasto</button>
      </form>

      {/* Tabla de gastos */}
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td>{gasto.categoria}</td>
              <td>${gasto.monto}</td>
              <td>
                <button onClick={() => eliminarGasto(gasto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Gastado */}
      <h2>Total Gastado: ${calculateTotal(gastos)}</h2>

      {/* Gráfico de pastel */}
      {gastos.length > 0 && (
        <div style={{ position: 'relative', height: '300px' }}>
          <h3>Distribución de Gastos</h3>
          <Pie data={prepararDatosGrafico()} options={opcionesGrafico} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
