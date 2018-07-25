
import React from 'react';
import React, { Component } from 'react';
import BillingForm  from './BillingForm'; 

import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { stripePublic } from '../../constants/config';
import { StyledBilling } from '../styles/billingStyle';


class EmployerBilling extends Component {
  state = { stripe: null };
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <StyledBilling>
           <BillingForm />
            </StyledBilling>
          </Elements>
        </StripeProvider>
      );
    }
  }

export default EmployerBilling