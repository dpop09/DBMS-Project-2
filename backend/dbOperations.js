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
                return null;
            }
            // check if the password is correct
            const isMatch = await bcrypt.compare(password, client.password);
            if (isMatch) {
                return client.client_id;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    createQuoteRequestAndUploadDrivewayPictures : async function (client_id, property_address, proposed_price, square_feet, note, selectedFile1, selectedFile2, selectedFile3, selectedFile4, selectedFile5) {
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

            // insert into driveway_pictures
            let picture_id1 = uuidv4();
            const sql1 = 'INSERT INTO driveway_pictures (picture_id, quote_id, picture_data) VALUES (?, ?, ?)';
            const values1 = [picture_id1, quote_id, selectedFile1];

            const response1 = await new Promise((resolve, reject) => {
                db.query(sql1, values1, (err, result) => {
                    if (err) {
                        console.log('Error inserting into driveway_pictures table:', err);
                        reject(false);
                    } else {
                        resolve(result);
                    }
                });
            });
            let picture_id2 = uuidv4();
            const sql2 = 'INSERT INTO driveway_pictures (picture_id, quote_id, picture_data) VALUES (?, ?, ?)';
            const values2 = [picture_id2, quote_id, selectedFile2];

            const response2 = await new Promise((resolve, reject) => {
                db.query(sql2, values2, (err, result) => {
                    if (err) {
                        console.log('Error inserting into driveway_pictures table:', err);
                        reject(false);
                    } else {
                        resolve(result);
                    }
                });
            });
            let picture_id3 = uuidv4();
            const sql3 = 'INSERT INTO driveway_pictures (picture_id, quote_id, picture_data) VALUES (?, ?, ?)';
            const values3 = [picture_id3, quote_id, selectedFile3];

            const response3 = await new Promise((resolve, reject) => {
                db.query(sql3, values3, (err, result) => {
                    if (err) {
                        console.log('Error inserting into driveway_pictures table:', err);
                        reject(false);
                    } else {
                        resolve(result);
                    }
                });
            });
            let picture_id4 = uuidv4();
            const sql4 = 'INSERT INTO driveway_pictures (picture_id, quote_id, picture_data) VALUES (?, ?, ?)';
            const values4 = [picture_id4, quote_id, selectedFile4];

            const response4 = await new Promise((resolve, reject) => {
                db.query(sql4, values4, (err, result) => {
                    if (err) {
                        console.log('Error inserting into driveway_pictures table:', err);
                        reject(false);
                    } else {
                        resolve(result);
                    }
                });
            });
            let picture_id5 = uuidv4();
            const sql5 = 'INSERT INTO driveway_pictures (picture_id, quote_id, picture_data) VALUES (?, ?, ?)';
            const values5 = [picture_id5, quote_id, selectedFile5];

            const response5 = await new Promise((resolve, reject) => {
                db.query(sql5, values5, (err, result) => {
                    if (err) {
                        console.log('Error inserting into driveway_pictures table:', err);
                        reject(false);
                    } else {
                        resolve(result);
                    }
                });
            });

            

            return response && response1 && response2 && response3 && response4 && response5;
        } catch (error) {
            console.log(error);
        }
    },
    getAllQuoteRequests: async function () {
        try {
            const sql = 'SELECT * FROM request_for_quote WHERE request_status = "Awaiting Dave\'s Approval"';
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
    acceptQuoteRequest: async function (quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date, client_id) {
        try {
            response_note = `${request_note}!@#$%^&*Dave Smith!@#$%^&*${response_note}`;
            const response_id = uuidv4();
            const status = 'In Negotiation - Awaiting Client\'s Response';
            const time_window = `${beginning_date} to ${end_date}`
            const sql = 'INSERT INTO quote_response (response_id, quote_id, counter_proposal_price, time_window, response_note, response_status, client_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [response_id, quote_id, counter_proposal_price, time_window, response_note, status, client_id];
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
    },
    quitQuote: async function (quote_id, response_note, quit_note) {
        try {
            response_note = `${response_note}!@#$%^&*Dave Smith!@#$%^&*${quit_note}`;
            const status = 'Dave Quits';
            const sql = 'UPDATE quote_response SET response_status = ?, response_note = ? WHERE quote_id = ?';
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
    modifyQuote: async function (quote_id, response_note, modify_note, counter_proposal_price, beginning_date, end_date) {
        try {
            response_note = `${response_note}!@#$%^&*Dave Smith!@#$%^&*${modify_note}`;
            const status = 'In Negotiation - Awaiting Client\'s Response';
            let time_window;
            let sql = 'UPDATE quote_response SET response_status = ?, response_note = ? WHERE quote_id = ?';
            let values = [status, response_note, quote_id];
            if (beginning_date && end_date && !counter_proposal_price) { // Check if both beginning_date and end_date but no counter_proposal_price is provided
                time_window = `${beginning_date} to ${end_date}`
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, time_window = ? WHERE quote_id = ?';
                values = [status, response_note, time_window, quote_id];
            }
            if (counter_proposal_price && beginning_date && end_date) { // Check if counter_proposal_price, beginning_date, and end_date is provided
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, time_window = ?, counter_proposal_price = ? WHERE quote_id = ?';
                values = [status, response_note, time_window, counter_proposal_price, quote_id];
            }
            if (counter_proposal_price && !beginning_date && !end_date) { // Check if counter_proposal_price but no beginning_date or end_date is provided
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, counter_proposal_price = ? WHERE quote_id = ?';
                values = [status, response_note, counter_proposal_price, quote_id];
            }
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
    getPriceFromQuote: async function (quote_id) {
        try {
            const sql = 'SELECT counter_proposal_price FROM quote_response WHERE quote_id = ?';
            const values = [quote_id];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0].counter_proposal_price);
                    }
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    generateBill: async function (quote_id, order_id, client_id) {
        try {
            let status = 'Completed';
            let sql = 'UPDATE order_of_work SET order_status = ? WHERE order_id = ?';
            let values = [status, order_id];
            const response1 = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            const quote_price = await dbOperations.getPriceFromQuote(quote_id);
            const bill_id = uuidv4();
            status = 'Awaiting Client\'s Response';
            sql = 'INSERT INTO bill (bill_id, order_id, bill_amount, bill_status, client_id) VALUES (?, ?, ?, ?, ?)';
            values = [bill_id, order_id, quote_price, status, client_id];
            const response2 = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return response1 && response2;
        } catch (error) {
            console.log(error);
        }
    },
    getAllBillResponses: async function () {
        try {
            const sql = 'SELECT * FROM bill_response';
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
    respondToBillResponse: async function (response_id, initial_notes, response_note, modified_price) {
        try {
            response_note = `${initial_notes}!@#$%^&*Dave Smith!@#$%^&*${response_note}`;
            let sql = 'UPDATE bill_response SET response_note = ?, response_bill_amount = ?, response_status = ? WHERE bill_response_id = ?';
            let values = [response_note, modified_price, 'Disputed - Awaiting Client\'s Response', response_id];
            if (!modified_price) { // Check if modified_price is provided
                sql = 'UPDATE bill_response SET response_note = ?, response_status = ? WHERE bill_response_id = ?';
                values = [response_note, 'Disputed - Awaiting Client\'s Response', response_id];
            }
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
    getClientRequests: async function (client_id) {
        try {
            const sql = 'SELECT * FROM request_for_quote WHERE client_id = ?';
            const values = [client_id];
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
    getClientQuotes: async function (client_id) {
        try {
            const sql = 'SELECT * FROM quote_response WHERE client_id = ?';
            const values = [client_id];
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
    clientAcceptQuote: async function (quote_id, response_note, accept_note, time_window, client_id) {
        try {
            // Get the current date and time in JavaScript
            const currentDate = new Date();
            // Convert the current date to a format suitable for MySQL (YYYY-MM-DD HH:MM:SS)
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            // Get client's name
            const client_name = await dbOperations.getClientFullName(client_id);
            // Add client's name and accept note to response note
            response_note = `${response_note}!@#$%^&*${client_name}!@#$%^&*${accept_note}`;
            // Update quote response
            const quote_response_status = 'Accepted';
            const sql1 = `
                UPDATE quote_response 
                SET response_status = ?, response_note = ?, date_accepted = ? 
                WHERE quote_id = ?
            `;
            const values1 = [quote_response_status, response_note, formattedDate, quote_id];
            const response1 = await new Promise((resolve, reject) => {
                db.query(sql1, values1, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            const order_id = uuidv4();
            const order_status = 'In Progress';
            const beginning_date = time_window.split(' to ')[0];
            const end_date = time_window.split(' to ')[1];
            const sql2 = 'INSERT INTO order_of_work (order_id, quote_id, work_start_date, work_end_date, order_status, client_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values2 = [order_id, quote_id, beginning_date, end_date, order_status, client_id];
            const response2 = await new Promise((resolve, reject) => {
                db.query(sql2, values2, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return response1 && response2;
        } catch (error) {
            console.log(error);
        }
    },
    clientModifyQuote: async function (quote_id, response_note, modify_note, modify_counter_proposal_price, modify_beginning_date, modify_end_date, client_id) {
        try {
            // get client's name
            const client_name = await dbOperations.getClientFullName(client_id);

            // add client's name and modify note to response note
            response_note = `${response_note}!@#$%^&*${client_name}!@#$%^&*${modify_note}`;

            // update quote response
            const quote_response_status = 'In Negotiation - Awaiting Dave\'s Response';

            let time_window;
            let sql = 'UPDATE quote_response SET response_status = ?, response_note = ? WHERE quote_id = ?';
            let values = [quote_response_status, response_note, quote_id];
            if (modify_beginning_date && modify_end_date && !modify_counter_proposal_price) { // Check if both beginning_date and end_date but no counter_proposal_price are provided
                time_window = `${modify_beginning_date} to ${modify_end_date}`
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, time_window = ? WHERE quote_id = ?';
                values = [quote_response_status, response_note, time_window, quote_id];
            }
            if (modify_counter_proposal_price && modify_beginning_date && modify_end_date) { // Check if counter_proposal_price, beginning_date, and end_date are provided
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, time_window = ?, counter_proposal_price = ? WHERE quote_id = ?';
                values = [quote_response_status, response_note, time_window, modify_counter_proposal_price, quote_id];
            }
            if (modify_counter_proposal_price && !modify_beginning_date && !modify_end_date) { // Check if counter_proposal_price is provided but not both beginning_date and end_date
                sql = 'UPDATE quote_response SET response_status = ?, response_note = ?, counter_proposal_price = ? WHERE quote_id = ?';
                values = [quote_response_status, response_note, modify_counter_proposal_price, quote_id];
            }
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
    clientQuitQuote: async function (quote_id, response_note, quit_note, client_id) {
        try {
            // get client's name
            const client_name = await dbOperations.getClientFullName(client_id);

            // add client's name and modify note to response note
            response_note = `${response_note}!@#$%^&*${client_name}!@#$%^&*${quit_note}`;

            // update quote response
            const quote_response_status = 'Client Quits';
            const sql = 'UPDATE quote_response SET response_status = ?, response_note = ? WHERE quote_id = ?';
            const values = [quote_response_status, response_note, quote_id];
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
    getClientOrders: async function (client_id) {
        try {
            const sql = 'SELECT * FROM order_of_work WHERE client_id = ?';
            const values = [client_id];
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
    getClientBills: async function (client_id) {
        try {
            const sql = 'SELECT * FROM bill WHERE client_id = ?';
            const values = [client_id];
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
    getClientBillResponses: async function (client_id) {
        try {
            const sql = 'SELECT * FROM bill_response WHERE client_id = ?';
            const values = [client_id];
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
    clientPayBill: async function (bill_id, bill_amount, client_id) {
        try {
            const sql = 'UPDATE bill SET bill_status = ? WHERE bill_id = ? AND client_id = ?';
            const values = ['Paid', bill_id, client_id];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            
            const bill_response_id = uuidv4();
            const sql2 = 'INSERT INTO bill_response (bill_response_id, bill_id, response_note, response_status, response_bill_amount, client_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values2 = [bill_response_id, bill_id, '', 'Paid', bill_amount, client_id];
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
    },
    clientDisputeBill: async function (bill_id, bill_amount, response_note, client_id) {
        try {
            const sql = 'UPDATE bill SET bill_status = ? WHERE bill_id = ? AND client_id = ?';
            const values = ['Disputed', bill_id, client_id];
            const response = await new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            const client_name = await dbOperations.getClientFullName(client_id);
            response_note = `!@#$%^&*${client_name}!@#$%^&*${response_note}`;
            const bill_response_id = uuidv4();
            const sql2 = 'INSERT INTO bill_response (bill_response_id, bill_id, response_note, response_status, response_bill_amount, client_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values2 = [bill_response_id, bill_id, response_note, 'Disputed - Awaiting Dave\'s Response', bill_amount, client_id];
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
    },
    clientPayBillResponse: async function (bill_response_id) {
        try {
            const sql = 'UPDATE bill_response SET response_status = ? WHERE bill_response_id = ?';
            const values = ['Paid', bill_response_id];
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
    clientDisputeBillResponse: async function (bill_response_id, response_note, dispute_note, client_id) {
        try {
            const client_name = await dbOperations.getClientFullName(client_id);
            response_note = `${response_note}!@#$%^&*${client_name}!@#$%^&*${dispute_note}`;
            const sql = 'UPDATE bill_response SET response_status = ?, response_note = ? WHERE bill_response_id = ?';
            const values = ['Disputed - Awaiting Dave\'s Response', response_note, bill_response_id];
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
    getBigClients: async function () {
        try {
            const sql = `SELECT client_id FROM order_of_work WHERE order_status = 'Completed'`;
            const response = await new Promise((resolve, reject) => {
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            // Count occurrences of each client_id
            const clientCounts = response.reduce((counts, row) => {
                counts[row.client_id] = (counts[row.client_id] || 0) + 1;
                return counts;
            }, {});
            // Find the maximum count
            const maxCount = Math.max(...Object.values(clientCounts));
            // Find the client_id(s) with the maximum count
            let topClients = Object.entries(clientCounts)
                .filter(([clientId, count]) => count === maxCount)
                .map(([clientId]) => clientId);
            for (let i = 0; i < topClients.length; i++) {
                topClients[i] = await dbOperations.getClientFullName(topClients[i]);
            }
            //console.log(topClients);
            return topClients;
        } catch (error) {
            console.log(error);
        }
    },
    getDifficultClients: async function () {
        try {
            const sql = `
                SELECT client_id
                FROM quote_response
                WHERE response_status = 'In Negotiation - Awaiting Client''s Response'
                GROUP BY client_id
                HAVING COUNT(*) >= 3
            `;
            const response = await new Promise((resolve, reject) => {
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            // Map the result to an array of client_ids
            let difficultClients = response.map(row => row.client_id);
            for (let i = 0; i < difficultClients.length; i++) {
                difficultClients[i] = await dbOperations.getClientFullName(difficultClients[i]);
            }
            //console.log(difficultClients);
            return difficultClients; // Return the array of client_ids
        } catch (error) {
            console.log(error);
        }
    },
    getThisMonthQuotes: async function () {
        try {
            const sql = `
                SELECT COUNT(*) AS count 
                FROM quote_response 
                WHERE MONTH(date_accepted) = 12 AND YEAR(date_accepted) = YEAR(CURDATE())
            `;
            const response = await new Promise((resolve, reject) => {
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            return String(response[0].count); // Return the number of rows
        } catch (error) {
            console.log(error);
        }
    },
    getProspectiveClients: async function () {
        try {
            const sql = `
                SELECT DISTINCT c.client_id
                FROM client c
                LEFT JOIN request_for_quote rfq ON c.client_id = rfq.client_id
                WHERE rfq.client_id IS NULL
            `;
            const response = await new Promise((resolve, reject) => {
                db.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            // Map the response to return only the client_id values
            let prospectiveClients = response.map(row => row.client_id);
            for (let i = 0; i < prospectiveClients.length; i++) {
                prospectiveClients[i] = await dbOperations.getClientFullName(prospectiveClients[i]);
            }
            //console.log(prospectiveClients);
            return prospectiveClients;
        } catch (error) {
            console.log(error);
        }
    }    
}


module.exports = dbOperations