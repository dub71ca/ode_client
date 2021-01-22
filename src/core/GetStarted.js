import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Contributor from '../components/Contributor';
import { isAuth, getCookie } from '../auth/helpers';
import axios from 'axios';

const GetStarted = ({ history }) => {

    const [values, setValues] = useState({
        editID: "",
        userID: "",
        plan: "",
        title: "",
        description: "",
        link: "",
        contact: "",
    });

    const token = getCookie('token');
    let authorizedUser = isAuth();
    
    // if(!authorizedUser || authorizedUser === 'undefined') {
    if(!authorizedUser) {
        console.log('user', authorizedUser);
        authorizedUser = {
            _id: 'undefined'
        }
        history.push('/signin');
    } 
    

    const [data, setData] = useState([]);

    useEffect(() => {
        loadContributions();
    }, []);

    const loadContributions = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/my-contributions/${authorizedUser._id}`
        })
        .then(response => {
            console.log('GET_STARTED_CONTRIBUTORS_SUCCESS', response);
            setData(response.data.data);
        })
        .catch(error => {
            console.log('GET_STARTED_CONTRIBUTORS_ERROR', error);
        })
    }

    const [ActiveDisplay, setActiveDisplay] = useState("DISPLAY");

    const { editID, userID, plan, title, description, link, contact } = values;
    
    const handleSubmit = (event) => {

        console.log('userID', authorizedUser._id);
        console.log('ActiveDisplay', ActiveDisplay);
        let crudURL = process.env.REACT_APP_API + '/add-contribution';
        let crudMethod = 'POST';
        if(ActiveDisplay === 'EDIT'){
            crudURL = process.env.REACT_APP_API + '/edit-contribution';
            crudMethod = 'PUT';
        }

        console.log('method:', crudMethod);
        console.log('url:', crudURL);

        setValues({...values, userID: authorizedUser._id});

        event.preventDefault();
        // validate
        axios({
            method: crudMethod,
            url: crudURL,
            headers: {
                Authorizatoin: `Bearer ${token}`
            },
            data: { editID, userID, plan, title, description, link, contact },
        })
        .then( response => {
            console.log('ADD_CONTRIBUTOR_SUCCESS', response)
        })
        .catch(error => {
            console.log('ADD_CONTRIBUTOR_ERROR', error)
        })
        setActiveDisplay("DISPLAY");
    }

    const handleCreateClick = (event) => {
        setActiveDisplay("CREATE");
    }

    const displayContributions = () => (
        <div className="col-d6 offset-md-3">
            <h1 className="text-center">Your Contributions</h1>
            <div>
                {(data.length > 0) ? data.map(contribution => (
                    <Contributor 
                        key={contribution._id}
                        contributionID={contribution._id}
                        title={contribution.title}
                        description={contribution.description}
                        link={contribution.link}
                        contact={contribution.contact}
                        plan={contribution.plan}
                        editable={true}
                        handleEditClick={() => handleEditClick(contribution)}
                    />
                )) : null}
            </div>
            <div onClick={handleCreateClick}>
                <i className="fas fa-plus-circle fa-7x btn btn-primary"></i>
            </div>
        </div> 
    )

    const handleEditClick = (event) => {
        setActiveDisplay("EDIT");
        console.log('event', event);
        setValues({
            ...values, 
            editID: event._id,
            title: event.title,
            description: event.description,
            plan: event.plan,
            contact: event.contact,
            link: event.link,
        })

    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const createContribution = () => (

        <div className="col-d6 offset-md-3">
            <form>
                <div className="form-group">
                    <input name="title" onChange={handleChange} type="text" value={title} placeholder="Title" />
                </div>
                <div className="form-group">
                    <textarea name="description" onChange={handleChange} type="text" value={description} placeholder="description" />
                </div>
                <div>
                    <select name="plan" id="plan" onChange={handleChange} value={plan}>
                        <option value="">Select a Plan</option>
                        <option value="peryear">Per Year</option>
                        <option value="permonth">Per Month</option>
                    </select>
                </div>
                <div className="form-group">
                    <input name="link" onChange={handleChange} type="text" value={link} placeholder="link" />
                </div>
                <div className="form-group">
                    <input name="contact" onChange={handleChange} type="text" value={contact} placeholder="contact" />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div> 
    )

    return(
        <Layout>
            {(ActiveDisplay === "DISPLAY") ? displayContributions() : createContribution()}
        </Layout>
    )
}

export default GetStarted;