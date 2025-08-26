const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

// Oracle Instant Client initialization code is removed for Thin Mode.
// This will fix the DPI-1047 error permanently.

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', ratingRoutes);

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
    db.getConnection()
        .then(conn => {
            console.log("Database connection successful!");
            if (conn) {
                conn.close();
            }
        })
        .catch(err => {
            console.error("\n!!! DATABASE CONNECTION FAILED !!!");
            console.error("Please check your credentials in 'config/db.js' and ensure Oracle DB is running.");
        });
});