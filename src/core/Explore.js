import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Contribution from '../components/Contribution';
import axios from 'axios';
import Layout from './Layout';

function Explore({ history }) {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        loadContributions();
    }, []);

    const loadContributions = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/contributions`
        })
        .then(response => {
            console.log('GET_CONTRIBUTIONS_SUCCESS', response);
            setData(response.data.data);
        })
        .catch(error => {
            console.log('GET_CONTRIBUTIONS_ERROR', error);
        })
    }

    const handleSelectClick=(event) => {
        // open contribution
        // have contributor paypal buttons available 
        history.push("/details/" + event._id);

    }

    return(
        <Layout>
        <div>
            {(data.length > 0) ? data.map(contribution => (
                <Contribution 
                    key={contribution._id}
                    title={contribution.title}
                    description={contribution.description}
                    link={contribution.link}
                    contact={contribution.contact}
                    editable={false}
                    handleSelectClick={() => handleSelectClick(contribution)}
                />
          )) : null}
        </div>
        </Layout>
    )
}

export default Explore;