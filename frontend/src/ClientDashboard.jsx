import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

function ClientDashboard() {
    const [quotes, setQuotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const { clientId } = useContext(AuthContext);

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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadPicture = async () => {
        if (!selectedQuoteId || !selectedFile) {
            alert("Please select a quote and a file.");
            return;
        }

        const formData = new FormData();
        formData.append("quote_id", selectedQuoteId);
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8081/upload-driveway-picture", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Driveway picture uploaded successfully.");
                setSelectedQuoteId("");
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
                <div id="ds-div-card-column">
                    <h2>Upload Driveway Picture</h2>
                    <div>
                        <label htmlFor="quoteSelect">Select Quote:</label>
                        <select
                            id="quoteSelect"
                            value={selectedQuoteId}
                            onChange={(e) => setSelectedQuoteId(e.target.value)}
                        >
                            <option value="">--Select a Quote--</option>
                            {quotes.map((quote) => (
                                <option key={quote.quote_id} value={quote.quote_id}>
                                    {quote.property_address}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fileInput">Select File:</label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button onClick={handleUploadPicture}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default ClientDashboard;
