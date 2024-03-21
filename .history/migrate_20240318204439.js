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
            name VARCHAR(255) NOT NULL,
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
    connection.query(migrationQuery, (err) => {
        if (err) {
            console.error('Error running migration query:', err);
        } else {
            const query = `
                INSERT INTO migrations (name) VALUES ('${migrationName}')
            `;
            connection.query(query, (err) => {
                if (err) {
                    console.error('Error running migration:', err);
                    return;
                }
                console.log(`Migration '${migrationName}' executed successfully`);
            })
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
