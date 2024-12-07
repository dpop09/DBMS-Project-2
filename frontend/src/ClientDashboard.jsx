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
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    const [selectedFile5, setSelectedFile5] = useState(null);

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
                fetchQuotes();
            } else {
                alert("Failed to create quote.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    

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

    useEffect(() => {
        fetchQuotes();
        fetchOrders();
        fetchBills();
    }, []);

    return (
        <div id="client-div-container">
            <div id="client-div-header">
                <h1 id="client-h1-title">Welcome to Your Dashboard {clientId}</h1>
                <button onClick={() => console.log("Logout functionality here")}>Logout</button>
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

                {/* Quotes Section */}
                <div id="client-div-card-column">
                    <h2>Your Quotes</h2>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <div key={quote.quote_id} id="client-div-card">
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
