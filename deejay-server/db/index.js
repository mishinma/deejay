const { Pool } = require('pg');



const pool = new Pool({
	host: 'localhost',
	user: 'deejay',
	password: 'asdf',
	database: 'deejay'
});

// const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
//
// module.exports = {
//   query: (text, params) => pool.query(text, params)
// }
