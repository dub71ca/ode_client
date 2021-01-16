  
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
                    The One Dollar Economy is a future where individually we create, currate and
                    deliver the best solutions for just a dollar. No billion dollar companies, but
                    instead an army of individuals creating what we need for each other and we reap
                    the benfits. Everyone of us is passionate about something, document it and others
                    will watch it. If you have a cell phone and a desire to share it with the wold 
                    you can get started for just a dollar a year.
                </p>
            </div>
        </Layout>
    );
};

export default App;