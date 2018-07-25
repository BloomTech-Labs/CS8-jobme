import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { BillingStyled } from '../styles/billingStyle';



class SeekerBilling extends React.Component {
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