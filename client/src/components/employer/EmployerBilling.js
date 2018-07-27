import React, { Component } from 'react';
import BillingForm  from './BillingForm'; 

import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
const stripePublic = process.env.REACT_APP_STRIPE_PUBLIC;


class EmployerBilling extends Component {
  state = { stripe: null };
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
           <BillingForm />
          </Elements>
        </StripeProvider>
      );
    }
  }

export default EmployerBilling