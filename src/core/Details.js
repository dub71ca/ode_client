//the details of a contribution
//here we will allow subscribers to subscribe
//rate and comment 

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';

const Details =(props, { history }) => {

    const [details, setDetails] = useState({});

    useEffect(() => {
        loadContribution();
        console.log('details', details);
    }, []);

    const loadContribution = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/contribution-details/${props.match.params.contribution_id}`
        })
        .then(response => {
            // console.log('DETAILS_CONTRIBUTION_SUCCESS', response.data.data[0]);
            setDetails(response.data.data[0]);
        })
        .catch(error => {
            console.log('DETAILS_CONTRIBUTION_ERROR', error);
        })
    } 

    const contributionDetails = () => (
        <div className="col-d6 offset-md-3">
            <h1>Details of {details.title}</h1>

        </div>
    )
    
    return(
        <Layout>
            {contributionDetails()}
        </Layout>
    )
}

export default Details;