'use strict'
var con = require('../config/configure');


function getEstudiantes(req, res){
    var por_pagina = 2;
    var pagina = req.params.pag;
    console.log('pag: ',pagina);
    if( pagina == null ){
       var pag = pagina;
    }else{
       var pag = 1;
    }

    //'SELECT nombres, apellidop, apellidom, cedula, paralelo, anolectivo, fecha_creacion, fecha_modificacion, estado FROM public.estudiante;'
   // "SELECT count(*) as cuantos from $tabla";

  con.db.any('SELECT count(*) as cuantos from public.estudiante;')
  .then(function (cuantos) {
  // console.log(cuantos[0].cuantos);
      cuantos =  cuantos[0].cuantos;
      var total_paginas = Math.ceil( cuantos / por_pagina );
     // console.log(total_paginas);

      if( pagina > total_paginas ){
          pagina = total_paginas;
      }
      pagina -= 1;  // 0
      var desde   = pagina * por_pagina; // 0 * 20 = 0

      if( pagina >= total_paginas-1 ){
        var pag_siguiente = 1;
      }else{
        var pag_siguiente = pagina + 2;
      }

      if( pagina < 1 ){
         var pag_anterior = total_paginas;
      }else{
         var pag_anterior = pagina;
      }
      console.log('pag: ',pagina);
      console.log('desde: ',desde);
      console.log('por pagina: ',por_pagina);
      console.log('Total paginas : ',total_paginas);
      console.log('pag siguiente: ',pag_siguiente);
      console.log('pag anterior: ',pag_anterior);

      con.db.any('SELECT nombres, apellidop, apellidom, cedula, paralelo, anolectivo, fecha_creacion, fecha_modificacion, estado FROM public.estudiante LIMIT '+ por_pagina + ' OFFSET '+ desde)
          .then(function (data) {

               let infEstudiantes =[ { infoPersonas : data } ];

              var arrPaginas = [];
              for (var i=0; i < total_paginas; i++) {
                  arrPaginas.push(i+1);
              }


                  var respuesta = [{
                      'err':  false,
                      'conteo' : cuantos,
                      'clientes' : infEstudiantes,
                      'pag_actual'  : (pagina+1),
                      'pag_siguiente' : pag_siguiente,
                      'pag_anterior'  : pag_anterior,
                      'total_paginas' : total_paginas,
                      'paginas'	: arrPaginas
                  }];


              res.status(200).send( respuesta );
              });

  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });


}

/*
function obt_infoestudios(req, res){
  var personaId = req.params.id;
  console.log(personaId);
  //con.db.any('SELECT nombre, fechaingreso, fechaactualizacion, paisid FROM "dbHV"."Paises"')
  con.db.any('select *from "dbHV".obt_infoestudios('+ personaId +')')
  .then(function (data) {
    res.status(200).send({ data });
    //console.log(data);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });


}
function obt_infoexpelab(req, res){
  var personaId = req.params.id;
  console.log(personaId);
  //con.db.any('SELECT nombre, fechaingreso, fechaactualizacion, paisid FROM "dbHV"."Paises"')
  con.db.any('select *from "dbHV".obt_infoexpelab('+ personaId +')')
  .then(function (data) {
    res.status(200).send({ data });
    //console.log(data);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });


}
function obtredessociales(req, res){
  var personaId = req.params.id;
  console.log(personaId);
  //con.db.any('SELECT nombre, fechaingreso, fechaactualizacion, paisid FROM "dbHV"."Paises"')
  con.db.any('select *from "dbHV".obtredessociales('+ personaId +')')
  .then(function (data) {
    res.status(200).send({ data });
    //console.log(data);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });


}
function obtskill(req, res){
  var personaId = req.params.id;
  console.log(personaId);
  //con.db.any('SELECT nombre, fechaingreso, fechaactualizacion, paisid FROM "dbHV"."Paises"')
  con.db.any('select *from "dbHV".obtskill('+ personaId +')')
  .then(function (data) {
    res.status(200).send({ data });
    //console.log(data);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });


}*/
module.exports = {
  getEstudiantes
};