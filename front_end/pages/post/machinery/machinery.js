import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import NavBar from '/components/navbar';
import axios from 'axios';

const HerramientasList = () => {
  const router = useRouter();
  const [herramientas, setHerramientas] = useState([]);
  const [searchText, setSearchText] = useState('');

  const columns = [
    { name: 'ID', selector: 'id_herramienta', sortable: true, width: '10%' },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Área', selector: 'area', sortable: true },
    { name: 'Tipo', selector: 'tipo', sortable: true },
    { name: 'Existencia', selector: 'existencia', sortable: true },
    { name: 'Localización', selector: 'localizacion', sortable: true },
    {
      name: 'Acciones', width: '20%',
      cell: (row) => (
        <>
        <button
            className="btn btn-outline-warning mr-4"
            onClick={() => {
              console.log(row.id_herramienta);
              handleEditar(row.id_herramienta);
            }}
          >
            Edit
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button
            className="btn btn-outline-danger ml-4"
            onClick={() => handleBorrar(row.id_herramienta)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

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
      axios
        .delete(`http://localhost:8082/api/herramienta/delete/${id}`)
        .then((response) => {
          // Actualizar el estado después de borrar la herramienta
          setHerramientas(herramientas.filter((herramienta) => herramienta.id_herramienta !== id));
        })
        .catch((error) => {
          console.error('Error al borrar la herramienta:', error);
        });
    }
  };

  // Filtrar las herramientas basándonos en el texto de búsqueda
  const filteredHerramientas = herramientas.filter((herramienta) =>
    Object.values(herramienta).some(
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
      <div className='container fluid'>
        <DataTable
          columns={columns}
          data={filteredHerramientas}
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

export default HerramientasList;