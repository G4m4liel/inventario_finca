import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Login.module.css';
import Link from 'next/link';


export default function Home() {

  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

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

      <div className={styles.formcontainer}>
        <form className={styles.container} >
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} 
            placeholder="Username" maxLength={10} className={styles.con}/>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} 
            placeholder="Password" maxLength={6}className={styles.con}/>
          <button type="button" className={styles.btn} onClick={handleLogin}>login</button>
          <Link href="/post/Registro">
            <button type="button" className={styles.btn}>register</button>
          </Link>
        </form>
      </div>
      </main>
      <footer>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div>
  );
}
