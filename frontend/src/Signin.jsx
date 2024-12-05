import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {

    const DAVE_SMITH_EMAIL = "davesmith@gmail.com";
    const DAVE_SMITH_PASSWORD = "dsmith123";

    const navigate = useNavigate();

    const handleSignin = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (!email || !password) { // check if email or password is empty
            alert("Please fill in all fields");
            return;
        }
        if (email === DAVE_SMITH_EMAIL && password === DAVE_SMITH_PASSWORD) { // check for Dave Smith credentials
            navigate('/davesmithdashboard');
            return;
        }
        try { // otherwise check if client's email and password are valid
            const response = await fetch('http://localhost:8081/signin', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ email: email, password: password })
            })
            const data = await response.json();
            if (data) { // if the client email and password are valid
                navigate('/home');
            } else { // if the client email and password are invalid
                alert("Invalid email or password");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="Signin-div-container">
            <h1 id="Sigin-h1-title">Signin</h1>
            <form>
                <div id="Signin-div-rowflexbox">
                    <label for="email">Email: </label>
                    <input className="Signin-input" type="text" id="email" name="email" />
                </div>
                <br></br>
                <div id="Signin-div-rowflexbox">
                    <label for="password">Password: </label>
                    <input className="Signin-input" type="password" id="password" name="password" />
                </div>
                <br></br>
            </form>
            <div id="Signin-div-bottomcolflexbox">
                <button onClick={handleSignin} id="Signin-button-signin">Signin</button>
                <div id="Signin-div-bottomrowflexbox">
                    <h3>Not yet registered?</h3>
                    <Link to="/register">
                        <a>Register</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signin;