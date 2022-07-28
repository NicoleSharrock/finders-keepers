import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
                    <div className="form">
                        <form onSubmit={handleFormSubmit}>
                            <div className="input-container">
                            <label>Username </label>
                                <input
                                    placeholder="Your username"
                                    name="username"
                                    type="username"
                                    id="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container">
                            <label>Password </label>
                                <input
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    id="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='button-container'>
                            <button className="btn d-block w-100" type="submit">
                                Submit
                            </button>
                            </div>
                        </form>

                        {error && <div>Signup failed</div>}
                    </div>
    );
};

export default Signup;
