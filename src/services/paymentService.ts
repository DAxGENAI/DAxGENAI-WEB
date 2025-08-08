import { loadStripe, Stripe } from '@stripe/stripe-js';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: {
    id: string;
    name: string;
    amount: number;
    currency: string;
    interval: string;
  };
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  subscription?: Subscription;
}

class PaymentService {
  private stripe: Stripe | null = null;
  private apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (stripePublishableKey) {
      this.stripe = await loadStripe(stripePublishableKey);
    }
  }

  // Create payment intent for course purchase
  async createPaymentIntent(courseId: string, amount: number): Promise<PaymentIntent> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  // Confirm payment
  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<any> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        paymentIntentId,
        {
          payment_method: paymentMethodId,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }

  // Create subscription
  async createSubscription(priceId: string, customerId?: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }

  // Get customer information
  async getCustomer(customerId: string): Promise<Customer> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/customer/${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get customer');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting customer:', error);
      throw new Error('Failed to get customer');
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }

  // Get payment history
  async getPaymentHistory(customerId: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/history/${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get payment history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw new Error('Failed to get payment history');
    }
  }

  // Create checkout session for course purchase
  async createCheckoutSession(courseId: string, successUrl: string, cancelUrl: string): Promise<{ sessionId: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  // Redirect to checkout
  async redirectToCheckout(sessionId: string): Promise<void> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error } = await this.stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  }

  // Get available plans
  async getPlans(): Promise<any[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/plans`);
      
      if (!response.ok) {
        throw new Error('Failed to get plans');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting plans:', error);
      throw new Error('Failed to get plans');
    }
  }

  // Verify payment status
  async verifyPayment(paymentIntentId: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/verify/${paymentIntentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  // Get Stripe instance
  getStripe(): Stripe | null {
    return this.stripe;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
