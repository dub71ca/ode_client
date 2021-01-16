import React, { useState, useEffect } from 'react';
import Contributor from '../components/Contributor';
import axios from 'axios';
import Layout from './Layout';

function Explore({ history }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadContributors();
    }, []);

    const loadContributors = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/contributors`
        })
        .then(response => {
            console.log('GET_CONTRIBUTORS_SUCCESS', response);
            setData(response.data.data);
        })
        .catch(error => {
            console.log('GET_CONTRIBUTORS_ERROR', error);
        })
    }

    return(
        <Layout>
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
        </Layout>
    )
}

export default Explore;