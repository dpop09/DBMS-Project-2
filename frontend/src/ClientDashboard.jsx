import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function ClientDashboard() {

    const [requests, setRequests] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [propertyAddress, setPropertyAddress] = useState("");
    const [proposedPrice, setProposedPrice] = useState("");
    const [squareFeet, setSquareFeet] = useState("");
    const [note, setNote] = useState("");
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    const [selectedFile5, setSelectedFile5] = useState(null);
    const [isQuitQuoteResponseVisible, setIsQuitQuoteResponseVisible] = useState({});
    const [isModifyQuoteResponseVisible, setIsModifyQuoteResponseVisible] = useState({});
    const [isAcceptQuoteResponseVisible, setIsAcceptQuoteResponseVisible] = useState({});
    const [quitQuoteResponseTextAreaValues, setQuitQuoteResponseTextAreaValues] = useState({});
    const [modifyQuoteResponseTextAreaValues, setModifyQuoteResponseTextAreaValues] = useState({});
    const [modifyQuoteResponseCounterProposalPriceValue, setModifyQuoteResponseCounterProposalPriceValue] = useState({});
    const [modifyQuoteResponseBeginningDateValue, setModifyQuoteResponseBeginningDateValue] = useState({});
    const [modifyQuoteResponseEndDateValue, setModifyQuoteResponseEndDateValue] = useState({});
    const [acceptQuoteResponseTextAreaValues, setAcceptQuoteResponseTextAreaValues] = useState({});

    const { clientId } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    const toggleQuitQuoteResponseVisibility = (quote_id) => {
        setIsModifyQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsAcceptQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsQuitQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }
    const toggleModifyQuoteResponseVisibility = (quote_id) => {
        setIsQuitQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsAcceptQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsModifyQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }
    const toggleAcceptQuoteResponseVisibility = (quote_id) => {
        setIsQuitQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsModifyQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: false
        }))
        setIsAcceptQuoteResponseVisible((prevState) => ({
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }

    const handleQuitQuoteResponseTextAreaChange = (quote_id, value) => {
        setQuitQuoteResponseTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };
    const handleModifyQuoteResponseTextAreaChange = (quote_id, value) => {
        setModifyQuoteResponseTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }
    const handleModifyQuoteResponseCounterProposalPriceChange = (quote_id, value) => {
        setModifyQuoteResponseCounterProposalPriceValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }
    const handleModifyQuoteResponseBeginningDateChange = (quote_id, value) => {
        setModifyQuoteResponseBeginningDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }
    const handleModifyQuoteResponseEndDateChange = (quote_id, value) => {
        setModifyQuoteResponseEndDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }
    const handleAcceptQuoteResponseTextAreaChange = (quote_id, value) => {
        setAcceptQuoteResponseTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }

    // Create a new quote
    const handleCreateQuote = async () => {
        if (!propertyAddress || !proposedPrice || !squareFeet || !note || 
            !selectedFile1 || !selectedFile2 || !selectedFile3 || !selectedFile4 || !selectedFile5) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Create a single FormData object
        const formData = new FormData();
        formData.append("client_id", clientId);
        formData.append("property_address", propertyAddress);
        formData.append("proposed_price", proposedPrice);
        formData.append("square_feet", squareFeet);
        formData.append("note", note);
    
        // Append all images
        formData.append("image1", selectedFile1);
        formData.append("image2", selectedFile2);
        formData.append("image3", selectedFile3);
        formData.append("image4", selectedFile4);
        formData.append("image5", selectedFile5);
    
        try {
            // No need for JSON headers, fetch will handle the multipart/form-data boundary automatically
            const response = await fetch("http://localhost:8081/create-quote", {
                method: "POST",
                body: formData
            });
    
            if (response.ok) {
                alert("Quote created successfully.");
                setPropertyAddress("");
                setProposedPrice("");
                setSquareFeet("");
                setNote("");
                setSelectedFile1(null);
                setSelectedFile2(null);
                setSelectedFile3(null);
                setSelectedFile4(null);
                setSelectedFile5(null);
            } else {
                alert("Failed to create quote.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuitQuote = async (quote_id, response_note) => {
        const quit_note = quitQuoteResponseTextAreaValues[quote_id];
        if (!quit_note) { // Check if the quit note is empty
            alert('Please provide a quit note.');    
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/client-quit-quote', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, response_note, quit_note, client_id:clientId })
            });
            if (response.ok) {
                alert('Quote quit successfully.');
            } else {
                alert('Error quiting quote.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleModifyQuote = async (quote_id, response_note) => {
        const modify_note = modifyQuoteResponseTextAreaValues[quote_id];
        const modify_counter_proposal_price = modifyQuoteResponseCounterProposalPriceValue[quote_id];
        const modify_beginning_date = modifyQuoteResponseBeginningDateValue[quote_id];
        const modify_end_date = modifyQuoteResponseEndDateValue[quote_id];
        if (!modify_note) { // Check if the modify note is empty
            alert('Please provide a modify note.');    
            return;
        }
        if (modify_beginning_date && !modify_end_date) { // check if beginning_date is provided and end_date is not provided
            alert('Please provide both the beginning and end dates.');    
            return;
        }
        if (!modify_beginning_date && modify_end_date) { // check if beginning_date is not provided and end_date is provided
            alert('Please provide both the beginning and end dates.');    
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/client-modify-quote', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, response_note, modify_note, modify_counter_proposal_price, modify_beginning_date, modify_end_date, client_id:clientId })
            });
            if (response.ok) {
                alert('Quote modified successfully.');
            } else {
                alert('Error modifying quote.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAcceptQuote = async (quote_id, response_note, time_window) => {
        const accept_note = acceptQuoteResponseTextAreaValues[quote_id];
        if (!accept_note) { // Check if the accept note is empty
            alert('Please provide an accept note.');    
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/client-accept-quote', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, response_note, accept_note, time_window, client_id:clientId })
            });
            if (response.ok) {
                alert('Quote accepted successfully.');
            } else {
                alert('Error accepting quote.');
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const parseNotes = (notes) => {
        if (!notes) return [];
        const parts = notes.split('!@#$%^&*');
        const chatEntries = [];
        for (let i = 1; i < parts.length; i += 2) {
            chatEntries.push({ name: parts[i].trim(), message: parts[i + 1].trim() });   
        }
        return chatEntries; // returns an array of {name, message}
    }

    // Handle driveway picture upload
    const handleFile1Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile1(file);
        }
    };
    const handleFile2Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile2(file)
        }
    };
    const handleFile3Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile3(file)
        }
    };
    const handleFile4Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile4(file)
        }
    };
    const handleFile5Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile5(file)
        }
    };

    const getClientRequests = async () => {
        try {
            const response = await fetch("http://localhost:8081/get-client-requests", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ client_id:clientId })
            });
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getClientQuotes = async () => {
        try {
            const response = await fetch("http://localhost:8081/get-client-quotes", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ client_id:clientId })
            });
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClientRequests();
        getClientQuotes();
    }, []);

    return (
        <div id="client-div-container">
            <div id="client-div-header">
                <h1 id="client-h1-title">Welcome to Your Dashboard {clientId}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div id="client-div-flexbox">
                {/* Create a Quote Section */}
                <div id="client-div-card-column">
                    <h2>Create a Quote</h2>
                    <div id="client-div-card">
                        <div id="client-div-cardrow">
                            <label>Property Address:</label>
                            <input
                                type="text"
                                value={propertyAddress}
                                onChange={(e) => setPropertyAddress(e.target.value)}
                            />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Proposed Price:</label>
                            <input
                                type="text"
                                value={proposedPrice}
                                onChange={(e) => setProposedPrice(e.target.value)}
                            />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Square Footage:</label>
                            <input
                                type="text"
                                value={squareFeet}
                                onChange={(e) => setSquareFeet(e.target.value)}
                            />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Notes:</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows="4"
                                cols="30"
                                placeholder="Enter notes here..."
                            />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Upload Picture 1:</label>
                            <input id="upload-picture-input" type="file" accept="image/*" onChange={handleFile1Change} />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Upload Picture 2:</label>
                            <input id="upload-picture-input" type="file" accept="image/*" onChange={handleFile2Change} />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Upload Picture 3:</label>
                            <input id="upload-picture-input" type="file" accept="image/*" onChange={handleFile3Change} />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Upload Picture 4:</label>
                            <input id="upload-picture-input" type="file" accept="image/*" onChange={handleFile4Change} />
                        </div>
                        <div id="client-div-cardrow">
                            <label>Upload Picture 5:</label>
                            <input id="upload-picture-input" type="file" accept="image/*" onChange={handleFile5Change} />
                        </div>
                        <button onClick={handleCreateQuote}>Submit Quote</button>
                    </div>
                </div>

                {/* Requests Section */}
                <div id="client-div-card-column">
                    <h2>Your Requests</h2>
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <div key={request.quote_id} id="client-div-card">
                                <p><strong>Quote ID:</strong> {request.quote_id}</p>
                                <p><strong>Property Address:</strong> {request.property_address}</p>
                                <p><strong>Square Footage:</strong> {request.square_feet}</p>
                                <p><strong>Proposed Price:</strong> ${request.proposed_price}</p>
                                <p id="client-p-cardrowlabel">Notes:</p>
                                <div id="client-div-chatwindow">
                                    {parseNotes(request.note).map((entry, index) => (
                                        <p key={index}>
                                            <strong>{entry.name}:</strong> {entry.message}
                                        </p>
                                    ))}
                                </div>
                                <p><strong>Status:</strong> {request.request_status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No requests available.</p>
                    )}
                </div>

                {/* Quotes Section */}
                <div id="client-div-card-column">
                    <h2>Your Quotes</h2>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <div key={quote.quote_id} id="client-div-card">
                                <p><strong>Response ID:</strong> {quote.response_id}</p>
                                <p><strong>Quote ID:</strong> {quote.quote_id}</p>
                                <p><strong>Proposed Price:</strong> ${quote.counter_proposal_price}</p>
                                <p><strong>Time Window:</strong> {quote.time_window}</p>
                                <p id="client-p-cardrowlabel">Notes:</p>
                                <div id="client-div-chatwindow">
                                    {parseNotes(quote.response_note).map((entry, index) => (
                                        <p key={index}>
                                            <strong>{entry.name}:</strong> {entry.message}
                                        </p>
                                    ))}
                                </div>
                                <p><strong>Status:</strong> {quote.response_status}</p>
                                {quote.response_status === 'In Negotiation - Awaiting Client\'s Response' && (
                                    <div id="ds-div-buttons">
                                        <button onClick={() => toggleQuitQuoteResponseVisibility(quote.quote_id)}>Quit Quote</button>
                                        <button onClick={() => toggleModifyQuoteResponseVisibility(quote.quote_id)}>Modify Quote</button>
                                        <button onClick={() => toggleAcceptQuoteResponseVisibility(quote.quote_id)}>Accept Quote</button>
                                    </div>
                                )}
                                {isAcceptQuoteResponseVisible[quote.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <p><strong>Accept Quote Note:</strong></p>
                                        <textarea value={acceptQuoteResponseTextAreaValues[quote.quote_id] || ''}
                                            onChange={(e) => 
                                                handleAcceptQuoteResponseTextAreaChange(quote.quote_id, e.target.value)
                                            }
                                            rows="4"
                                            cols="30"
                                            placeholder="Enter notes here..."
                                        />
                                        <button onClick={() => handleAcceptQuote(quote.quote_id, quote.response_note, quote.time_window)}>Accept Quote</button>
                                    </div>
                                )}
                                {isModifyQuoteResponseVisible[quote.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <p><strong>Modify Quote Note:</strong></p>
                                        <textarea value={modifyQuoteResponseTextAreaValues[quote.quote_id] || ''}
                                            onChange={(e) => 
                                                handleModifyQuoteResponseTextAreaChange(quote.quote_id, e.target.value)
                                            }
                                            rows="4"
                                            cols="30"
                                            placeholder="Enter notes here..."
                                        />
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Counter Proposal Price:</label>
                                            <input 
                                                type="text" 
                                                value={modifyQuoteResponseCounterProposalPriceValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteResponseCounterProposalPriceChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Beginning Date:</label>
                                            <input 
                                                type="date"
                                                value={modifyQuoteResponseBeginningDateValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteResponseBeginningDateChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>End Date:</label>
                                            <input 
                                                type="date"
                                                value={modifyQuoteResponseEndDateValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteResponseEndDateChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <button onClick={() => handleModifyQuote(quote.quote_id, quote.response_note)}>Modify Quote</button>
                                    </div>
                                )}
                                {isQuitQuoteResponseVisible[quote.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <p><strong>Quit Quote Note:</strong></p>
                                        <textarea value={quitQuoteResponseTextAreaValues[quote.quote_id] || ''}
                                            onChange={(e) => 
                                                handleQuitQuoteResponseTextAreaChange(quote.quote_id, e.target.value)
                                            }
                                            rows="4"
                                            cols="30"
                                            placeholder="Enter notes here..."
                                        />
                                        <button onClick={() => handleQuitQuote(quote.quote_id, quote.response_note)}>Quit Quote</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No quotes available.</p>
                    )}
                </div>


                {/* Orders Section */}
                <div id="client-div-card-column">
                    <h2>Your Orders</h2>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.order_id} id="client-div-card">
                                <p><strong>Order ID:</strong> {order.order_id}</p>
                                <p><strong>Start Date:</strong> {order.work_start_date}</p>
                                <p><strong>End Date:</strong> {order.work_end_date}</p>
                                <p><strong>Status:</strong> {order.order_status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No orders available.</p>
                    )}
                </div>

                {/* Bills Section */}
                <div id="client-div-card-column">
                    <h2>Your Bills</h2>
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.bill_id} id="client-div-card">
                                <p><strong>Bill Amount:</strong> ${bill.bill_amount}</p>
                                <p><strong>Status:</strong> {bill.bill_status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No bills available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClientDashboard;
