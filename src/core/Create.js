import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Contribution from '../components/Contribution';
import PayPalSubscription from '../components/PayPalSubcription';
import { isAuth, getCookie } from '../auth/helpers';
import axios from 'axios';

const Create = ({ history }) => {

    const intitialValues = {
        editID: "",
        userID: "",
        plan: "",
        title: "",
        shortDescription: "",
        longDescription: "",
        link: "",
        contact: "",
    }

    const [values, setValues] = useState({
        editID: "",
        userID: "",
        plan: "",
        title: "",
        shortDescription: "",
        longDescription: "",
        link: "",
        contact: "",
    });

    const [isDelete, setIsDelete] = useState(false);

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
    const [ActiveDisplay, setActiveDisplay] = useState("DISPLAY");

    useEffect(() => {
        console.log('useEffect');
        console.log('ActiveDisplay', ActiveDisplay);
        loadContributions();
        setValues({...values, userID: authorizedUser._id});
    }, [ActiveDisplay, isDelete]);

    const loadContributions = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/my-contributions/${authorizedUser._id}`
        })
        .then(response => {
            console.log('GET_STARTED_CONTRIBUTIONS_SUCCESS', response);
            setData(response.data.data);
        })
        .catch(error => {
            console.log('GET_STARTED_CONTRIBUTIONS_ERROR', error);
        })
    }

    const { editID, userID, plan, title, shortDescription, longDescription, link, contact } = values;
    
    const handleSubmit = (event) => {

        let crudURL = process.env.REACT_APP_API + '/add-contribution';
        let crudMethod = 'POST';
        if(ActiveDisplay === 'EDIT'){
            crudURL = process.env.REACT_APP_API + '/edit-contribution';
            crudMethod = 'PUT';
        }

        event.preventDefault();

        // validate
        axios({
            method: crudMethod,
            url: crudURL,
            headers: {
                Authorizatoin: `Bearer ${token}`
            },
            data: { editID, userID, plan, title, shortDescription, longDescription, link, contact },
        })
        .then( response => {
            console.log('ADD_CONTRIBUTION_SUCCESS', response)
            setActiveDisplay("DISPLAY");
        })
        .catch(error => {
            console.log('ADD_CONTRIBUTION_ERROR', error)
        })
    }

    const handleDeleteClick=(event) => {
        setIsDelete(true);
        console.log('event', event);
        axios({
            method: 'PUT',
            url: process.env.REACT_APP_API + `/delete-contribution/${event._id}`,
        })
        .then( response => {
            console.log('DELETE_CONTRIBUTION_SUCCESS', response)
            setIsDelete(false);
        })
        .catch(error => {
            console.log('DELETE_CONTRIBUTION_ERROR', error)
        })
    }

    const handleCreateClick = (event) => {
        setActiveDisplay("CREATE");
        setValues(intitialValues);
    }

    const displayContributions = () => (
        <div className="col-d6 offset-md-3">
            <h1 className="text-center">Your Contributions</h1>
            <div>
                {(data.length > 0) ? data.map(contribution => (
                    <Contribution 
                        key={contribution._id}
                        contributionID={contribution._id}
                        title={contribution.title}
                        shortDescription={contribution.shortDescription}
                        longDescription={contribution.longDescription}
                        link={contribution.link}
                        contact={contribution.contact}
                        isActive={contribution.isActive}
                        plan={contribution.plan}
                        editable={true}
                        handleEditClick={() => handleEditClick(contribution)}
                        handleDeleteClick={() => handleDeleteClick(contribution)}
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
            shortDescription: event.shortDescription,
            longDescription: event.longDescription,
            plan: event.plan,
            contact: event.contact,
            link: event.link,
        })
    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const createContribution = () => (

        <div className="row">
            <div className=" column-entry">
                <form>
                    <div className="form-group">
                        <input name="title" onChange={handleChange} type="text" value={title} placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <textarea name="shortDescription" onChange={handleChange} type="text" value={shortDescription} placeholder="Short Description" />
                    </div>
                    <div className="form-group">
                        <textarea name="longDescription" onChange={handleChange} type="text" value={longDescription} placeholder="Long Description" />
                    </div>
                    <div className="form-group">
                        <select name="plan" id="plan" onChange={handleChange} value={plan}>
                            <option value="">Select a Plan</option>
                            <option value="peryear">Per Year</option>
                            <option value="permonth">Per Month</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input name="link" onChange={handleChange} type="text" value={link} placeholder="link" />
                    </div>
                    <div className="form-group">
                        <input name="contact" onChange={handleChange} type="text" value={contact} placeholder="contact" />
                    </div>
                    <div>
                        <button className="btn btn-primary m-2" onClick={handleSubmit}>Save</button>
                        <button className="btn btn-primary m-2" onClick={() => history.goBack()}>Cancel</button>
                    </div>
                </form>
                {/* <PayPalSubscription /> */}
            </div>
            {/* down and dirty details will be a component of its own one day. reuse it in explore display detail */}
            <div className="contribution-preview">
                <div>
                    <h1>{title}</h1>
                </div>
                <div>
                    <p>{longDescription}</p>
                </div>
                <div>
                    <p>{link}</p>
                </div>
                <div>
                    <p>By {contact}</p>
                </div>
            </div> 
            <div className="contribution-thumbnail">
            <div>
                    <h6>{title}</h6>
                </div>
                <div>
                    <p>{shortDescription}</p>
                </div>
                <div>
                    <p>By {contact}</p>
                </div>
            </div>

        </div>
    )

    return(
        <Layout>
            {(ActiveDisplay === "DISPLAY") ? displayContributions() : createContribution()}
        </Layout>
        
    )
}

export default Create;
