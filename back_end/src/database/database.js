const sql = require('mssql');


const config = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'FINCA_INV',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

async function connect() {
  try {
    await sql.connect(config);
  } catch (err) {
    console.error(err);
    throw new Error('Error de conexión a la base de datos');
  }
}

async function close() {
  try {
    await sql.close();
  } catch (err) {
    console.error(err);
    throw new Error('Error al cerrar la conexión a la base de datos');
  }
}

async function readData(query) {
  try {
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error(err);
    throw new Error('Error al leer datos de la base de datos');
  }
}

async function createData(query) {
  try {
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error(err);
    throw new Error('Error al insertar datos en la base de datos');
  }
}

async function updateData(query) {
    try {
      const result = await sql.query(query);
      return result.recordset;
    } catch (err) {
      console.error(err);
      throw new Error('Error al actualizar datos en la base de datos');
    }
  }
  
  async function deleteData(query) {
    try {
      const result = await sql.query(query);
      return result.recordset;
    } catch (err) {
      console.error(err);
      throw new Error('Error al eliminar datos de la base de datos');
    }
  }

module.exports = { connect, close, readData, createData, updateData, deleteData};