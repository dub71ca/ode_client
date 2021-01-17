  
import React from 'react';
import Layout from './core/Layout';

const App = () => {
    return (
        <Layout>
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">We can all do well!</h1>
                <h2>One Dollar Economy</h2>
                <hr />
                <p className="lead">
                    The One Dollar Economy is a future where individually we create, currate and deliver the best art, entertainment and content for just a dollar. 
                    <a href="/get-started"> Get started</a> for just as little dollar per year.
                </p>
            </div>
        </Layout>
    );
};

export default App;