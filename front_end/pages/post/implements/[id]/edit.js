import React, { useState, useEffect } from 'react';
import NavBar from '../../../../components/navbar';
import { useRouter } from 'next/router';
import axios from 'axios';


const EditarImplemento = () => {
  const router = useRouter();
  const { id } = router.query;
  const id_implemento = id;

  const [implemento, setImplemento] = useState({
    nombre: '',
    tipo: '',
    descipcion: '',
    ubicacion: '',
  });

  const handleClick = () => {
    router.push('../implements');
  };

  const handleInputChange = (e) => {
    setImplemento({ ...implemento, [e.target.name]: e.target.value });
  };
    
    const handleActualizar = async () => {
      try {
        await axios.put(`http://localhost:8082/api/implemento/update/${id_implemento}`, implemento);
        router.push('/post/implements/implements');
        console.log('hola');
      } catch (error) {
        console.error('Error al actualizar el implemento:', error);
      }
    };

  useEffect(() => {
   
      console.log('ID recibido:', id_implemento);
        
      const fetchImplemento = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/api/implemento/reading/${id_implemento}`);
          setImplemento(response.data[0]);
        } catch (error) {
          console.error('Error al obtener el implemento:', error);
        }
      };
      
    fetchImplemento();
  }, []);
   

  return (
    <div>
      <div className='formcontainer mt-5 mb-5'>
        <form className='container'>
          <h1 className='display-6'>Editar Implemento</h1>
          <label>Nombre:</label>
          <input className='form-control' type="text" name="nombre" placeholder='Name' value={implemento.nombre} onChange={handleInputChange} />

          <label>Tipo:</label>
          <input className='form-control' type="text" name="tipo" placeholder='Type' value={implemento.tipo} onChange={handleInputChange} />

          <label>Descripcion:</label>
          <input className='form-control' type="text" name="descripcion" placeholder='Description' value={implemento.descipcion} onChange={handleInputChange} />

          <label>Localización:</label>
          <input className='form-control' type="text" name="ubicacion" placeholder='Location' value={implemento.ubicacion} onChange={handleInputChange} />
          <div className='mt-4'>
            <button className='btn btn-success' type="button" onClick={handleActualizar}>Update</button>
            &nbsp;
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

export default EditarImplemento;






