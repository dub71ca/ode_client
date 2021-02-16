//the details of a contribution
//here we will allow subscribers to subscribe
//rate and comment 

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Contribution from '../components/Contribution';

const Details =(props, { history }) => {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        loadContribution();
    }, []);

    const loadContribution = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/contribution/${contribution._id}`
        })
        .then(response => {
            console.log('DETAILS_CONTRIBUTION_SUCCESS', response);
            setDetails(response.data.data);
        })
        .catch(error => {
            console.log('DETAILS_CONTRIBUTION_ERROR', error);
        })
    }

    const contributionDetails = () => (
        <div className="col-d6 offset-md-3">
            <h1>Details</h1>
        </div>
    )
    
    return(
        <Layout>
            contributionDetails()
        </Layout>
    )
}

export default Details;