import React from 'react';
import BillingForm  from './BillingForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { stripePublic } from process.env.stripePublic || '../../constants/config';
import './billing.css';

class EmployerBilling extends React.Component {
  state = { stripe: null };
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <div className="Checkout">
           <BillingForm />
            </div>
          </Elements>
        </StripeProvider>
      );
    }
  }

export default EmployerBilling