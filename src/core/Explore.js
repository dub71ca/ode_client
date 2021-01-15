import React, { useState, useEffect } from 'react';
import Contributor from '../components/Contributor';
import axios from 'axios';

function Explore({ history }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadContributors()
    }, []);

    const loadContributors = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/contributors}`,
        })
        .then(response => {
            console.log('GET_CONTRIBUTORS_SUCCESS', response);
            setData(response.data);
        })
        .catch(error => {
            console.log('GET_CONTRIBUTORS_ERROR', error);
            if(error.response.status === 401) {
                history.push('/');
            }
        })
    }

    return(
        <div>
            {data.map(contributor => (
                <Contributor 
                    key={contributor._id}
                    title={contributor.title}
                    description={contributor.description}
                    link={contributor.link}
                    contact={contributor.contact}
                />
          ))}
        </div>
    )
}

export default Explore;