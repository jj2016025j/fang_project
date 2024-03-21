require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();

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

// 手機掃描端
app.get('/', (req, res) => {
    res.redirect('/order');
});

app.get('/order', (req, res) => {
    // Handle report route logic here
    res.send('This is the report route');
});

// 商家平板端
app.get('/shop/report', (req, res) => {
    // Handle report route logic here
    res.send('This is the report route');
});

app.get('/shop/menuEditor', (req, res) => {
    // Handle menuEditor route logic here
    res.send('This is the menuEditor route');
});

app.get('/shop/tables', (req, res) => {
    // Handle tables route logic here
    res.send('This is the tables route');
});

app.get('/shop/tableOrder', (req, res) => {
    // Handle tableOrder route logic here
    res.send('This is the tableOrder route');
});

app.get('/shop/orderConfirmPayment', (req, res) => {
    // Handle orderConfirmPayment route logic here
    res.send('This is the orderConfirmPayment route');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
