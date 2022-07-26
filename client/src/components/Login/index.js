import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from '../../utils/auth';



function App() {

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    // User Login info
    const database = [
        {
            username: "",
            password: ""
        },
        {
            username: "",
            password: ""
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];
        console.log(uname.value);
        console.log(pass.value)
        // Find user login info
        // const userData = database.find((user) => user.username === uname.value);
        const { data } = await login({
            variables: {
                username: uname.value,
                password: pass.value
            }
        })

        // Compare user info
        if (!data) {
            //     if (data.password !== pass.value) {
            //         // Invalid password
            //         setErrorMessages({ name: "pass", message: errors.pass });
            //     } else {
            //         setIsSubmitted(true);
            //     }
            // } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
            return;

        }

        console.log(data)
        Auth.login(data.login.token)
        alert("Successful!")
        console.log(data)
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" value="Log In" />
                </div>
                <div className="button-container">
                    <input type="submit" value="Log Out" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title-signin">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>

    );
}


export default App;

