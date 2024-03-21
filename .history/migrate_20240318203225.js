require('dotenv').config()

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
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

