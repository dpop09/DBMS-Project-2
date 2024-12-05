import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
    const [quotes, setQuotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [noteInput, setNoteInput] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all quotes, orders, and bills for the client
        fetch("http://localhost:8081/quotes")
            .then((response) => response.json())
            .then((data) => setQuotes(data))
            .catch((error) => console.error("Error fetching quotes:", error));

        fetch("http://localhost:8081/orders")
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));

        fetch("http://localhost:8081/bills")
            .then((response) => response.json())
            .then((data) => setBills(data))
            .catch((error) => console.error("Error fetching bills:", error));
    }, []);

    const handleLogout = () => {
        navigate("/");
    };

    const handleQuoteResponse = (quoteId, action) => {
        const url =
            action === "accept" ? `/accept-quote/${quoteId}` : `/resubmit-quote/${quoteId}`;
        fetch(url, { method: "POST" })
            .then((response) => {
                if (response.ok) {
                    alert(`Quote ${action}ed successfully.`);
                    // Reload quotes
                    return fetch("http://localhost:8081/quotes")
                        .then((res) => res.json())
                        .then((data) => setQuotes(data));
                } else {
                    alert(`Error ${action}ing quote.`);
                }
            })
            .catch((error) => console.error(`Error ${action}ing quote:`, error));
    };

    const handleBillResponse = (billId, action) => {
        const url = action === "pay" ? `/pay-bill/${billId}` : `/dispute-bill/${billId}`;
        fetch(url, { method: "POST" })
            .then((response) => {
                if (response.ok) {
                    alert(`Bill ${action}ed successfully.`);
                    // Reload bills
                    return fetch("http://localhost:8081/bills")
                        .then((res) => res.json())
                        .then((data) => setBills(data));
                } else {
                    alert(`Error ${action}ing bill.`);
                }
            })
            .catch((error) => console.error(`Error ${action}ing bill:`, error));
    };

    const handleAddNote = (id, section) => {
        const url = `/add-note/${section}/${id}`;
        const message = noteInput[id];
        if (!message) {
            alert("Please enter a message before submitting.");
            return;
        }
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Note added successfully.");
                    setNoteInput((prevState) => ({ ...prevState, [id]: "" }));
                    // Reload the section data
                    if (section === "quotes") {
                        return fetch("http://localhost:8081/quotes")
                            .then((res) => res.json())
                            .then((data) => setQuotes(data));
                    } else if (section === "bills") {
                        return fetch("http://localhost:8081/bills")
                            .then((res) => res.json())
                            .then((data) => setBills(data));
                    }
                } else {
                    alert("Error adding note.");
                }
            })
            .catch((error) => console.error("Error adding note:", error));
    };

    const parseNotes = (notes) => {
        if (!notes) return [];
        return notes.split("!@#$%^&*").map((note, index) => ({
            id: index,
            message: note.trim(),
        }));
    };

    return (
        <div id="client-dashboard-container">
            <div id="client-dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div id="client-dashboard-flexbox">
                {/* Quotes Section */}
                <div id="client-section">
                    <h2>Your Quotes</h2>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <div key={quote.quoteId} className="client-card">
                                <h3>Quote ID: {quote.quoteId}</h3>
                                <p>Property Address: {quote.propertyAddress}</p>
                                <p>Square Footage: {quote.squareFeet}</p>
                                <p>Proposed Price: ${quote.proposedPrice}</p>
                                <p>Status: {quote.status}</p>
                                <h4>Notes:</h4>
                                <div className="note-section">
                                    {parseNotes(quote.notes).map((note) => (
                                        <p key={note.id}>{note.message}</p>
                                    ))}
                                </div>
                                <textarea
                                    value={noteInput[quote.quoteId] || ""}
                                    onChange={(e) =>
                                        setNoteInput({
                                            ...noteInput,
                                            [quote.quoteId]: e.target.value,
                                        })
                                    }
                                    placeholder="Add a note..."
                                />
                                <button onClick={() => handleAddNote(quote.quoteId, "quotes")}>
                                    Add Note
                                </button>
                                <div className="client-card-buttons">
                                    <button
                                        onClick={() => handleQuoteResponse(quote.quoteId, "accept")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleQuoteResponse(quote.quoteId, "resubmit")}
                                    >
                                        Resubmit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No quotes available.</p>
                    )}
                </div>

                {/* Orders Section */}
                <div id="client-section">
                    <h2>Your Orders</h2>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.orderId} className="client-card">
                                <h3>Order ID: {order.orderId}</h3>
                                <p>Work Start Date: {order.startDate}</p>
                                <p>Work End Date: {order.endDate}</p>
                                <p>Status: {order.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No orders available.</p>
                    )}
                </div>

                {/* Bills Section */}
                <div id="client-section">
                    <h2>Your Bills</h2>
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.billId} className="client-card">
                                <h3>Bill ID: {bill.billId}</h3>
                                <p>Amount: ${bill.amount}</p>
                                <p>Status: {bill.status}</p>
                                <h4>Notes:</h4>
                                <div className="note-section">
                                    {parseNotes(bill.notes).map((note) => (
                                        <p key={note.id}>{note.message}</p>
                                    ))}
                                </div>
                                <textarea
                                    value={noteInput[bill.billId] || ""}
                                    onChange={(e) =>
                                        setNoteInput({
                                            ...noteInput,
                                            [bill.billId]: e.target.value,
                                        })
                                    }
                                    placeholder="Add a note..."
                                />
                                <button onClick={() => handleAddNote(bill.billId, "bills")}>
                                    Add Note
                                </button>
                                <div className="client-card-buttons">
                                    <button onClick={() => handleBillResponse(bill.billId, "pay")}>
                                        Pay
                                    </button>
                                    <button
                                        onClick={() => handleBillResponse(bill.billId, "dispute")}
                                    >
                                        Dispute
                                    </button>
                                </div>
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
