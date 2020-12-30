import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

require('dotenv').config();

const Forgot = ({ history }) => {

    const [values, setValues] = useState({
        email: "",
        buttonText: "Submit",
    });

    const { email, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
            method: 'PUT', 
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email },
        })
        .then(response => {
            // save response (user, token) to cookie
            console.log('FORGOT_PASSWORD_SUCCESS', response)
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Requested'})
        })
        .catch(error => {
            console.log('FORGOT_PASSORD_ERROR', error.response.data);
            console.log("env", process.env.REACT_APP_API);
            setValues({ ...values, buttonText: 'Submit'})
            toast.error(error.response.data.error);
        })
    };

    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
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
                <h1 className="p-5 text-center">Forgot Password</h1>
                {forgotPasswordForm()}
            </div>
        </Layout>
    )
}

export default Forgot;