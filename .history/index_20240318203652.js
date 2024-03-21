const express = require('express');

const app = express();

const argv = yargs.argv;

// Define routes
app.get('/report', (req, res) => {
    // Handle report route logic here
    res.send('This is the report route');
});

app.get('/menuEditor', (req, res) => {
    // Handle menuEditor route logic here
    res.send('This is the menuEditor route');
});

app.get('/tables', (req, res) => {
    // Handle tables route logic here
    res.send('This is the tables route');
});

app.get('/tableOrder', (req, res) => {
    // Handle tableOrder route logic here
    res.send('This is the tableOrder route');
});

app.get('/orderConfirmPayment', (req, res) => {
    // Handle orderConfirmPayment route logic here
    res.send('This is the orderConfirmPayment route');
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


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


// Example migration
const migrationName = 'create_users_table';
const migrationQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )
`;


// Call createMigrationTable to ensure the migration table exists
createMigrationTable();

// Define a migration command
if (argv.migrate) {
    // Call runMigration to execute the example migration
    runMigration(migrationName, migrationQuery);

    console.log('Running migration...');
}
