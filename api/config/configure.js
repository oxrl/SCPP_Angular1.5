const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://postgres:Majcp071102@localhost:5432/scpp');
const port = process.env.PORT || 3800;

module.exports ={
   db,
   port
}