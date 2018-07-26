import React, { Component } from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { StyledBilling } from '../styles/billingStyle';


class SeekerBilling extends Component {
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
           <SplitForm />
          </Elements>
        </StripeProvider>
      
      );
    }
  }

export default SeekerBilling