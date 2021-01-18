import React from 'react';

function Contributor(props) {
    return <div className="contributor">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.link}</p>
        <p>{props.contact}</p>
        <div onClick={props.handleEditClick}>
            <i class="fas fa-edit"></i>
        </div>
    </div>
}

export default Contributor;