import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import { stripePublic } from '../../constants/config';
import './billing.css';

class EmployerBilling extends React.Component {
  state = {stripe: null};
  componentDidMount() {
    document.querySelector('#stripe-js').addEventListener('load', () => {
      // Create Stripe instance once Stripe.js loads
      this.setState({stripe: window.Stripe('pk_test_12345')});
    });
  }
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

export default EmployerBilling