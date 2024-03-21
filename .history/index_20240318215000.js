require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();
app.set('view engine', 'ejs');
// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

//public assetes
app.use(express.static('public'))

// 手機掃描端
app.get('/', (req, res) => {
    res.redirect('/order');
});
app.get('/order', (req, res) => {
    res.render('pages/order/index');
});

/**
 * 商家平板端
 */

//報表
app.get('/shop/report', (req, res) => {
    res.render('pages/report/index');

});

//食材管理
app.get('/shop/foodEditor', (req, res) => {
    res.render('pages/food_edit/index');
});

//座位管理
app.get('/shop/tables', (req, res) => {
    // Handle tables route logic here
    res.send('This is the tables route');
});

//座位訂單編輯
app.get('/shop/tableOrder', (req, res) => {
    // Handle tableOrder route logic here
    res.send('This is the tableOrder route');
});

//確認付款
app.get('/shop/orderConfirmPayment', (req, res) => {
    // Handle orderConfirmPayment route logic here
    res.send('This is the orderConfirmPayment route');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
