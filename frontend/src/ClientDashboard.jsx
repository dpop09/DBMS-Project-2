import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

function ClientDashboard() {
    const [quotes, setQuotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [propertyAddress, setPropertyAddress] = useState("");
    const [proposedPrice, setProposedPrice] = useState("");
    const [squareFeet, setSquareFeet] = useState("");
    const [note, setNote] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [quoteId, setQuoteId] = useState("");

    const { clientId } = useContext(AuthContext);

    // Fetch quotes, orders, and bills
    const fetchQuotes = async () => {
        try {
            const response = await fetch(`http://localhost:8081/quotes?client_id=${clientId}`);
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8081/orders?client_id=${clientId}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBills = async () => {
        try {
            const response = await fetch(`http://localhost:8081/bills?client_id=${clientId}`);
            const data = await response.json();
            setBills(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Create a new quote
    const handleCreateQuote = async () => {
        if (!propertyAddress || !proposedPrice || !squareFeet || !note) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const response = await fetch("http://localhost:8081/create-quote", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    client_id: clientId,
                    property_address: propertyAddress,
                    proposed_price: proposedPrice,
                    square_feet: squareFeet,
                    note: note,
                }),
            });

            if (response.ok) {
                alert("Quote created successfully.");
                setPropertyAddress("");
                setProposedPrice("");
                setSquareFeet("");
                setNote("");
                fetchQuotes();
            } else {
                alert("Failed to create quote.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle driveway picture upload
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadPicture = async () => {
        if (!quoteId || !selectedFile) {
            alert("Please provide a Quote ID and a file.");
            return;
        }

        const formData = new FormData();
        formData.append("quote_id", quoteId);
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8081/upload-driveway-picture", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Driveway picture uploaded successfully.");
                setQuoteId("");
                setSelectedFile(null);
            } else {
                alert("Failed to upload driveway picture.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQuotes();
        fetchOrders();
        fetchBills();
    }, []);

    return (
        <div id="ds-div-container">
            <div id="ds-div-header">
                <h1 id="ds-h1-title">Welcome to Your Dashboard</h1>
                <button onClick={() => console.log("Logout functionality here")}>Logout</button>
            </div>
            <div id="ds-div-flexbox">
                {/* Create a Quote Section */}
                <div id="ds-div-card-column">
                    <h2>Create a Quote</h2>
                    <div id="ds-div-card">
                        <div id="ds-div-cardrow">
                            <label>Property Address:</label>
                            <input
                                type="text"
                                value={propertyAddress}
                                onChange={(e) => setPropertyAddress(e.target.value)}
                            />
                        </div>
                        <div id="ds-div-cardrow">
                            <label>Proposed Price:</label>
                            <input
                                type="text"
                                value={proposedPrice}
                                onChange={(e) => setProposedPrice(e.target.value)}
                            />
                        </div>
                        <div id="ds-div-cardrow">
                            <label>Square Footage:</label>
                            <input
                                type="text"
                                value={squareFeet}
                                onChange={(e) => setSquareFeet(e.target.value)}
                            />
                        </div>
                        <div id="ds-div-cardrow">
                            <label>Notes:</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows="4"
                                cols="30"
                                placeholder="Enter notes here..."
                            />
                        </div>
                        <button onClick={handleCreateQuote}>Submit Quote</button>
                    </div>
                    <div id="ds-div-card">
                        <h3>Upload Driveway Picture</h3>
                        <div id="ds-div-cardrow">
                            <label>Quote ID:</label>
                            <input
                                type="text"
                                value={quoteId}
                                onChange={(e) => setQuoteId(e.target.value)}
                                placeholder="Enter Quote ID"
                            />
                        </div>
                        <div id="ds-div-cardrow">
                            <label>Upload File:</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <button onClick={handleUploadPicture}>Upload Picture</button>
                    </div>
                </div>

                {/* Quotes Section */}
                <div id="ds-div-card-column">
                    <h2>Your Quotes</h2>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <div key={quote.quote_id} id="ds-div-card">
                                <p><strong>Property Address:</strong> {quote.property_address}</p>
                                <p><strong>Proposed Price:</strong> ${quote.proposed_price}</p>
                                <p><strong>Status:</strong> {quote.request_status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No quotes available.</p>
                    )}
                </div>

                {/* Orders Section */}
                <div id="ds-div-card-column">
                    <h2>Your Orders</h2>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.order_id} id="ds-div-card">
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
                <div id="ds-div-card-column">
                    <h2>Your Bills</h2>
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.bill_id} id="ds-div-card">
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
