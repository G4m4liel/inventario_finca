import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';


export default function Home() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleClick = () => {
    router.push('./post/Registro');
  };

  const handleLogin = async() => {

    try {
      const response = await fetch('http://localhost:8082/api/login/acceso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, contraseña }),
      });

    const result = await response.json();

      if (result.success) {
        // Si es exitoso, redirige a la ruta de inicio o la que desees
        window.location.href = '/post/home';
      } else {
        // Si no es exitoso, muestra un alert
        alert('Usuario no encontrado. Por favor, regístrese.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      // Puedes manejar errores adicionales aquí si es necesario
    }
  };

  return (
    <div>
      <Head>
        <title>Finca_UNAV</title>
        <link rel="icon" href="/logo_unav.png" />
      </Head>
      <main>
      <div className='formcontainer mt-5 mb-5'>
        <form className='container'>
          <h1 className='display-6'>LOGIN</h1>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} 
            placeholder="Username" maxLength={10} className='form-control mt-3'/>

          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} 
            placeholder="Password" maxLength={6}className='form-control mt-3'/>

          <div className='d-grid gap-2 mt-4'>
            <button type="button" className='btn btn-success' onClick={handleLogin}>LOGIN</button>
            <button type="button" className='btn btn-warning' onClick={handleClick}>REGISTER</button>
          </div>
        </form>
      </div>
      </main>
      <footer>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div>
  );
}
