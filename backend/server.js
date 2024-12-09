const express = require('express');
const cors = require('cors');
const dbOperations = require('./dbOperations');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.post('/register', async (request, response) => {
    try {
        const {email, password, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber} = request.body;
        result = await dbOperations.registerClient(email, password, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber);
        response.status(200).send({result});
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/is-email-in-use', async (request, response) => {
    try {
        const {email} = request.body;
        let result = await dbOperations.isEmailInUse(email);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/signin', async (request, response) => {
    try {
        const {email, password} = request.body;
        let result = await dbOperations.signinClient(email, password);
        response.status(200).send({result});
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/get-all-quote-requests', async (request, response) => {
    try {
        const result = await dbOperations.getAllQuoteRequests();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/get-driveway-pictures', async (request, response) => {
    try {
        const {quote_id} = request.body;
        const result = await dbOperations.getDrivewayPictures(quote_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/get-all-quotes', async (request, response) => {
    try {
        const result = await dbOperations.getAllQuotes();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/get-all-work-orders', async (request, response) => {
    try {
        const result = await dbOperations.getAllWorkOrders();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/get-all-bills', async (request, response) => {
    try {
        const result = await dbOperations.getAllBills();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/get-all-bill-responses', async (request, response) => {
    try {
        const result = await dbOperations.getAllBillResponses();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/reject-quote-request', async (request, response) => {
    try {
        const {quote_id, request_note, response_note} = request.body;
        const result = await dbOperations.rejectQuoteRequest(quote_id, request_note, response_note);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/accept-quote-request', async (request, response) => {
    try {
        const {quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date, client_id} = request.body;
        const result = await dbOperations.acceptQuoteRequest(quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/quit-quote', async (request, response) => {
    try {
        const {quote_id, response_note, quit_note} = request.body;
        const result = await dbOperations.quitQuote(quote_id, response_note, quit_note);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }    
})

app.post('/modify-quote', async (request, response) => {
    try {
        const {quote_id, response_note, modify_note, counter_proposal_price, beginning_date, end_date} = request.body;
        const result = await dbOperations.modifyQuote(quote_id, response_note, modify_note, counter_proposal_price, beginning_date, end_date);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/generate-bill', async (request, response) => {
    try {
        const {quote_id, order_id, client_id} = request.body;
        const result = await dbOperations.generateBill(quote_id, order_id, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/respond-to-bill-response', async (request, response) => {
    try {
        const {bill_response_id, initial_notes, response_note, modified_price} = request.body;
        const result = await dbOperations.respondToBillResponse(bill_response_id, initial_notes, response_note, modified_price);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/create-quote', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
]), async (request, response) => {
    try {
        const {client_id, property_address, proposed_price, square_feet, note} = request.body;
        console.log(client_id, property_address, proposed_price, square_feet, note);
        const result = await dbOperations.createQuoteRequestAndUploadDrivewayPictures(client_id, property_address, proposed_price, square_feet, note, request.files['image1'][0].buffer, request.files['image2'][0].buffer, request.files['image3'][0].buffer, request.files['image4'][0].buffer, request.files['image5'][0].buffer);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.post('/get-client-requests', async (request, response) => {
    try {
        const {client_id} = request.body;
        const result = await dbOperations.getClientRequests(client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/get-client-quotes', async (request, response) => {
    try {
        const {client_id} = request.body;
        const result = await dbOperations.getClientQuotes(client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-accept-quote', async (request, response) => {
    try {
        const {quote_id, response_note, accept_note, time_window, client_id} = request.body;
        const result = await dbOperations.clientAcceptQuote(quote_id, response_note, accept_note, time_window, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-quit-quote', async (request, response) => {
    try {
        const {quote_id, response_note, quit_note, client_id} = request.body;
        const result = await dbOperations.clientQuitQuote(quote_id, response_note, quit_note, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-modify-quote', async (request, response) => {
    try {
        const { quote_id, response_note, modify_note, modify_counter_proposal_price, modify_beginning_date, modify_end_date, client_id } = request.body;
        const result = await dbOperations.clientModifyQuote( quote_id, response_note, modify_note, modify_counter_proposal_price, modify_beginning_date, modify_end_date, client_id );
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/get-client-orders', async (request, response) => {
    try {
        const {client_id} = request.body;
        const result = await dbOperations.getClientOrders(client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/get-client-bills', async (request, response) => {
    try {
        const {client_id} = request.body;
        const result = await dbOperations.getClientBills(client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/get-client-bill-responses', async (request, response) => {
    try {
        const {client_id} = request.body;
        const result = await dbOperations.getClientBillResponses(client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-pay-bill', async (request, response) => {
    try {
        const {bill_id, bill_amount, client_id} = request.body;
        const result = await dbOperations.clientPayBill(bill_id,  bill_amount, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-dispute-bill', async (request, response) => {
    try {
        const {bill_id, bill_amount, response_note ,client_id} = request.body;
        const result = await dbOperations.clientDisputeBill(bill_id, bill_amount, response_note, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-pay-bill-response', async (request, response) => {
    try {
        const {bill_response_id} = request.body;
        const result = await dbOperations.clientPayBillResponse(bill_response_id);
        response.status(200).send(result);    
    } catch (error) {
        response.status(500).send(error);
    }
})

app.post('/client-dispute-bill-response', async (request, response) => {
    try {
        const {bill_response_id, response_note, dispute_note, client_id} = request.body;
        const result = await dbOperations.clientDisputeBillResponse(bill_response_id, response_note, dispute_note, client_id);
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get('/get-big-clients', async (request, response) => {
    try {
        const result = await dbOperations.getBigClients();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get('/get-difficult-clients', async (request, response) => {
    try {
        const result = await dbOperations.getDifficultClients();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get('/get-this-month-quotes', async (request, response) => {
    try {
        const result = await dbOperations.getThisMonthQuotes();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get('/get-prospective-clients', async (request, response) => {
    try {
        const result = await dbOperations.getProspectiveClients();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.get('/get-largest-driveway-addresses', async (request, response) => {
    try {
        const result = await dbOperations.getLargestDrivewayAddresses();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})

// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});