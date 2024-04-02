const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar body parser para obtener datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'caso1db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para mostrar el formulario
app.get('/producto', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el formulario y guardar el producto en la base de datos
app.post('/producto', (req, res) => {
  const { nombre, precio } = req.body;
  const producto = { nombre, precio };

  connection.query('INSERT INTO productos SET ?', producto, (error, results, fields) => {
    if (error) throw error;
    console.log('Producto creado con ID:', results.insertId);
    res.redirect('/producto');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
