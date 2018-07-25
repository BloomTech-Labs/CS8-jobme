import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { stripePublic } from '../../constants/config';
import './billing.css';

class SeekerBilling extends React.Component {
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <div className="Checkout">
           <SplitForm />
            </div>
          </Elements>
        </StripeProvider>
      
      );
    }
  }

export default SeekerBilling