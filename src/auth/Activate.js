import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

require('dotenv').config();

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: "",
        token: "",
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        console.log("token: ",token);

        if(token) {
            setValues({ ...values, name, token });
        }
    }, [match.params.token, values]);

    const { name, token } = values;

    const clickSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token },
        })
        .then( response => {
            console.log('ACTIVATE_SUCCESS', response)
            setValues({...values, show: false})
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('ACTIVATE_ERROR', error.response.data.error);
            toast.error(error.response.data.error);
        })
    };

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hello {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    )

    return (
        <Layout>
            <div className="col-d6 offset-md-3">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    )
}

export default Activate;