import React from 'react';

const dateObj = new Date();
const currentYear = dateObj.getFullYear();

function Footer() {
    return <div>
        <footer>
            <p>One Dollar Economy Copyright © {currentYear}</p>
        </footer>
    </div>
}

export default Footer;