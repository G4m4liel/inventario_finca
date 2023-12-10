const express = require('express');
const cors = require('cors');
const database = require('./database/database');

const app = express();

app.use(cors());
app.use(express.json());








/////////////////////////////////////////////////////////////////////////////////////////////
//CRUD EMPLEADO

// Reading 
app.get('/api/empleado/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM empleado');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/empleado/insert', async (req, res) => {
  try {
    const { id_empleado, nombre, apellido, cargo, correo } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO empleado (id_empleado, nombre, apellido, cargo, correo) VALUES ('${id_empleado}', '${nombre}', '${apellido}', '${cargo}', '${correo}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/empleado/update/:id_empleado', async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const { nombre, apellido, cargo, correo } = req.body;

    await database.connect();
    const result = await database.updateData(
      `UPDATE empleado SET nombre='${nombre}', apellido='${apellido}', cargo='${cargo}', correo='${correo}' WHERE id_empleado='${id_empleado}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/empleado/delete/:id_empleado', async (req, res) => {
  try {
    const { id_empleado } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM empleado WHERE id_empleado='${id_empleado}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD USUARIO

// Reading 
app.get('/api/user/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM usuario');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/user/insert', async (req, res) => {
  try {
    const { id, nombre, contraseña, correo} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO usuario (id, nombre, contraseña, correo) VALUES ('${id}', '${nombre}', '${contraseña}','${correo}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/user/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contraseña, correo } = req.body;

    await database.connect();
    const result = await database.updateData(
      `UPDATE usuario SET nombre='${nombre}', contraseña='${contraseña}', correo='${correo}' WHERE id='${id}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/user/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM usuario WHERE id='${id}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD HERRAMIENTAS


// Reading 
app.get('/api/herramienta/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM herramientas');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/herramienta/insert', async (req, res) => {
  try {
    const { id_herramienta, nombre, area, tipo, existencia, localizacion} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO herramientas (id_herramienta, nombre, area, tipo, existencia, localizacion) VALUES ('${id_herramienta}', '${nombre}', '${area}','${tipo}', '${existencia}', '${localizacion}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/herramienta/update/:id_herramienta', async (req, res) => {
  try {
    const { id_herramienta } = req.params;
    const { nombre, area, tipo, existencia, localizacion} = req.body;

    await database.connect();
    const result = await database.updateData(
      `UPDATE herramientas SET nombre='${nombre}', area='${area}', tipo='${tipo}', existencia='${existencia}', localizacion='${localizacion}' WHERE id_herramienta='${id_herramienta}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/herramienta/delete/:id_herramienta', async (req, res) => {
  try {
    const { id_herramienta } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM herramientas WHERE id_herramienta='${id_herramienta}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////
//CRUD IMPLEMENTOS

// Reading 
app.get('/api/implemento/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM implementos');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/implemento/insert', async (req, res) => {
  try {
    const { id_implemento, nombre, tipo, descripcion, ubicacion } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO implementos (id_implemento, nombre, tipo, descripcion, ubicacion) VALUES ('${id_implemento}', '${nombre}', '${tipo}', '${descripcion}', '${ubicacion}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/implemento/update/:id_implemento', async (req, res) => {
  try {
    const { id_implemento } = req.params;
    const { nombre, tipo, descripcion, ubicacion } = req.body;

    await database.connect();
    const result = await database.updateData(
      `UPDATE implementos SET nombre='${nombre}', tipo='${tipo}', descripcion='${descripcion}', ubicacion='${ubicacion}' WHERE id_implemento='${id_implemento}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/implemento/delete/:id_implemento', async (req, res) => {
  try {
    const { id_implemento } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM implementos WHERE id_implemento='${id_implemento}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////
//CRUD LUBRICANTES

// Reading 
app.get('/api/lubricante/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM lubricantes');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/lubricante/insert', async (req, res) => {
  try {
    const { id_lubricante, nombre, tipo, marca } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO lubricantes (id_lubricante, nombre, tipo, marca) VALUES ('${id_lubricante}', '${nombre}', '${tipo}', '${marca}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/lubricante/update/:id_lubricante', async (req, res) => {
  try {
    const { id_lubricante } = req.params;
    const { nombre, tipo, marca } = req.body;

    await database.connect();
    const result = await database.updateData(
      `UPDATE lubricantes SET nombre='${nombre}', tipo='${tipo}', marca='${marca}' WHERE id_lubricante='${id_lubricante}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/lubricante/delete/:id_lubricante', async (req, res) => {
  try {
    const { id_lubricante } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM lubricantes WHERE id_lubricante='${id_lubricante}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD MAQUINARIA


// Reading 
app.get('/api/maquina/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM maquinaria');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/maquina/insert', async (req, res) => {
  try {
    const { id_maquina, nombre, n_serie, matricula, modelo, marca, tipo_combustible, tipo_lubricante} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO maquinaria (id_maquina, nombre, n_serie, matricula, modelo, marca, tipo_combustible, tipo_lubricante) VALUES ('${id_maquina}', '${nombre}', '${n_serie}','${matricula}', '${modelo}', '${marca}', '${tipo_combustible}', '${tipo_lubricante}')`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/maquina/update/:id_maquina', async (req, res) => {
  try {
    const { id_maquina } = req.params;
    const { nombre, n_serie, matricula, modelo, marca, tipo_combustible, tipo_lubricante} = req.body;

    await database.connect();
    const result = await database.updateData(
  `UPDATE maquinaria SET nombre='${nombre}', n_serie='${n_serie}', matricula='${matricula}', modelo='${modelo}', marca='${marca}', tipo_combustible='${tipo_combustible}', tipo_lubricante='${tipo_lubricante}' WHERE id_maquina='${id_maquina}'`
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Delete
app.delete('/api/maquina/delete/:id_maquina', async (req, res) => {
  try {
    const { id_maquina } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM maquinaria WHERE id_maquina='${id_maquina}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});










// Configuración y arranque del servidor
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});