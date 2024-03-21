require('dotenv').config()
var mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: '172.19.0.5',
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
    const query = `
        INSERT INTO migrations (name) VALUES ('${migrationName}')
    `;
    connection.query(query, (err) => {
        if (err) {
            console.error('Error running migration:', err);
            return;
        }
        console.log(`Migration '${migrationName}' executed successfully`);
        connection.query(migrationQuery, (err) => {
            if (err) {
                console.error('Error running migration query:', err);
            }
        });
    });
};

