import React, { useEffect, useRef, useState } from 'react';

function PayPalSubscription() {

    const paypalRef = useRef();

    useEffect(() => {
        window.paypal.Buttons({
            style: {
                shape: 'pill',
                color: 'gold',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                'plan_id': 'P-4PX85426710961138MAQZ4GA'
                });
            },
            onApprove: function(data, actions) {
                alert(data.subscriptionID);
            }
        }).render(paypalRef.current);
    
    }, []);

    return <div ref={paypalRef}></div>;

}

export default PayPalSubscription;