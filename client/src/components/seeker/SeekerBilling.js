import React, { Component } from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { BillingStyled } from '../styles/billingStyle';
import { stripePublic } from '../../constants/config';
import './billing.css';


class SeekerBilling extends Component {
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <BillingStyled>
           <SplitForm />
            </BillingStyled>
          </Elements>
        </StripeProvider>
      
      );
    }
  }

export default SeekerBilling