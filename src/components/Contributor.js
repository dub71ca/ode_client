import React from 'react';

function Contributor(props) {
    return <div className="contributor">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.link}</p>
        <p>{props.contact}</p>
    </div>
}

export default Contributor;