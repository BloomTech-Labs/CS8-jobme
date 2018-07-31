import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from 'react-stripe-elements';
import axios from 'axios';
import { checkout } from '../../actions';

import { StyledBilling } from '../styles/billingStyle';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
// const handleClick = () => {
//   console.log('[click]');
// };
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

// Keep this just in case Signed Juber
// const onClick = () => {
//   let checked = document.querySelector('span.checkmark');
//   if(checked.checked === true) {
//   console.log('clicked')
//   }
// }
// Keep everything above - Signed Juber

const marginTop = {
  marginTop: '20px',
};

const createOptions = (fontSize, padding) => ({
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
});

const prices = {
  100: 999,
  5: 99,
  job: 999,
};

class BillingForm extends Component {
  state = {
    100: false,
    5: false,
    job: false,
  }

    handleSubmit = (ev) => {
      let total = 0;
      // take all items that were selected and put them in variable cart
      const cart = Object.keys(this.state).filter(key => this.state[key] === true);
      // add up total value in cart
      cart.forEach((item) => {
        total += prices[item];
      });
      ev.preventDefault();
      this.props.stripe
        .createToken()
        .then((response) => {
          const source = response.token.id;
          this.props.checkout(source, total, cart);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    handleSelect(option) {
      this.setState({
        [option]: !this.state[option],
      });
    }

    render() {
      return (
        <StyledBilling>
        <p>Billing</p>
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
            <input type="checkbox" onClick={() => this.handleSelect('job')}/>
            <span className="checkmark"></span>
          </label>

          <button type="submit">Pay</button>

        </form>
        </StyledBilling>
      );
    }
}

export default withRouter(injectStripe(BillingForm));
