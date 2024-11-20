const express = require('express');
const cors = require('cors');
const dbOperations = require('./dbOperations');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.post('/register', async (request, response) => {
    try {
        const {email, password, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber} = request.body;
        let result = await dbOperations.registerClient(email, password, fname, lname, address, ccnumber, ccsecuritycode, ccexpirationdate, ccname, phonenumber);
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
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

app.get('/getall', async (request, response) => {
    try {
        const result = await dbOperations.getAll();
        response.status(200).send(result);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})

// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});