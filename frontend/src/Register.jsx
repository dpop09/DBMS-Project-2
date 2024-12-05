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
        try { // check if email is already in use
            const response = await fetch('http://localhost:8081/is-email-in-use', { // send a POST request to the backend route
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email : email })
            })
            const data = await response.json();
            if (data) { // if the email is already in use
                alert("Email already exists");
                return;
            }
        } catch (error) {
            console.log(error);
        }
        try { // otherwise register the client
            const response = await fetch('http://localhost:8081/register', { // send a POST request to the backend route
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email : email, password : password, fname : fname, lname : lname, address : address, ccnumber : ccnumber, ccsecuritycode : ccsecuritycode, ccexpirationdate : ccexpirationdate, ccname : ccname, phonenumber : phonenumber })
            })
            const data = await response.json();
            if (data) { // if the registration was successful
                navigate('/login');
            } else { // if the registration failed
                alert("Internal server error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (    
        <div id="Register-div-container">
            <h1 id="Register-h1-title">Register</h1>
            <form id="Register-form-container">
                <div id="Register-div-colflexbox">
                    <div id="Register-div-rowflexbox">
                        <label for="email">Email: </label>
                        <input type="text" className="Register-input" id="email" name="email" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="password">Password: </label>
                        <input type="password" className="Register-input" id="password" name="password" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="fname">First Name: </label>
                        <input type="text" className="Register-input" id="fname" name="fname" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="lname">Last Name: </label>
                        <input type="text" className="Register-input" id="lname" name="lname" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="address">Address: </label>
                        <input type="text" className="Register-input" id="address" name="address" />
                    </div>
                </div>
                <div id="Register-div-colflexbox">
                    <div id="Register-div-rowflexbox">
                        <label for="ccnumber">CC Number: </label>
                        <input type="text" className="Register-input" id="ccnumber" name="ccnumber" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="ccsecuritycode">CC Security Code: </label>
                        <input type="text" className="Register-input" id="ccsecuritycode" name="ccsecuritycode" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="ccexpirationdate">CC Expiration Date: </label>
                        <input type="text" className="Register-input" id="ccexpirationdate" name="ccexpirationdate" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="ccholdername">CC Holder Name: </label>
                        <input type="text" className="Register-input" id="ccname" name="ccholdername" />
                    </div>
                    <br></br>
                    <div id="Register-div-rowflexbox">
                        <label for="phonenumber">Phone Number: </label>
                        <input type="text" className="Register-input" id="phonenumber" name="phonenumber" />
                    </div>
                </div>
            </form>
            <div id="Register-div-bottomcolflexbox">
                <button onClick={handleRegister} id="Register-button-register">Register</button>
                <div id="Register-div-bottomrowflexbox">
                    <h3>Already registered? </h3>
                    <Link to="/signin">
                        <a>Signin</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register;