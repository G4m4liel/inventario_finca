import Link from "next/link"
import React, { Component, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Registro.module.css';



const Register = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    router.push('../');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setNombre(value);
    else if (name === 'password') setContraseña(value);
    else if (name === 'ConfirmPassword') setConfirmPassword(value);
    else if (name === 'email') setEmail(value);
  };

  const handleSubmit = async (e) => {

    if (contraseña !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8082/api/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          correo: email,
        }),
      });

      const result = await response.json();
      console.log(result.success);

      // Verificar si hay un usuario con el mismo nombre y correo
      if (!result.success) {
        alert('Ya existe un usuario con ese nombre o correo. Por favor, elige otro.');
        
      } else {
        // Si no existe, continuar con el registro
        try {
          const response = await fetch('http://localhost:8082/api/user/insert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre,
              contraseña,
              correo: email,
            }),
          });

          const result = await response.json();

          // Verificar si el registro fue exitoso
          if (result.success) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = '../';
          } else {
            alert('Error en el registro. Por favor, inténtalo de nuevo.');
          }
        } catch (error) {
          console.error('Error al procesar la solicitud de registro:', error);
        }
      }
    } catch (error) {
      console.error('Error al verificar la existencia del usuario:', error);
    }
  };

  return (
    <div>
      <div className='formcontainer mt-5 mb-5'>
        <form className='container' >
          <h1 className='display-6'>REGISTER</h1>
          <input
            type="text" id="username" name="username" placeholder="Username" value={nombre} 
            onChange={handleChange} className='form-control mt-4' maxLength={10}
            required
          />
          <input
            type="password" id="password" name="password" placeholder="Password" value={contraseña}
            onChange={handleChange} className='form-control mt-4' maxLength={6}
            required
          />
          <input
            type="password" id="ConfirmPassword" name="ConfirmPassword" placeholder="ConfirmPassword" value={confirmPassword} 
            onChange={handleChange} className='form-control mt-4' maxLength={6}
            required
          />
          <input
            type="email" id="email" name="email" placeholder="Email" value={email} 
            onChange={handleChange} className='form-control mt-4' maxLength={30}
            required
          />
          <div className='d-grid gap-2 mt-4'>
            <button type="button" className='btn btn-primary' onClick={handleSubmit}>
            REGISTER</button>

            <button type="button" className='btn btn-warning' onClick={handleClick}>
              BACK</button>

          </div>
        </form>
      </div>
      <footer>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div>
  );
};

export default Register;