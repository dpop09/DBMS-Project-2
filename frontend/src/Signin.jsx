import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/getall')       // call backend route
       .then(response => response.json())           // Converts the response from the fetch request into JSON format.
       .then(data => setData(data))            // Updates the state variable data with the fetched data using the setData function.
       .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Signin</h1>
            <div id="table-container">
                <table>
                    <tbody>
                        <tr>
                            <th>Client ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>CC Number</th>
                            <th>CC Security Code</th>
                            <th>CC Expiration Date</th>
                            <th>CC Holder Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                        {data.map((d, i) => (                 // Maps over the data array to create a table row (<tr>) for each item d in data. The index i is used as a unique key for each row.
                            <tr key={i}>
                                <td>{d.client_id}</td>
                                <td>{d.f_name}</td>
                                <td>{d.l_name}</td>
                                <td>{d.address}</td>
                                <td>{d.cc_number}</td>
                                <td>{d.cc_security_code}</td>
                                <td>{d.cc_expiration_date}</td>
                                <td>{d.cc_holder_name}</td>
                                <td>{d.phone_number}</td>
                                <td>{d.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Signin;