import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ClientDashboard() {
    const [quotes, setQuotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data for quotes, orders, and bills
        axios.get("/api/quotes").then((response) => setQuotes(response.data));
        axios.get("/api/orders").then((response) => setOrders(response.data));
        axios.get("/api/bills").then((response) => setBills(response.data));
    }, []);

    const handleLogout = () => {
        navigate("/");
    };

    const handleQuoteResponse = (quoteId, responseType) => {
        axios.post(`/api/quotes/${quoteId}/response`, { responseType })
            .then(() => alert(`Quote ${responseType} successfully.`))
            .catch((error) => console.error("Error responding to quote:", error));
    };

    const handleBillResponse = (billId, responseType) => {
        axios.post(`/api/bills/${billId}/response`, { responseType })
            .then(() => alert(`Bill ${responseType} successfully.`))
            .catch((error) => console.error("Error responding to bill:", error));
    };

    return (
        <div id="client-dashboard-container">
            <div id="client-dashboard-header">
                <h1 id="client-dashboard-title">Welcome to Your Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div id="client-dashboard-flexbox">
                <div id="client-section">
                    <h2>Your Quotes</h2>
                    {quotes.map((quote) => (
                        <div key={quote.QuoteID} className="client-card">
                            <h3>Quote ID: {quote.QuoteID}</h3>
                            <p>Property Address: {quote.PropertyAddress}</p>
                            <p>Square Footage: {quote.SquareFeet}</p>
                            <p>Proposed Price: ${quote.ProposedPrice}</p>
                            <p>Note: {quote.Note}</p>
                            <p>Status: {quote.RequestStatus}</p>
                            <div className="client-card-buttons">
                                <button onClick={() => handleQuoteResponse(quote.QuoteID, "accept")}>
                                    Accept
                                </button>
                                <button onClick={() => handleQuoteResponse(quote.QuoteID, "reject")}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="client-section">
                    <h2>Your Orders</h2>
                    {orders.map((order) => (
                        <div key={order.OrderID} className="client-card">
                            <h3>Order ID: {order.OrderID}</h3>
                            <p>Work Start Date: {order.WorkStartDate}</p>
                            <p>Work End Date: {order.WorkEndDate}</p>
                            <p>Status: {order.OrderStatus}</p>
                        </div>
                    ))}
                </div>
                <div id="client-section">
                    <h2>Your Bills</h2>
                    {bills.map((bill) => (
                        <div key={bill.BillID} className="client-card">
                            <h3>Bill ID: {bill.BillID}</h3>
                            <p>Amount: ${bill.BillAmount}</p>
                            <p>Status: {bill.BillStatus}</p>
                            <div className="client-card-buttons">
                                <button onClick={() => handleBillResponse(bill.BillID, "pay")}>
                                    Pay
                                </button>
                                <button onClick={() => handleBillResponse(bill.BillID, "dispute")}>
                                    Dispute
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClientDashboard;
