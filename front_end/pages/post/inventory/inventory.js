import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import NavBar from '/components/navbar';
import axios from 'axios';

const MantenimientoList = () => {
  const router = useRouter();
  const [mantenimiento_maquinaria, setMantenimientoMaquinaria] = useState([]);
  const [searchText, setSearchText] = useState('');

  const columns = [
    { name: 'Machine', selector: 'lamaquina', sortable: true, width: '10%' },
    { name: 'Date Maintenance', selector: 'fecha_mantenimiento', sortable: true },
    { name: 'Type Maintenance', selector: 'tipo_mantenimiento', sortable: true },
    { name: 'Description', selector: 'descripcion_mantenimiento', sortable: true },
    { name: 'In Charge', selector: 'elempleado', sortable: true },
    { name: 'Cargo', selector: 'cargo', sortable: true },
  ];

  const handleClick = () => {
    // Redirige a la ruta deseada cuando se hace clic en el botón
    router.push('./add');
  };

  useEffect(() => {
    // Llamada a la API para obtener todas las herramientas
    const fetchMantenimientoMaquinaria = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/mantenimientomaquina/reading');
        setMantenimientoMaquinaria(response.data);
      } catch (error) {
        console.error('Error al obtener las herramientas:', error);
      }
    };
    fetchMantenimientoMaquinaria();
  }, []); // [] para que useEffect solo se ejecute una vez

  // Filtrar las herramientas basándonos en el texto de búsqueda
  const filteredMantenimiento = mantenimiento_maquinaria.filter((mantenimiento_maquinaria) =>
    Object.values(mantenimiento_maquinaria).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className='row mt-3'>
          <div className='col-md-4'>
            <form className="d-flex" role="search">
              <input
                className="form-control me-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-warning" type="button">
                Search
              </button>
            </form>
          </div>
        </div>
          <div className='col-md-2 offset-10 mb-3'>
            <div className='d-grid mx-auto'>
              <button
                type="button"
                className="btn btn-outline-warning"
                data-bs-toggle="modal"
                data-bs-target="#modalHerramientas"
                onClick={handleClick}
              >
                Add
              </button>
            </div>
          </div>
      </div>
      <div className='container fluid table-tools'>
      <h1 className='display-6'>Maintenance of Machine´s</h1>
        <DataTable
          columns={columns}
          data={filteredMantenimiento}
          pagination
          striped
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="form-control form-control-sm"
            />
          }
          subHeaderAlign="left"
          subHeaderWrap
          subHeaderComponentOptions={{ fullWidth: true }}
          onTableUpdate={() => console.log('Table Updated!')}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
          className="table table-hover"
        />
      </div>
    </div>
  );
};

export default MantenimientoList;