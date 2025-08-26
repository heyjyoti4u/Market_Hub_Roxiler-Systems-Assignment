const oracledb = require('oracledb');
const db = require('../config/db');

exports.saveRating = async (req, res) => {
    const { storeId } = req.params;
    const { userId, rating, feedback } = req.body;
    
    if (!userId || !rating) {
        return res.status(400).json({ message: "User ID and rating are required." });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.execute(
            `INSERT INTO store_ratings (store_id, user_id, rating, feedback) VALUES (:storeId, :userId, :rating, :feedback)`,
            { storeId, userId, rating, feedback },
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Rating saved successfully' });

    } catch (err) {
        console.error("Error saving rating:", err);
        res.status(500).json({ message: "Failed to save rating. Please try again." });
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

exports.getRatings = async (req, res) => {
    const { storeId } = req.params;
    let connection;

    try {
        connection = await db.getConnection();

        const sql = `
            SELECT 
                r.id, 
                r.rating, 
                r.feedback, 
                r.created_at, 
                u.name as user_name
            FROM 
                store_ratings r
            JOIN 
                users u ON r.user_id = u.id
            WHERE 
                r.store_id = :storeId
            ORDER BY 
                r.created_at DESC
        `;
        const binds = { storeId };

        const result = await connection.execute(sql, binds);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error getting ratings:", err);
        res.status(500).json({ message: "Failed to fetch ratings." });
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

exports.updateRating = async (req, res) => {
    const { storeId } = req.params;
    const { userId, rating, feedback } = req.body;

    if (!userId || !rating) {
        return res.status(400).json({ message: "User ID and rating are required." });
    }

    let connection;
    try {
        connection = await db.getConnection();
        const sql = `
            UPDATE store_ratings 
            SET rating = :rating, feedback = :feedback 
            WHERE store_id = :storeId AND user_id = :userId
        `;
        const binds = {
            rating,
            feedback,
            storeId,
            userId
        };
        const options = { autoCommit: true };

        await connection.execute(sql, binds, options);

        res.status(200).json({ message: "Rating updated successfully." });
    } catch (err) {
        console.error("Error updating rating:", err);
        res.status(500).json({ message: "Failed to update rating." });
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