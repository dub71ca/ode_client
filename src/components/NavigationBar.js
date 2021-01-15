import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavigationBar() {

    return( 
        <div className="header-nav">
        <Navbar className="color-nav">
            <Nav className="mr-auto">
                <Nav.Link><NavLink to="/home">Home</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/explore">Explore</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/getStarted">Get Started</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/pricing">Pricing</NavLink></Nav.Link>
                <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
            </Nav>
        </Navbar>
        </div>
    );
}

export default NavigationBar;