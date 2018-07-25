import React from 'react';

import BillingForm  from './BillingForm'; 

import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { stripePublic } from '../../constants/config';
import { BillingStyled } from '../styles/billingStyle';


class EmployerBilling extends React.Component {
  state = { stripe: null };
    render() {
      return (
        <StripeProvider apiKey={ stripePublic }>
          <Elements>
          <BillingStyled>
           <BillingForm />
            </BillingStyled>
          </Elements>
        </StripeProvider>
      );
    }
  }

export default EmployerBilling