import React, {useState, useEffect} from 'react';
import NavBar from '/components/navbar';
import {Bar} from 'react-chartjs-2';
import Link from "next/link"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
      indexAxis: 'x',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Herramientas por Area',
        },
      },
    };



  const data = {
    labels: ['Llaves', 'Mecanica', 'Riego', 'Cultivo', 'Jardineria', 'Jardin'],
    datasets: [{
      label: 'Cantidad',
      data: [24, 26, 17, 21, 23, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],

    }]
  }

  const HerramientasGrafica = () => {
    const [herramientas, setHerramientas] = useState([]);

    useEffect(() => {
      // Llamada a la API para obtener todas las herramientas
      const fetchHerramientas = async () => {
        try {
          const response = await axios.get('http://localhost:8082/api/grafica/reading');
          setHerramientas(response.data);
        } catch (error) {
          console.error('Error al obtener las herramientas:', error);
        }
      };
      fetchHerramientas();
    }, []);

    return (
        <div>
          <NavBar/>
        <div className='container bg-dark mt-5'>
        <h2 className='text text-warning'>Existencias de Herramientas</h2>
        <Bar
          data={data}
          options={options}
        />
        </div>
      </div>
    )
}


export default HerramientasGrafica;