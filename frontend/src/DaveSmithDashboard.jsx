import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function DaveSmithDashboard() {

    const [requests, setRequests] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [billResponses, setBillResponses] = useState([]);

    const [bigClients, setBigClients] = useState([]);
    const [difficultClients, setDifficultClients] = useState([]);
    const [thisMonthQuotes, setThisMonthQuotes] = useState([]);
    const [prospectiveClients, setProspectiveClients] = useState([]);
    const [largestDrivewayAddresses, setLargestDrivewayAddresses] = useState([]);
    const [overdueBills, setOverdueBills] = useState([]);
    const [badClients, setBadClients] = useState([]);
    const [goodClients, setGoodClients] = useState([]);

    const [isRejectedNoteVisible, setIsRejectedNoteVisible] = useState({});
    const [requestTextAreaValues, setRequestTextAreaValues] = useState({});
    const [isAcceptedNoteVisible, setIsAcceptedNoteVisible] = useState({});
    const [acceptTextAreaValues, setAcceptTextAreaValues] = useState({});
    const [acceptCounterProposalPriceValue, setAcceptCounterProposalPriceValue] = useState({});
    const [acceptBeginningDateValue, setAcceptBeginningDateValue] = useState({});
    const [acceptEndDateValue, setAcceptEndDateValue] = useState({});
    const [isQuoteQuitNoteVisible, setIsQuoteQuitNoteVisible] = useState({});
    const [quoteQuitTextAreaValues, setQuoteQuitTextAreaValues] = useState({});
    const [isModifyQuoteVisible, setIsModifyQuoteVisible] = useState({});
    const [modifyQuoteTextAreaValues, setModifyQuoteTextAreaValues] = useState({});
    const [modifyQuoteCounterProposalPriceValue, setModifyQuoteCounterProposalPriceValue] = useState({});
    const [modifyQuoteBeginningDateValue, setModfyQuoteBeginningDateValue] = useState({});
    const [modifyQuoteEndDateValue, setModifyQuoteEndDateValue] = useState({});
    const [isDisputedBillNoteVisible, setIsDisputedBillNoteVisible] = useState({});
    const [disputedBillTextAreaValues, setDisputedBillTextAreaValues] = useState({});
    const [disputedBillModifiedPriceValue, setDisputedBillModifiedPriceValue] = useState({});

    const { setQuoteId } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
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

    const toggleQuitQuoteNoteVisibility = (quote_id) => {
        setIsModifyQuoteVisible((prevState) => ({ // Reset isModifyQuoteVisible
            ...prevState,
            [quote_id]: false
        }))
        setIsQuoteQuitNoteVisible((prevState) => ({ // Toggle isQuoteQuitNoteVisible
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }

    const toggleModifyQuoteNoteVisibility = (quote_id) => {
        setIsQuoteQuitNoteVisible((prevState) => ({ // Reset isQuoteQuitNoteVisible
            ...prevState,
            [quote_id]: false
        }))
        setIsModifyQuoteVisible((prevState) => ({ // Toggle isModifyQuoteVisible
            ...prevState,
            [quote_id]: !prevState[quote_id]
        }));
    }

    const toggleDisputedBillNoteVisibility = (bill_id) => {
        setIsDisputedBillNoteVisible((prevState) => ({ // Toggle isDisputedBillNoteVisible
            ...prevState,
            [bill_id]: !prevState[bill_id]
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

    const handleQuoteQuitTextAreaChange = (quote_id, value) => {
        setQuoteQuitTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleModifyQuoteTextAreaChange = (quote_id, value) => {
        setModifyQuoteTextAreaValues((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    };

    const handleModifyQuoteCounterProposalPriceChange = (quote_id, value) => {
        setModifyQuoteCounterProposalPriceValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }

    const handleModifyQuoteBeginningDateChange = (quote_id, value) => {
        setModfyQuoteBeginningDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }

    const handleModifyQuoteEndDateChange = (quote_id, value) => {
        setModifyQuoteEndDateValue((prevState) => ({
            ...prevState,
            [quote_id]: value, // Update the value for the specific quote_id
        }));
    }

    const handleDisputedBillTextAreaChange = (bill_response_id, value) => {
        setDisputedBillTextAreaValues((prevState) => ({
            ...prevState,
            [bill_response_id]: value, // Update the value for the specific quote_id
        }));
    }

    const handleDisputedBillModifiedPriceChange = (bill_response_id, value) => {
        setDisputedBillModifiedPriceValue((prevState) => ({
            ...prevState,
            [bill_response_id]: value, // Update the value for the specific quote_id
        }));
    }

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
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }

    const handleAcceptRequest = async (quote_id, request_note, client_id) => {
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
                body: JSON.stringify({ quote_id, request_note, response_note, counter_proposal_price, beginning_date, end_date, client_id })
            });
            if (response.ok) {
                alert('Request accepted successfully.');
            } else {
                alert('Error accepting request.');
            }
        } catch (error) {
            console.log(error);
        }
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }

    const handleQuitQuote = async (quote_id, response_note) => {
        const quit_note = quoteQuitTextAreaValues[quote_id];
        if (!quit_note) { // Check if the quit note is empty
            alert('Please provide a quit note.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/quit-quote', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, response_note, quit_note })
            });
            if (response.ok) {
                alert('Quote quit successfully.');
            } else {
                alert('Error quiting quote.');
            }
        } catch (error) {
            console.log(error);
        }
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }

    const handleModifyQuote = async (quote_id, response_note) => {
        const modify_note = modifyQuoteTextAreaValues[quote_id];
        const counter_proposal_price = modifyQuoteCounterProposalPriceValue[quote_id];
        const beginning_date = modifyQuoteBeginningDateValue[quote_id];
        const end_date = modifyQuoteEndDateValue[quote_id];
        if (!modify_note) { // Check if the modify note is empty
            alert('Please provide a modify note.');
            return;
        }
        if (beginning_date && !end_date) { // check if beginning_date is provided and end_date is not provided
            alert('Please provide both the beginning and end dates.');
            return;
        }
        if (!beginning_date && end_date) { // check if beginning_date is not provided and end_date is provided
            alert('Please provide both the beginning and end dates.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/modify-quote', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, response_note, modify_note, counter_proposal_price, beginning_date, end_date })
            });
            if (response.ok) {
                alert('Quote modified successfully.');
            } else {
                alert('Error modifying quote.');
            }
        } catch (error) {
            console.log(error);
        }
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }

    const handleGenerateBill = async (quote_id, order_id, client_id) => {
        try {
            const response = await fetch('http://localhost:8081/generate-bill', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ quote_id, order_id, client_id })
            });
            if (response.ok) {
                alert('Bill generated successfully.');
            } else {
                alert('Error generating bill.');
            }
        } catch (error) {
            console.log(error);
        }
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }

    const handleRespondToBill = async (bill_response_id, initial_notes) => {
        const response_note = disputedBillTextAreaValues[bill_response_id];
        const modified_price = disputedBillModifiedPriceValue[bill_response_id];
        if (!response_note) { // Check if the response note is empty
            alert('Please provide a response note.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/respond-to-bill-response', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ bill_response_id, initial_notes, response_note, modified_price })
            });
            if (response.ok) {
                alert('Bill responded successfully.');
            } else {
                alert('Error responding to bill.');
            }
        } catch (error) {
            console.log(error);
        }
        toggleDisputedBillNoteVisibility(bill_response_id);
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
    }
    
    const getQuoteRequests = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-all-quote-requests');
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getQuotes = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-all-quotes');
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getWorkOrders = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-all-work-orders');
            const data = await response.json();
            setWorkOrders(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getBills = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-all-bills');
            const data = await response.json();
            setBills(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getBillResponses = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-all-bill-responses');
            const data = await response.json();
            setBillResponses(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getBigClients = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-big-clients');
            const data = await response.json();
            setBigClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDifficultClients = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-difficult-clients');
            const data = await response.json();
            setDifficultClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getThisMonthQuotes = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-this-month-quotes');
            const data = await response.json();
            setThisMonthQuotes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProspectiveClients = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-prospective-clients');
            const data = await response.json();
            setProspectiveClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getLargestDrivewayAddresses = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-largest-driveway-addresses');
            const data = await response.json();
            setLargestDrivewayAddresses(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getOverdueBills = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-overdue-bills');
            const data = await response.json();
            setOverdueBills(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getBadClients = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-bad-clients');
            const data = await response.json();
            setBadClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getGoodClients = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-good-clients');
            const data = await response.json();
            setGoodClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuoteRequests();
        getQuotes();
        getWorkOrders();
        getBills();
        getBillResponses();
        getBigClients();
        getDifficultClients();
        getThisMonthQuotes();
        getProspectiveClients();
        getLargestDrivewayAddresses();
        getOverdueBills();
        getBadClients();
        getGoodClients();
    }, []);

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
                                        <button onClick={() => handleAcceptRequest(request.quote_id, request.note, request.client_id)}>Submit Acceptance</button>
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
                                {quote.response_status === 'In Negotiation - Awaiting Dave\'s Response' && (
                                    <div id="ds-div-buttons">
                                        <button onClick={() => toggleQuitQuoteNoteVisibility(quote.quote_id)}>Quit</button>
                                        <button onClick={() => toggleModifyQuoteNoteVisibility(quote.quote_id)}>Modify</button>
                                    </div>
                                )}
                                {isQuoteQuitNoteVisible[quote.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <textarea
                                            value={quoteQuitTextAreaValues[quote.quote_id] || ''}
                                            onChange={(e) => 
                                                handleQuoteQuitTextAreaChange(quote.quote_id, e.target.value)
                                            }
                                            placeholder="Enter your quitting note here..."
                                            rows="5"
                                            cols="50"
                                            style={{resize: "none" }}
                                        />
                                        <button onClick={() => handleQuitQuote(quote.quote_id, quote.response_note)}>Finalize Quit</button>
                                    </div>
                                )}
                                {isModifyQuoteVisible[quote.quote_id] && (
                                    <div id="ds-div-response-note">
                                        <textarea
                                            value={modifyQuoteTextAreaValues[quote.quote_id] || ''}
                                            onChange={(e) => 
                                                handleModifyQuoteTextAreaChange(quote.quote_id, e.target.value)
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
                                                value={modifyQuoteCounterProposalPriceValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteCounterProposalPriceChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Beginning Date:</label>
                                            <input 
                                                type="date"
                                                value={modifyQuoteBeginningDateValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteBeginningDateChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>End Date:</label>
                                            <input 
                                                type="date"
                                                value={modifyQuoteEndDateValue[quote.quote_id] || ''}
                                                onChange={(e) => 
                                                    handleModifyQuoteEndDateChange(quote.quote_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <button onClick={() => handleModifyQuote(quote.quote_id, quote.response_note)}>Submit Modification</button>
                                    </div>
                                )}
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
                                {order.order_status === "In Progress" && (
                                    <div id="ds-div-buttons">
                                        <button onClick={() => handleGenerateBill(order.quote_id, order.order_id, order.client_id)}>Generate Bill</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No work orders are available.</p>
                    )}
                </div>
                <div id="ds-div-card-column">
                    <h2>Bills</h2>
                    {bills.length > 0 ? (
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
                            </div>
                        ))
                    ) : (
                        <p>No new bills are available.</p>
                    )}
                </div>
                <div id="ds-div-card-column">
                    <h2>Bill Responses</h2>
                    {billResponses.length > 0 ? (
                        billResponses.map((billResponse) => (
                            <div key={billResponse.bill_response_id} id="ds-div-card">
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill Response ID:</p>
                                    <p>{billResponse.bill_response_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill ID:</p>
                                    <p>{billResponse.bill_id}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Notes:</p>
                                    <div id="ds-div-chatwindow">
                                        {parseNotes(billResponse.response_note).map((entry, index) => (
                                            <p key={index}>
                                                <strong>{entry.name}:</strong> {entry.message}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill Amount:</p>
                                    <p>${billResponse.response_bill_amount}</p>
                                </div>
                                <div id="ds-div-cardrow">
                                    <p id="ds-p-cardrowlabel">Bill Status:</p>
                                    <p>{billResponse.response_status}</p>
                                </div>
                                {billResponse.response_status === "Disputed - Awaiting Dave's Response" && (
                                    <div id="ds-div-buttons">
                                        <button onClick={() => toggleDisputedBillNoteVisibility(billResponse.bill_response_id)}>Respond</button>
                                    </div>
                                )}
                                {isDisputedBillNoteVisible[billResponse.bill_response_id] && (
                                    <div id="ds-div-response-note">
                                        <textarea
                                            value={disputedBillTextAreaValues[billResponse.bill_response_id] || ''}
                                            onChange={(e) => 
                                                handleDisputedBillTextAreaChange(billResponse.bill_response_id, e.target.value)
                                            }
                                            placeholder="Enter your response here..."
                                            rows="5"
                                            cols="50"
                                            style={{resize: "none" }}
                                        />
                                        <div id="ds-div-hidden-accept-request-row">
                                            <label>Modify Bill Amount:</label>
                                            <input 
                                                type="text" 
                                                value={disputedBillModifiedPriceValue[billResponse.bill_response_id] || ''}
                                                onChange={(e) => 
                                                    handleDisputedBillModifiedPriceChange(billResponse.bill_response_id, e.target.value)
                                                }
                                            />
                                        </div>
                                        <button onClick={() => handleRespondToBill(billResponse.bill_response_id, billResponse.response_note)}>Submit Response</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No bills are available.</p>
                    )}
                </div>
            </div>
            <h1>Big Clients</h1>
            {bigClients.length > 0 ? (
                <div>
                    {bigClients.map((client_name, index) => (
                        <p key={index}>{client_name}</p>
                    ))}
                </div>
            ) : (
                <p>No big clients to display.</p>
            )}
            <h1>Difficult Clients</h1>
            {difficultClients.length > 0 ? (
                <div>
                    {difficultClients.map((client_name, index) => (
                        <p key={index}>{client_name}</p>
                    ))}
                </div>
            ) : (
                <p>No difficult clients to display.</p>
            )}
            <h1>This Month Quotes</h1>
            <p>{thisMonthQuotes}</p>
            <h1>Prospective Clients</h1>
            {prospectiveClients.length > 0 ? (
                <div>
                    {prospectiveClients.map((client_name, index) => (
                        <p key={index}>{client_name}</p>
                    ))}
                </div>
            ) : (
                <p>No prospective clients to display.</p>
            )}
            <h1>Largest Driveway</h1>
            {largestDrivewayAddresses.length > 0 ? (
                <div>
                    {largestDrivewayAddresses.map((address, index) => (
                        <p key={index}>{address}</p>
                    ))}
                </div>
            ) : (
                <p>No driveway addresses to display.</p>
            )}
            <h1>Overdue Bills</h1>
                    {overdueBills.length > 0 ? (
                        overdueBills.map((bill) => (
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
                            </div>
                        ))
                    ) : (
                        <p>No overdue bills are available.</p>
                    )}
            <h1>Bad Clients</h1>
            {badClients.length > 0 ? (
                <div>
                    {badClients.map((client_name, index) => (
                        <p key={index}>{client_name}</p>
                    ))}
                </div>
            ) : (
                <p>No bad clients to display.</p>
            )}
            <h1>Good Clients</h1>
            {goodClients.length > 0 ? (
                <div>
                    {goodClients.map((client_name, index) => (
                        <p key={index}>{client_name}</p>
                    ))}
                </div>
            ) : (
                <p>No good clients to display.</p>
            )}
        </div>
    );
}

export default DaveSmithDashboard