const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
    user: "JYOTI_DATABASE",
    password: "123456",
    // Thin Mode connection string
    connectString: "localhost:1521/xe"
};

async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Successfully connected to Oracle Database!');
        return connection;
    } catch (err) {
        console.error('Error connecting to Oracle DB:', err);
        throw err;
    }
}

module.exports = { getConnection };