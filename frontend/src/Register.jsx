import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const address = document.getElementById("address").value;
        const ccnumber = document.getElementById("ccnumber").value;
        const ccsecuritycode = document.getElementById("ccsecuritycode").value;
        const ccexpirationdate = document.getElementById("ccexpirationdate").value;
        const ccname = document.getElementById("ccname").value;
        const phonenumber = document.getElementById("phonenumber").value;
        if (!email || !password || !fname || !lname || !address || !ccnumber || !ccsecuritycode || !ccexpirationdate || !ccname || !phonenumber) {
            alert("Please fill in all fields");
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/register', { // send a POST request to the backend route
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email : email, password : password, fname : fname, lname : lname, address : address, ccnumber : ccnumber, ccsecuritycode : ccsecuritycode, ccexpirationdate : ccexpirationdate, ccname : ccname, phonenumber : phonenumber })
            })
            const data = await response.json();
            if (data === true) { // if the response is successful
                navigate('/home');
            } else { // if the response is unsuccessful
                alert("Internal Server Error. Please try again later.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (    
        <div id="container">
            <h1 id="title">Register</h1>
            <form>
                <div id="row-flex-box">
                    <label for="email">Email: </label>
                    <input type="text" id="email" name="email" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="fname">First Name: </label>
                    <input type="text" id="fname" name="fname" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="lname">Last Name: </label>
                    <input type="text" id="lname" name="lname" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="address">Address: </label>
                    <input type="text" id="address" name="address" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="ccnumber">Credit Card Number: </label>
                    <input type="text" id="ccnumber" name="ccnumber" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="ccsecuritycode">Credit Card Security Code: </label>
                    <input type="text" id="ccsecuritycode" name="ccsecuritycode" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="ccexpirationdate">Credit Card Expiration Date: </label>
                    <input type="text" id="ccexpirationdate" name="ccexpirationdate" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="ccholdername">Credit Card Holder Name: </label>
                    <input type="text" id="ccname" name="ccholdername" />
                </div>
                <br></br>
                <div id="row-flex-box">
                    <label for="phonenumber">Phone Number: </label>
                    <input type="text" id="phonenumber" name="phonenumber" />
                </div>
                <br></br>
                <button onClick={handleRegister} id="register-btn">Register</button>
            </form>
            <div id="flex-box">
                <h3>Already registered? </h3>
                <Link to="/signin">
                    <a>Signin</a>
                </Link>
            </div>
        </div>
    )
}

export default Register;