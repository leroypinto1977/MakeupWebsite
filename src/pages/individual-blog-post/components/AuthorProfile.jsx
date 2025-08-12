import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorProfile = ({ author }) => {
  const socialLinks = [
    { platform: 'Instagram', icon: 'Instagram', url: author?.social?.instagram, color: '#E4405F' },
    { platform: 'Facebook', icon: 'Facebook', url: author?.social?.facebook, color: '#1877F2' },
    { platform: 'YouTube', icon: 'Youtube', url: author?.social?.youtube, color: '#FF0000' },
    { platform: 'Website', icon: 'Globe', url: author?.website, color: '#6B645E' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 card-elevation">
      <div className="flex items-center mb-4">
        <Icon name="User" size={20} className="text-primary mr-2" />
        <h3 className="font-heading font-semibold text-foreground">About the Author</h3>
      </div>
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={author?.avatar}
            alt={author?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{author?.name}</h4>
          <p className="text-sm text-primary font-medium mb-2">{author?.title}</p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{author?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Joined {author?.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {author?.bio}
      </p>
      {/* Author Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-accent rounded-lg">
        <div className="text-center">
          <div className="font-semibold text-foreground">{author?.stats?.articles}</div>
          <div className="text-xs text-muted-foreground">Articles</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground">{author?.stats?.followers}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground">{author?.stats?.experience}</div>
          <div className="text-xs text-muted-foreground">Years Exp</div>
        </div>
      </div>
      {/* Specialties */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-foreground mb-2">Specialties:</h5>
        <div className="flex flex-wrap gap-2">
          {author?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
      {/* Social Links */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-foreground">Connect:</h5>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks?.map((social) => (
            <Button
              key={social?.platform}
              variant="outline"
              size="sm"
              onClick={() => window.open(social?.url, '_blank')}
              iconName={social?.icon}
              iconPosition="left"
              className="btn-hover justify-start"
            >
              {social?.platform}
            </Button>
          ))}
        </div>
      </div>
      {/* Follow Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          className="btn-hover"
        >
          Follow {author?.name?.split(' ')?.[0]}
        </Button>
      </div>
    </div>
  );
};

export default AuthorProfile;