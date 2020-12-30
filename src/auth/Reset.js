import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

require('dotenv').config();

const Reset = ({ match }) => {  //props.match from react router dom

    const [values, setValues] = useState({
        name: "",
        token: "",
        newPassword: "",
        buttonText: "Reset Password",
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);

        if(token) {
            setValues({...values, name, token});
        }
    }, [])

    console.log("values decoded", values);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = (event) => {
        setValues({...values, newPassword: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
            method: 'PUT', 
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token },
        })
        .then(response => {
            console.log('RESET_PASSWORD_SUCCESS', response)
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Requested'})
        })
        .catch(error => {
            console.log('RESET_PASSORD_ERROR', error.response.data);
            console.log("env", process.env.REACT_APP_API);
            setValues({ ...values, buttonText: 'Reset Password'})
            toast.error(error.response.data.error);
        })
    };

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">New Password for {name} </label>
                <input onChange={handleChange} value={newPassword} type="password" required className="form-control" />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-d6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Reset Password</h1>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
}

export default Reset;