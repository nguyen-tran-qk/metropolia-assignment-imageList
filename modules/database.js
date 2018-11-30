'user strict';
const mysql = require('mysql2');
require('dotenv').config();

const connect = () => {
  const x= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  });
  console.log('connected');
  return x;
};

const select = (connection, res, next) => {
  connection.query('SELECT * FROM things', (err, results, fields) => {
		res.send(results);
	});
};

const insert = (connection, data, res, next) => {
  connection.execute(
		'INSERT INTO things (category, title, details, image, thumbnail, original, coordinates) VALUE (?,?,?,?,?,?,?);', data,
		() => {
			res.send('ok');
		}
	);
};

const remove = (connection, id, res)=>{
  connection.query('DELETE FROM things WHERE id = ?', id, () => {
		res.send('deleted ' + id);
	});
};

const update = (connection, data, res)=>{
  connection.execute('UPDATE things SET category = ?,title = ?,details = ? WHERE id = ?', data, () => {
		res.send('updated ' + data.id);
	});
};

const search = (connection, req, res) => {
  connection.query( `SELECT * FROM things WHERE  ${req.body.type}=?`, req.body.search, (err, results, fields) => {
		res.send(results);
	});
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  remove: remove,
  update: update,
  search: search
};