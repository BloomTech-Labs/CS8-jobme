import React from 'react';
import {CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    injectStripe } from 'react-stripe-elements';

import './billing.css';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const onClick = () => {
  let checked = document.querySelector('span.checkmark');
  if(checked.checked === true) {
  console.log('clicked') 
  } 
}

const marginTop = {
  marginTop: '20px',
}

const billing = {
  color: '#6b7c93',
  fontWeight: '400',
  fontSize: '24px',
  letterSpacing: '0.050em',
  marginTop: '30px',
  textDecoration: 'underline',
}

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class BillingForm extends React.Component {
    handleSubmit = (ev) => {
      ev.preventDefault();
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then((payload) => console.log('[token]', payload));
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };

   

    render() {
      return (
        <div>
        <div style={billing}>Billing</div>
        <form onSubmit={this.handleSubmit}>
          <label style={marginTop}>
            Card number
            <CardNumberElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <label>
            CVC
            <CardCVCElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <label>
            Postal code
            <PostalCodeElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </label>

          <label class="container">100 Credits - $9.99
              <input type="checkbox"/>
              <span class="checkmark"></span>
          </label>

          <label class="container">5 Credits - $0.99
            <input type="checkbox"/>
            <span class="checkmark"></span>
          </label>

          <label class="container" onClick={onClick}>Post a Job - $9.99
            <input type="checkbox"/>
            <span class="checkmark"></span>
          </label>

          <button>Pay</button>

        </form>
        </div>
      );
    }
  }

export default BillingForm;