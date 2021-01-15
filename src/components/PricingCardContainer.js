import React, { useState } from 'react';
import PricingCard from '../components/PricingCard';

function PricingCardContainer(props) {

    const [isPromo, setIsPromo] = useState(false);
    
    function togglePromo() {
        setIsPromo(!isPromo);
    }
      let pricingDataCurrent = props.pricingDataAll.regular
      let common = props.pricingDataAll.common
    
      isPromo ? pricingDataCurrent = props.pricingDataAll.promo : pricingDataCurrent = props.pricingDataAll.regular
    
    
      const generic = props.pricingDataAll.generic,
            one = pricingDataCurrent.one,
            two = pricingDataCurrent.two,
            three = pricingDataCurrent.three
    
    return <section>
        <div className="toggle-container">
          Pay the processing fees so that the contributor gets the whole dollar <input type="checkbox" onChange={togglePromo}></input>
        </div>
        <div className="container">

            <PricingCard
            pricingData={one}
            common={common.one}
            generic={generic}
            >
            </PricingCard>

            <PricingCard
            pricingData={two}
            common={common.two}
            generic={generic}
            featured
            >
            </PricingCard>

            <PricingCard
            pricingData={three}
            common={common.three}
            generic={generic}
            >
            </PricingCard>

        </div>
        </section>
}

export default PricingCardContainer;

    