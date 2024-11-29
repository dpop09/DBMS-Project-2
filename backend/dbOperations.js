const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
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
            // generate UUIDs for client and card
            const client_id = uuidv4();
            const card_id = uuidv4();
    
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // insert into client table
            const client_sql = 'INSERT INTO client (client_id, password, first_name, last_name, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const client_values = [client_id, hashedPassword, fname, lname, address, phonenumber, email];
    
            const client_response = await new Promise((resolve, reject) => {
                db.query(client_sql, client_values, (err, result) => {
                    if (err) {
                        console.log('Error inserting into client table:', err);
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            });
    
            // insert into credit_card_info table
            const ccinfo_sql = 'INSERT INTO credit_card_info (card_id, client_id, card_number, name_on_card, cvv, expiry_date) VALUES (?, ?, ?, ?, ?, ?)';
            const ccinfo_values = [card_id, client_id, ccnumber, ccname, ccsecuritycode, ccexpirationdate];
    
            const ccinfo_response = await new Promise((resolve, reject) => {
                db.query(ccinfo_sql, ccinfo_values, (err, result) => {
                    if (err) {
                        console.log('Error inserting into credit_card_info table:', err);
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            });
    
            // return true only if both inserts succeed
            return client_response && ccinfo_response;
    
        } catch (error) {
            console.log('Error in registerClient function:', error);
            return false;
        }
    },    
    isEmailInUse: async function (email) {
        try {
            // select email from client
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

            // return true if email exists
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
    createQuoteRequest : async function (client_id, property_address, square_feet, proposed_price, note) {
        try {
            // get client's full name
            const client_name = await dbOperations.getClientFullName(client_id);

            // append client name to the note with a special delimiter so to know who's note it is
            note = `!@#$%^&*${client_name}!@#$%^&*${note}`;

            // generate UUID for quote_id
            const quote_id = uuidv4();

            // insert into request_for_quote
            const request_status = 'Awaiting Dave\'s Approval';
            const sql = 'INSERT INTO request_for_quote (quote_id, client_id, property_address, square_feet, proposed_price, note, request_status) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [quote_id, client_id, property_address, square_feet, proposed_price, note, request_status];

            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.log('Error inserting into request_for_quote table:', err);
                        reject(false);
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
    getAllQuoteRequests: async function () {
        try {
            const sql = 'SELECT * FROM request_for_quote';
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
    getDrivewayPictures: async function (quote_id) {
        try {
            const sql = 'SELECT picture_id, quote_id, picture_data FROM driveway_pictures WHERE quote_id = ?';
            const response = await new Promise((resolve, reject) => {
                db.query(sql, [quote_id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Convert BLOBs to Base64
                        const pictures = results.map(row => {
                            return {
                                picture_id: row.picture_id,
                                quote_id: row.quote_id,
                                picture_data: `data:image/jpeg;base64,${row.picture_data.toString('base64')}`
                            };
                        });
                        resolve(pictures);
                    }
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },  
    getAllQuotes: async function () {
        try {
            const sql = 'SELECT * FROM quote_response';
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
    getAllWorkOrders: async function () {
        try {
            const sql = 'SELECT * FROM order_of_work';
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
    getAllBills: async function () {
        try {
            const sql = 'SELECT * FROM bill';
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
    rejectQuoteRequest: async function (quote_id, request_note, response_note) {
        try {
            response_note = `${request_note}!@#$%^&*Dave Smith!@#$%^&*${response_note}`;
            const status = 'Rejected';
            const sql = 'UPDATE request_for_quote SET request_status = ?, note = ? WHERE quote_id = ?';
            const values = [status, response_note, quote_id];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
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
    getClientFullName: async function (client_id) {
        try {
            const sql = 'SELECT first_name, last_name FROM client WHERE client_id = ?';
            const values = [client_id];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });
            return `${response.first_name} ${response.last_name}`;
        } catch (error) {
            console.log(error);
        }
    },
    acceptQuoteRequest: async function (quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date) {
        try {
            response_note = `${request_note}!@#$%^&*Dave Smith!@#$%^&*${response_note}`;
            const response_id = uuidv4();
            const status = 'In Negotiation - Awaiting Client\'s Response';
            const time_window = `${beginning_date} to ${end_date}`
            const sql = 'INSERT INTO quote_response (response_id, quote_id, counter_proposal_price, time_window, response_note, response_status) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [response_id, quote_id, counter_proposal_price, time_window, response_note, status];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            const request_quote_status = 'Accepted';
            const sql2 = 'UPDATE request_for_quote SET request_status = ? WHERE quote_id = ?';
            const values2 = [request_quote_status, quote_id];
            const response2 = await new Promise((resolve, reject) => {
                db.query(sql2, values2, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return response && response2;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = dbOperations