"use client";
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/navbar';
import {useRouter} from 'next/navigation';
import axios from 'axios';



const HerramientasList = () => {
    const router = useRouter();
    const [herramientas, setHerramientas] = useState([]);

  const handleClick = () => {
    // Redirige a la ruta deseada cuando se hace clic en el botón
    router.push('./add');
  };
  
  useEffect(() => {
    // Llamada a la API para obtener todas las herramientas
    const fetchHerramientas = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/herramienta/reading');
        setHerramientas(response.data);
      } catch (error) {
        console.error('Error al obtener las herramientas:', error);
      }
    };
    fetchHerramientas();
  }, []); // [] para que useEffect solo se ejecute una vez

  const handleEditar = async (id) => {
    await router.push(`/post/tools/${id}/edit`);
    console.log(id);
  };
  
  const handleBorrar = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esta herramienta?');

    if (confirmacion) {
      // Llamada a la API para borrar la herramienta
      axios.delete(`http://localhost:8082/api/herramienta/delete/${id}`)
        .then(response => {
          // Actualizar el estado después de borrar la herramienta
          setHerramientas(herramientas.filter(herramienta => herramienta.id_herramienta !== id));
        })
        .catch(error => {
          console.error('Error al borrar la herramienta:', error);
        });
    }
  };

  return (
  <div>
    <NavBar/>
    <div className="container-fluid">
      <div className='row mt-3'>
        <div className='col-md-4'>
          <form className="d-flex" role="search">
            <input className="form-control me-5" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-2 offset-10'>
          <div className='d-grid mx-auto'>
          <button type="button" className="btn btn-outline-primary"
            data-bs-toggle="modal" data-bs-target="#modalHerramientas" onClick={handleClick}>Add
          </button>
          </div>
        </div>
      </div>
    </div>
    <div className='container fluid'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th> <th>Nombre</th> <th>Área</th> <th>Tipo</th> <th>Existencia</th> <th>Localización</th> <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {herramientas.map(herramienta => (
            <tr key={herramienta.id_herramienta}>
              <td>{herramienta.id_herramienta}</td>
              <td>{herramienta.nombre}</td>
              <td>{herramienta.area}</td>
              <td>{herramienta.tipo}</td>
              <td>{herramienta.existencia}</td>
              <td>{herramienta.localizacion}</td>
              <td>
                <button className="btn btn-outline-warning mr-4" 
                onClick={() => {console.log(herramienta.id_herramienta);
                  handleEditar(herramienta.id_herramienta)}}>Editar</button>
                &nbsp;
                <button className="btn btn-outline-danger ml-4" onClick={() => handleBorrar(herramienta.id_herramienta)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <div id='modalHerramientas' className="modal fade" aria-hidden='true'>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <label className='h5'>la puta te pario</label>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type='hidden' id='id'></input>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='nombre' className='form-control' placeholder='Name' 
              value={nombre} onChange={(e)=> setName(e.target.value)}></input>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> */}
  </div>
  );
};

export default HerramientasList;

{/* <button className="btn btn-outline-warning mr-4" data-bs-toggle="modal" data-bs-target="#editar"
                    onClick={() =>  handleEditar(herramienta.id_herramienta)}>Editar</button> */}


{/* <div className="modal fade" id="editar" tabIndex="-1" aria-labelledby="editarLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editarLabel">Detalles de la Herramienta</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h5>ID: {selectedHerramientaId}</h5>
                Mostrar otros detalles de la herramienta según sea necesario
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> */}