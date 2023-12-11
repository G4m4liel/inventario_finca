import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import NavBar from '/components/navbar';
import axios from 'axios';

const ImplementsList = () => {
  const router = useRouter();
  const [implementos, setImplements] = useState([]);
  const [searchText, setSearchText] = useState('');

  const columns = [
    { name: 'ID', selector: 'id_implemento', sortable: true, width: '10%' },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Tipo', selector: 'tipo', sortable: true },
    { name: 'Descripcion', selector: 'descripcion', sortable: true },
    { name: 'Ubicacion', selector: 'ubicacion', sortable: true },
    {
      name: 'Acciones', width: '20%',
      cell: (row) => (
        <>
        <button
            className="btn btn-outline-warning mr-4"
            onClick={() => {
              console.log(row.id_implemento);
              handleEditar(row.id_implemento);
            }}
          >
            Edit
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button
            className="btn btn-outline-danger ml-4"
            onClick={() => handleBorrar(row.id_implemento)}
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
    // Llamada a la API para obtener todas las implemento
    const fetchImplements = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/implemento/reading');
        setImplements(response.data);
      } catch (error) {
        console.error('Error al obtener los implementos:', error);
      }
    };
    fetchImplements();
  }, []); // [] para que useEffect solo se ejecute una vez

  const handleEditar = async (id) => {
    await router.push(`/post/implements/${id}/edit`);
    console.log(id);
  };

  const handleBorrar = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este implemento?');

    if (confirmacion) {
      // Llamada a la API para borrar la implemento
      axios
        .delete(`http://localhost:8082/api/implemento/delete/${id}`)
        .then((response) => {
          // Actualizar el estado después de borrar la implemento
          setImplements(implementos.filter((implemento) => implemento.id_implemento !== id));
        })
        .catch((error) => {
          console.error('Error al borrar el implemento:', error);
        });
    }
  };

  // Filtrar los implementos basándonos en el texto de búsqueda
  const filteredImplementos = implementos.filter((implemento) =>
    Object.values(implemento).some(
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
          data={filteredImplementos}
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

export default ImplementsList;