const mysql = require('mysql');
const algoliasearch = require('algoliasearch');
const client = algoliasearch("<enter_app_id> , <enter_api_key>");
const index = client.initIndex("<index_to_be_targeted");

// support for huge records 
const _ = require("lodash");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "user",
    password: "password",
    database: "education"
});

connection.connect()
connection.query("SELECT * FROM actors_big", (err, results) => {
    if (err) throw err;
    // this can be used directly for smaller files but for 
    // larger records , simply break the file down into smaller
    // parts and then push them individually
    // index.addObjects(results);
    const chunks = _.chunk(results, 1000);
    chunks.forEach(chunk => index.addObjects(chunk));
});
connection.end();