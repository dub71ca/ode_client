import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Contributor from '../components/Contributor';
import { isAuth, getCookie, signOut } from '../auth/helpers';
import axios from 'axios';

const GetStarted = ({ history }) => {

    const [values, setValues] = useState({
        title: "",
        description: "",
        link: "",
        contact: "",
    });

    const token = getCookie('token');

    useEffect(() => {
        loadUserData()
    }, []);

    const loadUserData = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('GET_STARTED_IS_REGISTERED_USER', response);
            const {role, name, email} = response.data;
            setValues({...values, role, name, email});
        })
        .catch(error => {
            console.log('GET_STARTED_IS_REGISTERED_USER_ERROR', error);
            if(error.response.status === 401) {
                signOut(() => {
                    history.push('/');
                });
            }
        })
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        loadContributions();
    }, []);

    const loadContributions = () => {
        console.log('id', isAuth()._id);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/my-contributions/${isAuth()._id}`
        })
        .then(response => {
            console.log('GET_STARTED_CONTRIBUTORS_SUCCESS', response);
            setData(response.data.data);
        })
        .catch(error => {
            console.log('GET_STARTED_CONTRIBUTORS_ERROR', error);
        })
    }

    

    return(
        <Layout>
            <div className="col-d6 offset-md-3">
                <h1 className="text-center">Your Contributions</h1>
                {/* {contributionForm()} */}
                <div>
                    {console.log('data', data.length)}
                    {(data.length > 0) ? data.map(contributor => (
                        <Contributor 
                            key={contributor._id}
                            title={contributor.title}
                            description={contributor.description}
                            link={contributor.link}
                            contact={contributor.contact}
                        />
                )) : null}
                </div>
                <a href="/create-contribution"><i className="fas fa-plus-circle fa-7x btn btn-primary"></i></a>
            </div> 
        </Layout>
    )
}

export default GetStarted;