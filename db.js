const dbConfig = require('./config/db');
const mysql = require('mysql');
const db = mysql.createConnection(dbConfig);

db.connect();

function parseError(error) {
    if (error) {
        return {
            message: error.message
        }
    }
}

exports.getThings = function(cb) {
    const query = 'SELECT * FROM things ORDER BY created DESC';
    db.query(query, (error, results) => {
        cb(parseError(error), results)
    });
};

exports.createThings = function(things, cb) {
    const query = 'INSERT INTO things SET ?';

    db.query(query, things, (error, results) => {
        cb(parseError(error), results)
    });
};




