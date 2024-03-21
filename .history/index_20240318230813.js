require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();
const dataRep = require('./data_repository');
const bodyParser = require('body-parser')
const multer  = require('multer')
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage})
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

app.get('/shop', (req, res) => {
    res.redirect('/shop/tables');
});

//報表
app.get('/shop/report', (req, res) => {
    res.render('pages/report/index');
});

//食材管理
app.get('/shop/foodEditor', async(req, res) => {
    var categories = await dataRep.getFoodCateories()
    var foods = await dataRep.getFoods()
    console.log(categories)
    res.render('pages/food_edit/index', {
        categories: categories,
        foods: foods
    });
});

//座位管理
app.get('/shop/tables', (req, res) => {
    res.render('pages/tables/index');
});

//座位訂單編輯
app.get('/shop/tableOrder', (req, res) => {
    res.render('pages/tables_order/index');
});

//確認付款
app.get('/shop/orderConfirmPayment', (req, res) => {
    res.render('pages/order_confirm_payment/index');
});

/**
 * API
 */
//新增食物
app.post('/api/foods', upload.single('item-img'), async(req, res) => {
    let formData = req.body;
    console.log('form data', formData, req.file);

    var tmp_path = req.file.path;
    var image_name = Math.random().toString(36).substring(7) + req.file.originalname;
    var target_path = './public/uploads/' + image_name;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    res.status(200).send(formData);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
