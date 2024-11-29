import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function DaveSmithDashboard() {

    const [requests, setRequests] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    const [bills, setBills] = useState([]);

    const [isRejectedNoteVisible, setIsRejectedNoteVisible] = useState({});
    const [requestTextAreaValues, setRequestTextAreaValues] = useState({});
    const [isAcceptedNoteVisible, setIsAcceptedNoteVisible] = useState({});
    const [acceptTextAreaValues, setAcceptTextAreaValues] = useState({});
    const [acceptCounterProposalPriceValue, setAcceptCounterProposalPriceValue] = useState({});
    const [acceptBeginningDateValue, setAcceptBeginningDateValue] = useState({});
    const [acceptEndDateValue, setAcceptEndDateValue] = useState({});


    const { setQuoteId } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    useEffect(() => {
        fetch('http://localhost:8081/get-all-quote-requests')
            .then(response => response.json())
            .then(data => setRequests(data))
            .catch(error => console.log(error));
        fetch('http://localhost:8081/get-all-quotes')
            .then(response => response.json())
            .then(data => setQuotes(data))
            .catch(error => console.log(error));
        fetch('http://localhost:8081/get-all-work-orders')
            .then(response => response.json())
            .then(data => setWorkOrders(data))
            .catch(error => console.log(error));
        fetch('http://localhost:8081/get-all-bills')
            .then(response => response.json())
            .then(data => setBills(data))
            .catch(error => console.log(error));
    }, []);

    const parseNotes = (notes) => {
        if (!notes) return [];
        const parts = notes.split('!@#$%^&*');
        const chatEntries = [];
        for (let i = 1; i < parts.length; i += 2) {
            chatEntries.push({ name: parts[i].trim(), message: parts[i + 1].trim() });   
        }
        console.log(chatEntries);
        return chatEntries; // returns an array of {name, message}
    }

    const handleSeeDrivewayPictures = (quote_id) => {
        setQuoteId(quote_id);
        navigate('/drivewaypictures');
    }

    const toggleRejectedNoteVisibility = (quote_id) => {
        setIsAcceptedNoteVisible((prevState) => ({ // Reset isAcceptedNoteVisible
            ...prevState,
            [quote_id]: false
        }))
        setIsRejectedNoteVisible((prevState) => ({ // Toggle isRejectedNoteVisible
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }

    const toggleAcceptedNoteVisibility = (quote_id) => {
        setIsRejectedNoteVisible((prevState) => ({ // Reset isRejectedNoteVisible
            ...prevState,
            [quote_id]: false
        }))
        setIsAcceptedNoteVisible((prevState) => ({ // Toggle isAcceptedNoteVisible
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }

    const handleRequestTextAreaChange = (quote_id, value) => {
        setRequestTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleAcceptTextAreaChange = (quote_id, value) => {
        setAcceptTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleAcceptCounterProposalPriceChange = (quote_id, value) => {
        setAcceptCounterProposalPriceValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleAcceptBeginningDateChange = (quote_id, value) => {
        setAcceptBeginningDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleAcceptEndDateChange = (quote_id, value) => {
        setAcceptEndDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleRejectRequest = async (quote_id, request_note) => {
        const response_note = requestTextAreaValues[quote_id];
        if (!response_note) { // Check if the response note is empty
            alert('Please provide a response note.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/reject-quote-request', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, request_note, response_note })
            });
            if (response.ok) {
                alert('Request rejected successfully.');
            } else {
                alert('Error rejecting request.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAcceptRequest = async (quote_id, request_note) => {
        const counter_proposal_price = acceptCounterProposalPriceValue[quote_id];
        const beginning_date = acceptBeginningDateValue[quote_id];
        const end_date = acceptEndDateValue[quote_id];
        const response_note = acceptTextAreaValues[quote_id];
        if (!response_note || !counter_proposal_price || !beginning_date || !end_date) { // Check if any of the required fields are empty
            alert('Please provide all required fields.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/accept-quote-request', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date })
            });
            if (response.ok) {
                alert('Request accepted successfully.');
            } else {
                alert('Error accepting request.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="ds-div-container">
            <div id="ds-div-header">
                <h1 id="ds-h1-title">Welcome, Dave Smith</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div id="ds-div-flexbox">
                <div id="ds-div-card-column">
                    <h2>Requests</h2>
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <div key={request.quote_id} id="ds-div-card">
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Quote ID:</p>
                                    <p>{request.quote_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Client ID:</p>
                                    <p>{request.client_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Property Address:</p>
                                    <p>{request.property_address}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Square Footage:</p>
                                    <p>{request.square_feet}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Proposed Price:</p>
                                    <p>${request.proposed_price}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Notes:</p>
                                    <div id="ds-div-chatwindow">
                                        {parseNotes(request.note).map((entry, index) => (
                                            <p key={index}>
                                                <strong>{entry.name}:</strong> {entry.message}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Status:</p>
                                    <p>{request.request_status}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Driveway Pictures:</p>
                                    <button onClick={() => handleSeeDrivewayPictures(request.quote_id)}>View</button>
                                </div>
                                <div id="ds-div-buttons">
                                    <button onClick={() => toggleRejectedNoteVisibility(request.quote_id)}>Reject</button>
                                    <button onClick={() => toggleAcceptedNoteVisibility(request.quote_id)}>Accept</button>
                                </div>
                                {isRejectedNoteVisible[request.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <textarea
                                            value={requestTextAreaValues[request.quote_id] || ''}
                                            onChange={(e) => 
                                                handleRequestTextAreaChange(request.quote_id, e.target.value)
                                            }
                                            placeholder="Enter your response note here..."
                                            rows="5"
                                            cols="50"
                                            style={{resize: "none" }}
                                        />
                                        <button onClick={() => handleRejectRequest(request.quote_id, request.note)}>Submit Rejection</button>
                                    </div>
                                )}
                                {isAcceptedNoteVisible[request.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <textarea
                                            value={acceptTextAreaValues[request.quote_id] || ''}
                                            onChange={(e) => 
                                                handleAcceptTextAreaChange(request.quote_id, e.target.value)
                                            }
                                            placeholder="Enter your response note here..."
                                            rows="5"
                                            cols="50"
                                            style={{resize: "none" }}
                                        />
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Counter Proposal Price:</label>
                                            <input 
                                                type="text" 
                                                value={acceptCounterProposalPriceValue[request.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleAcceptCounterProposalPriceChange(request.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Beginning Date:</label>
                                            <input 
                                                type="date"
                                                value={acceptBeginningDateValue[request.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleAcceptBeginningDateChange(request.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>End Date:</label>
                                            <input 
                                                type="date"
                                                value={acceptEndDateValue[request.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleAcceptEndDateChange(request.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <button onClick={() => handleAcceptRequest(request.quote_id, request.note)}>Submit Acceptance</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No quote requests available.</p>
                    )}
                </div>
                <div id="ds-div-card-column">
                    <h2>Quotes</h2>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <div key={quote.quote_id} id="ds-div-card">
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Response ID:</p>
                                    <p>{quote.response_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Quote ID:</p>
                                    <p>{quote.quote_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Counter Proposal Price:</p>
                                    <p>${quote.counter_proposal_price}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Time Window:</p>
                                    <p>{quote.time_window}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Notes:</p>
                                    <div id="ds-div-chatwindow">
                                        {parseNotes(quote.response_note).map((entry, index) => (
                                            <p key={index}>
                                                <strong>{entry.name}:</strong> {entry.message}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Response Status:</p>
                                    <p>{quote.response_status}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Driveway Pictures:</p>
                                    <button onClick={() => handleSeeDrivewayPictures(quote.quote_id)}>View</button>
                                </div>
                                <div id="ds-div-buttons">
                                    <button>Reject</button>
                                    <button>Accept</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No quotes are available.</p>
                    )}
                </div>
                <div id="ds-div-card-column">
                    <h2>Work Orders</h2>
                    {workOrders.length > 0 ? (
                        workOrders.map((order) => (
                            <div key={order.order_id} id="ds-div-card">
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Order ID:</p>
                                    <p>{order.order_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Quote ID:</p>
                                    <p>{order.quote_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Work Start Date:</p>
                                    <p>{order.work_start_date}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Work End Date:</p>
                                    <p>{order.work_end_date}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Order Status:</p>
                                    <p>{order.order_status}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Driveway Pictures:</p>
                                    <button onClick={() => handleSeeDrivewayPictures(order.quote_id)}>View</button>
                                </div>
                                <div id="ds-div-buttons">
                                    <button>Reject</button>
                                    <button>Accept</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No work orders are available.</p>
                    )}
                </div>
                <div id="ds-div-card-column">
                    <h2>Bills</h2>
                    {workOrders.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.bill_id} id="ds-div-card">
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill ID:</p>
                                    <p>{bill.bill_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Order ID:</p>
                                    <p>{bill.order_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill Amount:</p>
                                    <p>${bill.bill_amount}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill Status:</p>
                                    <p>{bill.bill_status}</p>
                                </div>
                                <div id="ds-div-buttons">
                                    <button>Reject</button>
                                    <button>Accept</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No bills are available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DaveSmithDashboard