import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/navbar';
import axios from 'axios';

export function Home() {

  const router = useRouter();
  const [implementos, setImplements] = useState([]);
  const [searchText, setSearchText] = useState('');
  const columns = [
    { name: 'Encargado', selector: 'nombre', sortable: true, width: '10%' },
    { name: 'Tipo de Cultivo', selector: 'tipo_cultivo', sortable: true, width: '15%' },
    { name: 'Etapa', selector: 'etapa', sortable: true, width: '15%' },
    { name: 'Fecha inicio', selector: 'fecha_ini', sortable: true, width: '15%'},
    { name: 'Fecha fin', selector: 'fecha_fin', sortable: true, width: '15%' },
    { name: 'Observaciones', selector: 'observaciones', sortable: true },
  ];

  useEffect(() => {
    // Llamada a la API para obtener todas las implemento
    const fetchImplements = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/reporte/reading');
        setImplements(response.data);
      } catch (error) {
        console.error('Error al obtener los implementos:', error);
      }
    };
    fetchImplements();
  }, []); // [] para que useEffect solo se ejecute una vez

  // Filtrar los implementos basándonos en el texto de búsqueda
  const filteredImplementos = implementos.filter((implemento) =>
    Object.values(implemento).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

    return(
    <div>
      <NavBar/>
      <div className='container'>
        <h3>Welcome To Inventory Finca_UNAV</h3>
        <div className='container'>
          <div class="row mb-4">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card cardlocal">
                <div class="card-body">
                  <h5 class="card-title">TOOLS</h5>
                  <p class="card-text">Stocks of all tools inventoried within the Farm department and classified according to their area, type and location.</p>
                  <a href="/post/tools/tools" class="btn btn-primary">Go tools</a>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card cardlocal">
                <div class="card-body">
                  <h5 class="card-title">IMPLEMENTS</h5>
                  <p class="card-text">Stocks of all Implements inventoried within the Farm department and classified according to their area, type and location.</p>
                  <a href="/post/implements/implements" class="btn btn-success">Go implements</a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card cardlocal">
                <div class="card-body">
                  <h5 class="card-title">MACHINERY MAINTENANCE</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="/post/inventory/inventory" class="btn btn-warning">Go maintenance</a>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card cardlocal">
                <div class="card-body">
                  <h5 class="card-title">IMPLEMENT MAINTENANCE</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="/post/graficas/graficas" class="btn btn-dark">Go implements</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container fluid'>
        <h1 className='display-6'>Operaciones Agricolas</h1>
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
      <footer className='bg-dark'>
        <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>
    </div> 
    );
}

export default Home;