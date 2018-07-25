import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { StyledBilling } from '../styles/billingStyle';



class SeekerBilling extends React.Component {
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