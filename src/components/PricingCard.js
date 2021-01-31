import React from 'react';

function PricingCard(props) {

    const price = props.pricingData.price.toString().split('.'),
            dollar = price[0]

      let	cent = price[1] || "00";

  return (
    <div className={"pricingCard " + (props.featured ? 'featured' : '')}>

        <div className="title">
            {props.pricingData.title}
        </div>

         <div className="card">

             <h2 className="price">
                 <span className="price__currency">$</span>
                 <span className="price__dollar">{dollar}</span>.
                 <span className="price__cent">{cent}</span>
             </h2>

             <p className="price-desc">{props.generic.priceDesc}</p>

              <p className="price-overview">{props.pricingData.priceOverview}</p>

              <p className="description">{props.common.description}</p>

         </div>
        <a className={'bttn bttn-' + props.btnClass} href={props.pricingData.billingCode}>{props.generic.ctaText}</a>
    </div>
  );
}

export default PricingCard;