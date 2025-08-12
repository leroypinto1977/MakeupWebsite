import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError('');
  };

  if (isSubscribed) {
    return (
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={24} color="var(--color-primary-foreground)" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Welcome to Our Beauty Community!
            </h3>
            <p className="text-muted-foreground font-body">
              Thank you for subscribing! You'll receive exclusive beauty tips, special offers, and the latest updates from Bella Bridal Studio.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container-padding">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={20} color="var(--color-primary-foreground)" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
              Stay Beautiful, Stay Informed
            </h3>
            <p className="text-muted-foreground font-body">
              Get exclusive beauty tips, seasonal makeup trends, and special offers delivered to your inbox
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  error={error}
                  disabled={isLoading}
                  className="text-center sm:text-left"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                iconName="ArrowRight"
                iconPosition="right"
                className="btn-hover whitespace-nowrap"
                disabled={isLoading}
              >
                Subscribe
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="font-caption">Beauty Tips</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Tag" size={16} className="text-primary" />
              <span className="font-caption">Exclusive Offers</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="font-caption">Event Updates</span>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="mt-6 text-xs text-muted-foreground font-caption">
            We respect your privacy. Unsubscribe at any time. No spam, just beauty.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;