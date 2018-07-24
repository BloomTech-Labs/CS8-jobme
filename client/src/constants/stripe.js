import { stripePublic } from './config';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : stripePublic;

export default STRIPE_PUBLISHABLE;
