import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signOut } from '../auth/helpers';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if(match.path === path) {
            return {color: '#000'};
        } else {
            return {color: '#fff'};
        }
    };

    const nav = () => (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to="/" className="nav-link" style={isActive("/")}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/explore" className="nav-link" style={isActive("/explore")}>
                        Explore
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/get-started" className="nav-link" style={isActive("/get-started")}>
                        Get Started
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link" style={isActive("/about")}>
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/pricing" className="nav-link" style={isActive("/pricing")}>
                        Pricing
                    </Link>
                </li>
                { !isAuth() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
                                Sign in
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
                                Sign Up
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuth() && isAuth().role === 'admin' && (
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link" style={isActive("/admin")}>
                            Admin
                        </Link>
                    </li>
                )}

                {isAuth() && isAuth().role === 'subscriber' && (
                    <li className="nav-item">
                        <Link to="/private" className="nav-link" style={isActive("/private")}>
                            {isAuth().name}
                        </Link>
                    </li>
                )}

                {isAuth() && (
                    <li className="nav-item">
                        <span 
                            className="nav-link" 
                            style={{cursor: "pointer", color: "#fff"}} 
                            onClick={() => {
                            signOut(() => {
                                history.push('/');
                            })
                        }}>
                            Sign Out
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );

    return (
        <Fragment>
            <Header />
            { nav() }
            <div className="container">
                {children}
            </div>
            <Footer />
        </Fragment>
    );
};

export default withRouter(Layout);