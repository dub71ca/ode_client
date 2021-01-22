import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signOut, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = ({ history }) => {

    const [values, setValues] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
        buttonText: "Update",
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile()
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE_PROFILE_UPDATE', response);
            const {role, name, email} = response.data;
            setValues({...values, role, name, email});
        })
        .catch(error => {
            console.log('PRIVATE_PROFILE_UPDATE_ERROR', error);
            if(error.response.status === 401) {
                signOut(() => {
                    history.push('/');
                });
            }
        })
    }

    const { name, role, email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Updating'});
        axios({
            method: 'PUT', 
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {name, password},
        })
        .then( response => {
            console.log('PRIVATE_PROFILE_UPDATE_SUCCESS', response)

            updateUser(response, () => {
                setValues({...values, buttonText: 'Updated'})
                toast.success('Profile updated successfully');
            });
        })
        .catch(error => {
            console.log('PRIVATE_PROFILE_UPDATE_ERROR', error.response.data);
            console.log("env", process.env.REACT_APP_API);
            setValues({ ...values, buttonText: 'Update'})
            toast.error(error.response.data.error);
        })
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled /> 
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled />
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
            <div className="col-d6 offset-md-3">
                <ToastContainer />
                <h1 className="pt-1 text-center">Private</h1>
                <h1 className="lead text-center">Profile Update</h1>
                {updateForm()}
            </div>
        </Layout>
    )
}

export default Private;