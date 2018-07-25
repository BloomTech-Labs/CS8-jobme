import React from 'react';
import {CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
  injectStripe } from 'react-stripe-elements';
import axios from 'axios';

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

const prices = {
  100: 999,
  5: 99,
  job: 999,
}

class SplitForm extends React.Component {
  state = {
    100: false,
    5: false,
    job: false,
  }
    handleSubmit = (ev) => {
      let total = 0;
      // take all items that were selected and put them in variable cart
      const cart = Object.keys(this.state).filter(key => {
        return this.state[key] === true;
      });
      // add up total value in cart
      cart.forEach(item => {
        total += prices[item];
      });
      ev.preventDefault();
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then(response => {
            const source = response.token.id;
            const token = window.localStorage.getItem('employerToken') || window.localStorage.getItem('seekerToken');
            const requestOptions = { // send with get on protected routes
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            axios.post('/billing', { source, total, cart }, requestOptions)
            .then(response => {
              console.log(response);
            }).catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };

    handleSelect(option) {
      this.setState({
        [option]: !this.state[option],
      });
    }

    render() {
      return (
        <div>
        <div style={billing}>Billing</div>
        <form onSubmit={this.handleSubmit.bind(this)}>
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

          <label className="container">100 Credits - $9.99
              <input type="checkbox" onClick={() => this.handleSelect(100)}/>
              <span className="checkmark"></span>
          </label>

          <label className="container">5 Credits - $0.99
            <input type="checkbox" onClick={() => this.handleSelect(5)}/>
            <span className="checkmark"></span>
          </label>

          <label className="container">Post a Job - $9.99
            <input type="checkbox" onClick={() => this.handleSelect("job")}/>
            <span className="checkmark"></span>
          </label>

          <button type="submit">Pay</button>

        </form>
        </div>
      );
    }
  }

export default injectStripe(SplitForm);