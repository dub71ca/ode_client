  
import React from 'react';
import Layout from './core/Layout';
import { isAuth } from './auth/helpers';

const App = () => {
    return (
        <Layout>
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">We can all do well!</h1>
                <h2>One Dollar Economy</h2>
                <hr />
                <p className="lead">
                    The One Dollar Economy is a future where individually we create, currate and deliver the best art, entertainment and content for just a dollar. 
                    {(isAuth()) ? <a href="/get-started"> Get started </a> : <span> <a href="/signup"> Sign Up</a> or <a href="/signin"> Sign In </a> to get started </span>}
                        for as little dollar per year.
                </p>
            </div>
        </Layout>
    );
};

export default App;