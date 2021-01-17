import React, { useState } from 'react';
import { Form, FormControl, Button } from "react-bootstrap";

// import { NavLink } from "react-router-dom";
// import NavigationBar from "./NavigationBar";
import logo from '../Images/one-dollar-econ-V1.png';

function Header() {

    const [searchText, setSearchText] = useState("");

    function handleSearchInput(event) {
        setSearchText(event.target.value);
        console.log(searchText);
    }
    
    function handleSearchSubmit() {
        console.log("searching for: " + searchText);
        setSearchText("");
    }
    
    return <div>
        <header>

            <img src={logo} alt="One Dollar Economy" width="150" height="150"></img>
            
            <div className="search-control">

            <Form inline>
                <FormControl
                    onChange={handleSearchInput}
                    value={searchText}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                />
                <Button onClick={handleSearchSubmit} variant="outline-info">
                    Search
                </Button>
            </Form>
            </div>

        </header>

    </div>
}

export default Header;