import React from 'react';

function Contributor(props) {
    return <div className="contributor">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.link}</p>
        <p>{props.contact}</p>
        <div>
            <span onClick={props.handleEditClick}>
            {(props.editable) ? <i className="fas fa-edit m-2"></i> : null}
            </span>
            <span onClick={props.handleDeleteClick}>
            {(props.editable) ? <i className="fas fa-trash-alt m-2"></i> : null}
            </span>
        </div>
    </div>
}

export default Contributor;