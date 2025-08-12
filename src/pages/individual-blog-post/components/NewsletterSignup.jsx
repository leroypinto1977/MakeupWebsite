import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignup(email);
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
        <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-3" />
        <h3 className="font-semibold text-success mb-2">Welcome to Our Community!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for subscribing. Check your email for exclusive beauty tips.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
      <div className="text-center mb-4">
        <Icon name="Mail" size={32} className="text-primary mx-auto mb-3" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Beauty Tips Weekly
        </h3>
        <p className="text-sm text-muted-foreground">
          Get exclusive makeup tutorials, product reviews, and bridal beauty tips delivered to your inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="ArrowRight"
          iconPosition="right"
          className="btn-hover"
        >
          Subscribe Free
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Join 10,000+ beauty enthusiasts. No spam, unsubscribe anytime.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Privacy Protected</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>Weekly Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;