import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../../components/navbar';
import axios from 'axios';
import { useRouter } from 'next/router';


const EditarHerramienta = () => { // Obtén el parámetro de la URL
  // const { id } = useParams();
  const router = useRouter();
  const { id } = router.query;
  const id_herramienta = id;

  const [herramienta, setHerramienta] = useState({
    nombre: '',
    area: '',
    tipo: '',
    existencia: '',
    localizacion: '',
  });

  const handleClick = () => {
    // Redirige a la ruta deseada cuando se hace clic en el botón
    router.push('../tools');
  };

  const handleInputChange = (e) => {
    setHerramienta({ ...herramienta, [e.target.name]: e.target.value });
  };
    
    const handleActualizar = async () => {
      try {
        await axios.put(`http://localhost:8082/api/herramienta/update/${id_herramienta}`, herramienta);
        // Redirigir a la lista de herramientas después de la actualización
        router.push('/post/tools/tools');
        console.log('hola');
      } catch (error) {
        console.error('Error al actualizar la herramienta:', error);
      }
    };

  useEffect(() => {
   
      console.log('ID recibido:', id_herramienta);
        // getData(id)
        
      // Llamada a la API para obtener la herramienta específica por ID
      const fetchHerramienta = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/api/herramienta/reading/${id_herramienta}`);
          setHerramienta(response.data[0]); // Suponiendo que la respuesta es un array y quieres la primera herramienta
        } catch (error) {
          console.error('Error al obtener la herramienta:', error);
        }
      };
      
    fetchHerramienta();
  }, []); // El segundo parámetro [id] garantiza que useEffect se ejecute cuando el ID cambie
   

  return (
    <div>
      <div className='formcontainer mt-5 mb-5'>
      <form className='container'>
        <h1 className='display-6'>Editar Herramienta</h1>
        <label>Name:</label>
        <input className='form-control' type="text" name="nombre" placeholder='Name' value={herramienta.nombre} onChange={handleInputChange} />

        <label>Area:</label>
        <input className='form-control' type="text" name="area" placeholder='Area' value={herramienta.area} onChange={handleInputChange} />

        <label>Type:</label>
        <input className='form-control' type="text" name="tipo" placeholder='Type' value={herramienta.tipo} onChange={handleInputChange} />

        <label>Stock:</label>
        <input className='form-control' type="text" name="existencia" placeholder='Stock' value={herramienta.existencia} onChange={handleInputChange} />

        <label>Location:</label>
        <input className='form-control' type="text" name="localizacion" placeholder='Location' value={herramienta.localizacion} onChange={handleInputChange} />
        <div className='mt-4'>
        <button className='btn btn-success' type="button" onClick={handleActualizar}>Update</button>
        &nbsp;
        <button className='btn btn-warning' type="button" onClick={handleClick}>Cancel</button>
        </div>
      </form>
      </div>
      <footer>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div>
  );
};

export default EditarHerramienta;






