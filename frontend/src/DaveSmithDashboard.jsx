import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DaveSmithDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div id="ds-div-container">
            <div id="ds-div-header">
                <h1 id="ds-h1-title">Welcome, Dave Smith</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div id="ds-div-flexbox">
                <div id="ds-div-request-container">
                    <h2>Incoming Quotes</h2>
                    <div id="ds-div-card">
                        <h3>Richard Burr</h3>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Phone Number:</p>
                            <p>123-456-7890</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Email:</p>
                            <p>7lX7F@example.com</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Request:</p>
                            <p>Driveway Sealing</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Address:</p>
                            <p>123 Main St, Anytown USA</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Square Footage:</p>
                            <p>100</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Proposed Price:</p>
                            <p>$500</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Note:</p>
                            <p>Need to replace old seal</p>
                        </div>
                        <div id="ds-div-buttons">
                            <button>Reject</button>
                            <button>Accept</button>
                        </div>
                    </div>
                </div>
                <div id="ds-div-request-container">
                    <h2>Order of Works</h2>
                    <div id="ds-div-card">
                        <h3>Barney Gumble</h3>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Phone Number:</p>
                            <p>098-765-4321</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Email:</p>
                            <p>VW2d4@example.com</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Request:</p>
                            <p>Driveway Sealing</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Address:</p>
                            <p>456 Main St, Anytown USA</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Square Footage:</p>
                            <p>120</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Proposed Price:</p>
                            <p>$600</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Note:</p>
                            <p>Need to replace old seal</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Time Window: </p>
                            <p>6/1/2025 - 6/2/2025</p>
                        </div>
                        <div id="ds-div-buttons">
                            <button>Reject</button>
                            <button>Accept</button>
                        </div>
                    </div>
                </div>
                <div id="ds-div-request-container">
                    <h2>Bills</h2>
                    <div id="ds-div-card">
                        <h3>Tyrion Lannister</h3>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Phone Number:</p>
                            <p>135-792-4680</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Email:</p>
                            <p>l8Sb0@example.com</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Request:</p>
                            <p>Driveway Sealing</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Address:</p>
                            <p>789 Main St, Anytown USA</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Square Footage:</p>
                            <p>80</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Proposed Price:</p>
                            <p>$400</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Note:</p>
                            <p>Need to replace old seal</p>
                        </div>
                        <div id="ds-div-cardrow">
                            <p id="ds-p-cardrowlabel">Time Window: </p>
                            <p>6/9/2025 - 6/9/2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DaveSmithDashboard