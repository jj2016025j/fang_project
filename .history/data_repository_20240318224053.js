require('dotenv').config()
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Repository functions
const repository = {
    create: (data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query('INSERT INTO your_table SET ?', data, (error, results) => {
                connection.release();
                if (error) {
                    callback(error);
                    return;
                }

                callback(null, results.insertId);
            });
        });
    },
    getFoods: async () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query('SELECT * FROM foods', (error, results) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results)
                });
            });
        })
    },
    getFoodCateories: async () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query('SELECT * FROM foods_category ORDER BY sort ASC', (error, results) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results)
                });
            });
        })
    },

    update: (id, data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query('UPDATE your_table SET ? WHERE id = ?', [data, id], (error, results) => {
                connection.release();
                if (error) {
                    callback(error);
                    return;
                }

                callback(null, results.affectedRows);
            });
        });
    },

    delete: (id, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query('DELETE FROM your_table WHERE id = ?', id, (error, results) => {
                connection.release();
                if (error) {
                    callback(error);
                    return;
                }

                callback(null, results.affectedRows);
            });
        });
    },
};

module.exports = repository;