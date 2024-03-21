require('dotenv').config()
var mysql = require('mysql');

//CREATE DATABASE restaurant_order CHARACTER SET utf8 COLLATE utf8_general_ci;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1qaz@WSX',
    database: 'restaurant_order'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Create migration table if it doesn't exist
const createMigrationTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    connection.query(query, (err) => {
        if (err) {
            console.error('Error creating migration table:', err);
        }
    });
};


// Run migration
const runMigration = (migrationName, migrationQuery) => {
    const query = `
        INSERT INTO migrations (name) VALUES ('${migrationName}')
    `;
    connection.query(query, (err) => {
        if (err) {
            if(err.code !== 'ER_DUP_ENTRY'){
                console.error('Error running migration:', err);
            }
        }else{
            console.log(`Migration '${migrationName}' executed successfully`);
            connection.query(migrationQuery, (err) => {
                if (err) {
                    console.error('Error running migration query:', err);
                }
            });
        }
    });
};

createMigrationTable();
runMigration('create_foods_category_table', `
    CREATE TABLE IF NOT EXISTS foods_category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        sort INT DEFAULT 0
    )
`);
runMigration('create_foods_table', `
    CREATE TABLE IF NOT EXISTS foods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        price INT NOT NULL,
        image_url TEXT NULL,
        sort INT DEFAULT 0
    )
`);

// process.exit(1);

