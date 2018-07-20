import React from 'react';
import SplitForm  from './SplitForm'; 
import {StripeProvider} from 'react-stripe-elements';
import { Elements } from  'react-stripe-elements';
import './billing.css';

class EmployerBilling extends React.Component {
    // constructor() {
    //   super();
    //   this.state = {
    //     elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    //   };
    //   window.addEventListener('resize', () => {
    //     if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
    //       this.setState({elementFontSize: '14px'});
    //     } else if (
    //       window.innerWidth >= 450 &&
    //       this.state.elementFontSize !== '18px'
    //     ) {
    //       this.setState({elementFontSize: '18px'});
    //     }
    //   });
    // }
  
    render() {
     // const {elementFontSize} = this.state;
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