import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);

  const [propertyAddress, setPropertyAddress] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [squareFootage, setSquareFootage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:8081/quotes")
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:8081/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:8081/bills")
      .then((response) => response.json())
      .then((data) => setBills(data))
      .catch((error) => console.log(error));
  }, []);

  const handleCreateQuote = async () => {
    if (!propertyAddress || !proposedPrice || !squareFootage) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/add-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyAddress,
          proposedPrice,
          squareFootage,
        }),
      });

      if (response.ok) {
        alert("Quote created successfully.");
        setPropertyAddress("");
        setProposedPrice("");
        setSquareFootage("");
        // Refresh quotes
        const quotesResponse = await fetch("http://localhost:8081/quotes");
        const updatedQuotes = await quotesResponse.json();
        setQuotes(updatedQuotes);
      } else {
        alert("Error creating quote.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="client-dashboard-container">
      <div id="client-dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div id="client-dashboard-flexbox">
        {/* Create a Quote Column */}
        <div id="client-dashboard-column">
          <h2>Create a Quote</h2>
          <div id="client-dashboard-card">
            <label>Property Address:</label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              placeholder="Enter property address"
            />
            <label>Proposed Price:</label>
            <input
              type="number"
              value={proposedPrice}
              onChange={(e) => setProposedPrice(e.target.value)}
              placeholder="Enter proposed price"
            />
            <label>Square Footage:</label>
            <input
              type="number"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              placeholder="Enter square footage"
            />
            <button onClick={handleCreateQuote}>Submit Quote</button>
          </div>
        </div>

        {/* Your Quotes Column */}
        <div id="client-dashboard-column">
          <h2>Your Quotes</h2>
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <div key={quote.quote_id} id="client-dashboard-card">
                <p><strong>Quote ID:</strong> {quote.quote_id}</p>
                <p><strong>Property Address:</strong> {quote.property_address}</p>
                <p><strong>Proposed Price:</strong> ${quote.proposed_price}</p>
                <p><strong>Square Footage:</strong> {quote.square_footage}</p>
              </div>
            ))
          ) : (
            <p>No quotes available.</p>
          )}
        </div>

        {/* Your Orders Column */}
        <div id="client-dashboard-column">
          <h2>Your Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.order_id} id="client-dashboard-card">
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>Quote ID:</strong> {order.quote_id}</p>
                <p><strong>Start Date:</strong> {order.start_date}</p>
                <p><strong>End Date:</strong> {order.end_date}</p>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>

        {/* Your Bills Column */}
        <div id="client-dashboard-column">
          <h2>Your Bills</h2>
          {bills.length > 0 ? (
            bills.map((bill) => (
              <div key={bill.bill_id} id="client-dashboard-card">
                <p><strong>Bill ID:</strong> {bill.bill_id}</p>
                <p><strong>Order ID:</strong> {bill.order_id}</p>
                <p><strong>Amount:</strong> ${bill.amount}</p>
                <p><strong>Status:</strong> {bill.status}</p>
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
