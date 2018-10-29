'use strict'
var con = require('./config/configure');
var app = require('./app');

con.db.connect().then( () => {
   //console.log('Node se conecta correctamente a Postgresql');
   app.listen( con.port, () =>{
        console.log('Servidor corriendo en http://localhost:'+con.port);
   });
});