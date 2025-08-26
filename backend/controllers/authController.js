const oracledb = require('oracledb');
const db = require('../config/db');
const bcrypt = require('bcryptjs'); // <-- Is line ko add karein

// Add a function to validate user data on the server side
const validateUserData = (name, email, password) => {
    // Name validation: Min 20, Max 60 characters
    if (name.length < 10 || name.length > 60) {
        return "Name must be between 20 and 60 characters long.";
    }

    // Email validation: Standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }

    // Password validation: 8-16 characters, 1 uppercase, 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,16})/;
    if (!passwordRegex.test(password)) {
        return "Password must be 8-16 characters and include at least one uppercase letter and one special character (!@#$&*).";
    }

    return null; // Return null if all validations pass
};

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    let connection;

    // Perform server-side validation
    const validationError = validateUserData(name, email, password);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        connection = await db.getConnection();
        
        // Check if user already exists
        const checkSql = `SELECT id FROM users WHERE email = :email`;
        const checkResult = await connection.execute(checkSql, [email]);
        if (checkResult.rows.length > 0) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // Generate password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (name, email, password, role) VALUES (:name, :email, :hashedPassword, :role)`;
        const binds = {
            name,
            email,
            hashedPassword, // <-- Hashed password store karein
            role: role || 'customer'
        };
        const options = { autoCommit: true };

        await connection.execute(sql, binds, options);

        res.status(201).json({ message: 'User created successfully!' });

    } catch (err) {
        console.error(">>> ASLI REGISTER ERROR:", err); 
        res.status(500).json({ message: "Failed to register user. Please try again." });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let connection;

    try {
        connection = await db.getConnection();
        const sql = `SELECT id, name, email, password, role FROM users WHERE email = :email`;
        const result = await connection.execute(sql, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        
        // Password ko compare karein
        const isMatch = await bcrypt.compare(password, user.PASSWORD);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user.ID,
            name: user.NAME,
            email: user.EMAIL,
            role: user.ROLE,
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
};