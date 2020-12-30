import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

require('dotenv').config();

const SignIn = ({ history }) => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit",
    });

    const { email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
            method: 'POST', 
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password },
        })
        .then(response => {
            // save response (user, token) to cookie
            console.log('SIGNIN_SUCCESS', response)

            authenticate(response, () => {
                setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
                //toast.success(`Hello, ${response.data.user.name}, Welcome back!`);
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
    
            })
        })
        .catch(error => {
            console.log('SIGNIN_ERROR', error.response.data);
            console.log("env", process.env.REACT_APP_API);
            setValues({ ...values, buttonText: 'Submit'})
            toast.error(error.response.data.error);
        })
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>
            <div>
                <button className="btn btn-primary mr-5" onClick={clickSubmit}>{buttonText}</button>
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
            </div>
            <div></div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() && <Redirect to="/" />}
                <h1 className="p-5 text-center">SignIn</h1>
                {signInForm()}
            </div>
        </Layout>
    )
}

export default SignIn;