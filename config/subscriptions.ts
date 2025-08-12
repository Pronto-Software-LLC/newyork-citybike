import { SubscriptionPlan } from '@/types';

export const monthlyPlan: SubscriptionPlan = {
  name: 'Monthly',
  description: `Monthly plan consts $${process.env.STRIPE_MONTHLY_PLAN_PRICE}/month.`,
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || '',
};

export const proPlan: SubscriptionPlan = {
  name: 'Yearly',
  description: `Yearly plan costs $${process.env.STRIPE_YEARLY_PLAN_PRICE}/year.`,
  stripePriceId: process.env.STRIPE_PRO_YEARLY_PLAN_ID || '',
};
