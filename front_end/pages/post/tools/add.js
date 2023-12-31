import Link from "next/link"
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router';

const addHerramienta = () => {
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  const [tipo, setTipo] = useState('');
  const [existencia, setExistencia] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const router = useRouter();


  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setNombre(value);
    else if (name === 'area') setArea(value);
    else if (name === 'tipo') setTipo(value);
    else if (name === 'existencia') setExistencia(value);
    else if (name === 'localizacion') setLocalizacion(value);
  };

  // enviar el formulario
  const handleSubmit = async (e) => {

    try {
      const response = await fetch('http://localhost:8082/api/herramienta/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          area,
          tipo,
          existencia,
          localizacion,
        }),
      });
      const result = await response.json();
      // Verificar si el registro fue exitoso
      if (result.success) {
        alert('Registro exitoso. Agregaste una herramienta nueva');
        router.push('/post/tools/tools');
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
          <h1 className='display-6'>Add Tool</h1>
          <input
            type="text" id="name" name="name" placeholder="Name" value={nombre} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <input
            type="text" id="area" name="area" placeholder="Area" value={area}
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <input
            type="text" id="tipo" name="tipo" placeholder="Type" value={tipo} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <input
            type="text" id="existencia" name="existencia" placeholder="Existence" value={existencia} 
            className='form-control mt-3' onChange={handleChange}  maxLength={3}
            required
          />
          <input
            type="text" id="localizacion" name="localizacion" placeholder="Location" value={localizacion} 
            className='form-control mt-3' onChange={handleChange}  maxLength={20}
            required
          />
          <div className="mt-4">
          <button className="btn btn-warning" type="button" 
            onClick={handleSubmit}>Add
          </button>
          &nbsp;
          &nbsp;
          <Link href="./tools">
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

export default addHerramienta;