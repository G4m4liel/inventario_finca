const express = require('express');
const cors = require('cors');
const database = require('./database/database');
// const { Date } = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());



//chart
app.get('/api/graficas', async (req, res) => {
  try {
      // Conectarse a la base de datos
      await sql.connect(config);
      // Realizar una consulta a la base de datos
      const result = await sql.query('SELECT * FROM graficas');
       // Enviar los resultados al cliente
      res.send(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error de servidor');
    } finally {
      // Cerrar la conexión después de realizar la consulta
      await database.close();
    }
  });


//graficas que sirve
app.get('/api/grafica/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('select count(area) as N_Tools, area from herramientas group by area');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});


//menu
app.get('/api/reporte/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('select empleado.nombre, tipo_cultivo, etapa, fecha_ini, fecha_fin, observaciones from empleado inner join operaciones_agricolas on id_empleado =encargado');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////
//LOGIN

// Reading 
app.post('/api/login/acceso', async (req, res) => {
  try {
    const {nombre, contraseña} = req.body;

    await database.connect();
    const result = await database.readData(
      `select nombre, contraseña from usuario where nombre = '${nombre}' and contraseña = '${contraseña}'`
      );

    if (result.length > 0) {
      // Si se encuentra un usuario, puede redirigir o realizar otras acciones según sea necesario
      res.send({ success: true, message: 'Acceso permitido' });
    } else {
      // Si no se encuentra un usuario, mostrar un mensaje de error
      res.status(401).send({ success: false, message: 'Usuario no encontrado. Por favor, regístrese.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});


// Compare Date for register 
app.post('/api/user/check', async (req, res) => {
  try {
    const {nombre, correo} = req.body;

    await database.connect();
    const result = await database.readData(
      `select nombre, correo from usuario where nombre = '${nombre}' and correo = '${correo}'`
      );
      console.log(result);

    if (result.length === 0) {
      // Si se encuentra un usuario, puede redirigir o realizar otras acciones según sea necesario
      res.send({ success: true, message: 'No existe este usuario' });
    } else {
      // Si no se encuentra un usuario, mostrar un mensaje de error
      res.status(401).send({ success: false, message: 'El usuario ya existe, por favor use otro nombre y correo' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});







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
    const { nombre, apellido, cargo, correo } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO empleado ( nombre, apellido, cargo, correo) VALUES ('${nombre}', '${apellido}', '${cargo}', '${correo}')`
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
    const { nombre, contraseña, correo} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO usuario ( nombre, contraseña, correo) VALUES ( '${nombre}', '${contraseña}','${correo}')`
    );
    res.send({ success: true, message: 'Registro Exitoso' });
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

app.get('/api/herramienta/reading/:id_herramienta', async (req, res) => {
  const { id_herramienta } = req.params;
  try {
    await database.connect();
    const result = await database.readData(`SELECT * FROM herramientas where id_herramienta = ${id_herramienta}`);
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
    const { nombre, area, tipo, existencia, localizacion} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO herramientas ( nombre, area, tipo, existencia, localizacion) VALUES ( '${nombre}', '${area}','${tipo}', '${existencia}', '${localizacion}')`
    );

    // res.send(result);
    res.json({ success: true, message: 'Registro exitoso', data: result });
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
    const { nombre, tipo, descripcion, ubicacion } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO implementos ( nombre, tipo, descripcion, ubicacion) VALUES ( '${nombre}', '${tipo}', '${descripcion}', '${ubicacion}')`
    );

    res.json({ success: true, message: 'Registro exitoso', data: result });
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
    const { nombre, tipo, marca } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO lubricantes ( nombre, tipo, marca) VALUES ( '${nombre}', '${tipo}', '${marca}')`
    );

    res.json({ success: true, message: 'Registro exitoso', data: result });
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
    const { nombre, n_serie, matricula, modelo, marca, tipo_combustible, tipo_lubricante} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO maquinaria ( nombre, n_serie, matricula, modelo, marca, tipo_combustible, tipo_lubricante) VALUES ( '${nombre}', '${n_serie}','${matricula}', '${modelo}', '${marca}', '${tipo_combustible}', '${tipo_lubricante}')`
    );

    res.json({ success: true, message: 'Registro exitoso', data: result });
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






/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD HUERTO


// Reading 
app.get('/api/huerto/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM huerto');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/huerto/insert', async (req, res) => {
  try {
    const { tipo_planta, estado, tamaño_poblacion, ubicacion, descripcion} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO huerto ( tipo_planta, estado, tamaño_poblacion, ubicacion, descripcion ) VALUES ( '${tipo_planta}', '${estado}','${tamaño_poblacion}', '${ubicacion}', '${descripcion}' )`
    );

    res.json({ success: true, message: 'Registro exitoso', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});

// Update
app.put('/api/huerto/update/:id_huerto', async (req, res) => {
  try {
    const { id_huerto } = req.params;
    const { tipo_planta, estado, tamaño_poblacion, ubicacion, descripcion } = req.body;

    await database.connect();
    const result = await database.updateData(
  `UPDATE huerto SET tipo_planta='${tipo_planta}', estado='${estado}', tamaño_poblacion='${tamaño_poblacion}', ubicacion='${ubicacion}', descripcion='${descripcion}' WHERE id_huerto='${id_huerto}'`
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
app.delete('/api/huerto/delete/:id_huerto', async (req, res) => {
  try {
    const { id_huerto } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM huerto WHERE id_huerto='${id_huerto}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});







/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD PRODUCTOS


// Reading 
app.get('/api/producto/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('SELECT * FROM productos');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/producto/insert', async (req, res) => {
  try { 
    const { huerto, nombre_producto, tipo, modo_uso, existencia } = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO productos ( huerto, nombre_producto, tipo, modo_uso, existencia ) VALUES ( '${huerto}', '${nombre_producto}','${tipo}', '${modo_uso}', '${existencia}' )`
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
app.put('/api/producto/update/:id_producto', async (req, res) => {
  try {
    const { id_producto } = req.params;
    const { huerto, nombre_producto, tipo, modo_uso, existencia } = req.body;

    await database.connect();
    const result = await database.updateData(
  `UPDATE productos SET huerto='${huerto}', nombre_producto='${nombre_producto}', tipo='${tipo}', modo_uso='${modo_uso}', existencia='${existencia}' WHERE id_producto='${id_producto}'`
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
app.delete('/api/producto/delete/:id_producto', async (req, res) => {
  try {
    const { id_producto } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM productos WHERE id_producto='${id_producto}'`);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sql');
  } finally {
    await database.close();
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////////
//CRUD MANTENIMIENTO_MAQUINARIA


// Reading 
app.get('/api/mantenimientomaquina/reading', async (req, res) => {
  try {
    await database.connect();
    const result = await database.readData('select  maquinaria.nombre as lamaquina, fecha_mantenimiento, tipo_mantenimiento, descripcion_mantenimiento, empleado.nombre elempleado, cargo from maquinaria inner join mantenimiento_maquinaria on id_maquina = maquina inner join empleado on responsable = id_empleado');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  } finally {
    await database.close();
  }
});

// create
app.post('/api/mantenimientomaquina/insert', async (req, res) => {
  try {
    const { maquina, fecha_mantenimiento, tipo_mantenimiento, descripcion_mantenimiento, responsable, observaciones} = req.body;

    await database.connect();
    const result = await database.createData(
      `INSERT INTO mantenimiento_maquinaria ( maquina, fecha_mantenimiento, tipo_mantenimiento, descripcion_mantenimiento, responsable, observaciones) VALUES ( '${maquina}', '${fecha_mantenimiento}','${tipo_mantenimiento}', '${descripcion_mantenimiento}', '${responsable}', '${observaciones}' )`
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
app.put('/api/mantenimientomaquina/update/:id_mant_maquina', async (req, res) => {
  try {
    const { id_mant_maquina } = req.params;
    const { maquina, fecha_mantenimiento, tipo_mantenimiento, descripcion_mantenimiento, responsable, observaciones} = req.body;

    await database.connect();
    const result = await database.updateData(
  `UPDATE mantenimiento_maquinaria SET maquina='${maquina}', fecha_mantenimiento='${fecha_mantenimiento}', tipo_mantenimiento='${tipo_mantenimiento}', descripcion_mantenimiento='${descripcion_mantenimiento}', responsable='${responsable}', observaciones='${observaciones}' WHERE id_mant_maquina='${id_mant_maquina}'`
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
app.delete('/api/mantenimientomaquina/delete/:id_mant_maquina', async (req, res) => {
  try {
    const { id_mant_maquina } = req.params;

    await database.connect();
    const result = await database.deleteData(`DELETE FROM mantenimiento_maquinaria WHERE id_mant_maquina='${id_mant_maquina}'`);

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