import Link from "next/link"
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router';

const addImplemento = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const router = useRouter();


  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setNombre(value);
    else if (name === 'tipo') setTipo(value);
    else if (name === 'descripcion') setDescripcion(value);
    else if (name === 'ubicacion') setUbicacion(value);
  };

  // enviar el formulario
  const handleSubmit = async (e) => {

    try {
      const response = await fetch('http://localhost:8082/api/implemento/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          tipo,
          descripcion,
          ubicacion,
        }),
      });
      const result = await response.json();
      // Verificar si el registro fue exitoso
      if (result.success) {
        console.log('exito')
        alert('Registro exitoso. Agregaste una herramienta nueva');
        router.push('/post/implements/implements');
      } else {
        alert('Error en el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de registro:', error);
    }
  };

  return (
    <div>
      <div className='formcontainer mt-5 mb-5'>
        <form className='container'>
          <h1 className='display-6'>Add Implements</h1>
          <input
            type="text" id="name" name="name" placeholder="Name" value={nombre} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <input
            type="text" id="tipo" name="tipo" placeholder="Type" value={tipo} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <input
            type="text" id="descripcion" name="descripcion" placeholder="Description" value={descripcion} 
            className='form-control mt-3' onChange={handleChange}  maxLength={200}
            required
          />
          <input
            type="text" id="ubicacion" name="ubicacion" placeholder="Location" value={ubicacion} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <div className="mt-4">
          <button className="btn btn-warning" type="button"  onClick={handleSubmit}>
            Add
          </button>
          &nbsp;
          &nbsp;
          <Link href="./implements">
            <button className="btn btn-danger" type="button">
              Cancel
            </button>
          </Link>
          </div>
        </form>
      </div>
      <footer>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div>
  );
};

export default addImplemento;