const stripePublic = process.env.REACT_APP_STRIPE_PUBLIC;

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : stripePublic;

export default STRIPE_PUBLISHABLE;
