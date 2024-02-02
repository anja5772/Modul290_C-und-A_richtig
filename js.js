

/* *******************************************************************************************
* Autor: A. Suter und C. Burkhard, 1/2024
* *******************************************************************************************
* Beschreibung:
* Express-Server, um CRUD-Operationen (Get und Delete) vom Browser entgegen zunehmen an der DB durchzuführen
* *******************************************************************************************
* Hinweise
* npm install node
* npm init -y
* npm install mysql
* npm install body-parser
* npm install express
** ***************************************************************************************** */

const mysql = require("mysql");
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

const config = {
  host: 'localhost',
  database: 'ImmobilienverwaltungDB',
  user: "immoAdmin",
  password: 'immoAdminPW'
}

const connection = mysql.createConnection(config)

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL database:', connection.config.database);
  /*
   var sqlstmt = 'SELECT * from user';
   // Das SQL-Statement wird vorbereitetet
   connection.query(sqlstmt, function (err, result) {
       if (err) throw err;
       // console.log('Data from MySQL:');
       //console.log(result); //
   });
   */
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/standort', (req, res) => {
  connection.query('select * from standort', [req.params.id], (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log(err);
    }

  })
});
app.get('/standort/:id', (req, res) => {
  connection.query('SELECT * FROM standort WHERE id = 2', [req.params.id], (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log(err);
    }

  })
});

app.delete('/standort/:id', (req, res) => {
  connection.query(' DELETE FROM standort WHERE id = 4 ', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send('Delete operation was successful')
      // res.send(rows)
    } else {
      console.log(err);
    }

  })
});


