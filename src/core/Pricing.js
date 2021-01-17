import React from 'react';
import pricingDataAll from '../tempData';
import PricingCardContainer from '../components/PricingCardContainer';
import Layout from './Layout';

function Pricing() {

    return(
        <Layout>
            <div className="App">
                <PricingCardContainer pricingDataAll={pricingDataAll}></PricingCardContainer>
            </div>
        </Layout>
    )
}

export default Pricing;