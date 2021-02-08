import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google';
import Facebook from './Facebook';

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

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        })
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
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-2 text-center">Sign In</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                {signInForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
                 Not registered? <a href="/signup"> Sign Up</a> here.
            </div>
        </Layout>
    )
}

export default SignIn;