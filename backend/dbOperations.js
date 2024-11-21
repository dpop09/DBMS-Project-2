const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config(); // read from .env file

// create a connection to the database
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

// connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

const dbOperations = {
    registerClient: async function (email, password, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber) {
        try {
            // generate a random client id
            const client_id = Math.floor(10000000 + Math.random() * 90000000)
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO client (client_id, password, f_name, l_name, address, cc_number, cc_security_code, cc_expiration_date, cc_holder_name, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [client_id, hashedPassword, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber, email];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(-1);
                    } else {
                        resolve(1);
                    }
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    doesEmailExist: async function (email) {
        try {
            const sql = 'SELECT * FROM client WHERE email = ?';
            const values = [email];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0] ? true : false);
                    }
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    signinClient: async function (email, password) {
        try {
            const sql = 'SELECT * FROM client WHERE email = ?';
            const values = [email];
            // check if the client exists
            const client = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });
            if (!client) {
                return false;
            }
            // check if the password is correct
            const isMatch = await bcrypt.compare(password, client.password);
            return isMatch;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getAll: async function () {
        try {
            const sql = 'SELECT * FROM client';
            const response = await new Promise((resolve, reject) => {
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
}


module.exports = dbOperations