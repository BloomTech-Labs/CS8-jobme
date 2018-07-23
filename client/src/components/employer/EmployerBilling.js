import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import './billing.css';

class EmployerBilling extends React.Component {
    render() {
      return (
        <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
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