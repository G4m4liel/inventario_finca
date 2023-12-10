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


// Configuración y arranque del servidor
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});