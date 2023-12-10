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
      <NavBar/>
      <h2>Editar Herramienta</h2>
      <form>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={herramienta.nombre} onChange={handleInputChange} />

        <label>Área:</label>
        <input type="text" name="area" value={herramienta.area} onChange={handleInputChange} />

        <label>Tipo:</label>
        <input type="text" name="tipo" value={herramienta.tipo} onChange={handleInputChange} />

        <label>Existencia:</label>
        <input type="text" name="existencia" value={herramienta.existencia} onChange={handleInputChange} />

        <label>Localización:</label>
        <input type="text" name="localizacion" value={herramienta.localizacion} onChange={handleInputChange} />

        <button type="button" onClick={handleActualizar}>Update</button>
        <button type="button" onClick={handleClick}>Cancel</button>
        
      </form>
    </div>
  );
};

export default EditarHerramienta;






