require('dotenv').config()
const mysql = require('mysql');
const fs = require('fs');
const path = require('path')
const mime = require('mime-types')

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Repository functions
const repository = {
    genearteTradeNo: ()=> {
        return 'ORD' + Date.now() + Math.random().toString(36).substring(4);
    },
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
    uploadImage: (file, target_path) => {
        var tmp_path = file.path;
        var image_name = Date.now() + '_' + Math.random().toString(36).substring(7) + '.' + mime.extension(file.mimetype);
        var target_path = target_path + '/' + image_name;
        fs.rename(tmp_path, target_path, function(err) {});
        return image_name;
    },
    uploadFood: async(formData, imageFile) => {
        return new Promise((resolve, reject) => {
            const image_name = repository.uploadImage(imageFile, './public/uploads/foods');
            const image_path = '/uploads/foods/' + image_name;
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query('INSERT INTO foods (name, price, category_id, image_url) VALUES(?,?,?,?)', [
                    formData['item-name'], 
                    formData['item-price'],
                    formData['select-type'],
                    image_path
                ], (error, results) => {
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
    editFood: async(id, formData, imageFile) => {
        return new Promise((resolve, reject) => {
            var image_path = '';
            if(imageFile){
                const image_name = repository.uploadImage(imageFile, './public/uploads/foods');
                image_path = '/uploads/foods/' + image_name;
            }

            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                var sqlStr = `UPDATE foods SET name = ?, price = ?, category_id = ?`;
                var values = [formData['item-name'], formData['item-price'], formData['select-type']];
                if(image_path){
                    sqlStr += `, image_url = ?`;
                    values.push(image_path)
                }
                sqlStr += ` WHERE id = ?`;
                values.push(id);

                connection.query(sqlStr, values, (error, results) => {
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
    deleteFood: async(id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query('DELETE FROM foods where id = ?', [id], (error, results) => {
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
    addTableOrder: async(tableNum) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query('SELECT * FROM table_orders WHERE order_status = 1 AND table_number = ?', [tableNum], (error, results) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    if(results.length > 0){
                        reject('此桌號目前已有訂單');
                    }else{
                        connection.query('INSERT INTO table_orders (trade_no, table_number) VALUES(?,?)', [
                            repository.genearteTradeNo(),
                            tableNum 
                        ], (error, results) => {
                            connection.release();
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(results)
                        });
                    }
                });
            });
        })
    },    
   
};

module.exports = repository;