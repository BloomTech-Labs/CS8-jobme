import React, { Component } from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
<<<<<<< HEAD
import { StyledBilling } from '../styles/billingStyle';
=======
import { BillingStyled } from '../styles/billingStyle';
import { stripePublic } from '../../constants/config';
import './billing.css';
>>>>>>> f362727073724ea5637f41fb28c2f09d482ab726


class SeekerBilling extends Component {
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <StyledBilling>
           <SplitForm />
            </StyledBilling>
          </Elements>
        </StripeProvider>
      
      );
    }
  }

export default SeekerBilling