const pricingDataAll = {

    generic: {
      priceDesc: "We charge what you charge",
      ctaText: "Create a Contributor Account",
      description: "If you charge your clients by the month we charge you by the month."
    },

    common: {
      one: {
        description: "If you charge your clients by the month we charge you by the month."
      },
      two: {
        description: "Recommended option. If you charge your clients yearly we charge you yearly."
      },
      three: {
        description: "Custom, contact us and we can discuss the options. The idea is we charge you what you charge a single client."
      }
    },

    regular: {

      generic: {
        priceOverview: "Standard Version"
      },

      one: {
        title: "Per Month",
        price: 1.00,
        billingCode: "monthly/regular",
        priceOverview: "Monthly Billing",
      },
      two: {
        title: "Per Year",
        price: 1.00,
        billingCode: "annual/regular",
        priceOverview: "Annual Billing",
      },
      three: {
        title: "Custom",
        price: 1.00,
        billingCode: "custom/regular",
        priceOverview: "Custom Billing",
      }
    },

    promo: {

        generic: {
          priceOverview: ""
        },
        one: {
          title: "Per Month",
          price: 1.45,
          billingCode: "monthly/extra",
          priceOverview: "Pay ODE's processing fees",
        },
        two: {
          title: "Per Year",
          price: 1.45,
          billingCode: "annual/extra",
          priceOverview: "Pay ODE's processing fees",
        },
        three: {
          title: "Custom",
          price: 1.45,
          billingCode: "custom/extra",
          priceOverview: "Pay ODE's processing fees",
        }
      }
  

  }

export default pricingDataAll;