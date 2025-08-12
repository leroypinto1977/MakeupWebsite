import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import GradientHeading from "../../../components/ui/GradientHeading";

const ArticleContent = ({ content, onNewsletterSignup }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      onNewsletterSignup(email);
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const BeforeAfterSlider = ({ beforeImage, afterImage, title }) => {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
      <div className="my-8 bg-card rounded-lg p-6 card-elevation">
        <h3 className="text-lg font-heading font-semibold mb-4 text-center">
          {title}
        </h3>
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] max-w-2xl mx-auto">
          <Image
            src={afterImage}
            alt="After transformation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={beforeImage}
              alt="Before transformation"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              const rect =
                e?.currentTarget?.parentElement?.getBoundingClientRect();
              const handleMouseMove = (e) => {
                const x = e?.clientX - rect?.left;
                const percentage = Math.max(
                  0,
                  Math.min(100, (x / rect?.width) * 100)
                );
                setSliderPosition(percentage);
              };
              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };
              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Icon name="Move" size={16} className="text-muted-foreground" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
            Before
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
            After
          </div>
        </div>
      </div>
    );
  };

  const TutorialStep = ({ stepNumber, title, description, image, tips }) => (
    <div className="my-8 bg-card rounded-lg p-6 card-elevation">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
          {stepNumber}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          {image && (
            <div className="mb-4">
              <Image
                src={image}
                alt={`Step ${stepNumber}: ${title}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          {tips && tips?.length > 0 && (
            <div className="bg-accent rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center">
                <Icon
                  name="Lightbulb"
                  size={16}
                  className="mr-2 text-warning"
                />
                Pro Tips:
              </h4>
              <ul className="space-y-1">
                {tips?.map((tip, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start"
                  >
                    <Icon
                      name="Check"
                      size={14}
                      className="mr-2 mt-0.5 text-success flex-shrink-0"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ProductRecommendation = ({ product }) => (
    <div className="my-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
      <div className="flex items-center mb-3">
        <Icon name="Star" size={16} className="text-primary mr-2" />
        <span className="text-sm font-medium text-primary">
          Recommended Product
        </span>
      </div>
      <div className="flex items-start space-x-4">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">
            {product?.name}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {product?.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">
              ${product?.price}
            </span>
            <Button variant="outline" size="sm" className="btn-hover">
              View Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Featured Image */}
      <div className="mb-8">
        <Image
          src={content?.featuredImage}
          alt={content?.title}
          className="w-full h-64 lg:h-96 object-cover rounded-lg"
        />
      </div>
      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {/* Introduction */}
        <div id="introduction" className="mb-8 scroll-mt-28">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content?.introduction}
          </p>
        </div>

        {/* Main Content Sections */}
        {content?.sections?.map((section, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="mb-8 scroll-mt-28"
          >
            <GradientHeading
              level={2}
              normal={section?.heading?.split(" ")?.slice(0, -1)?.join(" ")}
              highlight={section?.heading?.split(" ")?.slice(-1)?.join(" ")}
              className="mb-4"
            />
            <div className="space-y-4">
              {section?.paragraphs?.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Interactive Components */}
            {section?.beforeAfter && (
              <BeforeAfterSlider
                beforeImage={section?.beforeAfter?.before}
                afterImage={section?.beforeAfter?.after}
                title={section?.beforeAfter?.title}
              />
            )}

            {section?.tutorialStep && (
              <TutorialStep
                stepNumber={section?.tutorialStep?.number}
                title={section?.tutorialStep?.title}
                description={section?.tutorialStep?.description}
                image={section?.tutorialStep?.image}
                tips={section?.tutorialStep?.tips}
              />
            )}

            {section?.productRecommendation && (
              <ProductRecommendation product={section?.productRecommendation} />
            )}

            {/* Mid-Article Newsletter Signup */}
            {index === Math.floor(content?.sections?.length / 2) &&
              !isSubscribed && (
                <div className="my-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center border border-primary/20">
                  <div className="max-w-md mx-auto">
                    <Icon
                      name="Mail"
                      size={32}
                      className="text-primary mx-auto mb-4"
                    />
                    <GradientHeading
                      level={3}
                      normal="Get Beauty"
                      highlight="Tips"
                      after="Weekly"
                      className="mb-2"
                    />
                    <p className="text-muted-foreground mb-6">
                      Join 10,000+ brides getting exclusive makeup tips and
                      tutorials delivered to their inbox.
                    </p>
                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="space-y-4"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        required
                      />
                      <Button
                        type="submit"
                        variant="default"
                        fullWidth
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="btn-hover"
                      >
                        Subscribe Now
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-3">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              )}
          </div>
        ))}

        {/* Success Message for Newsletter */}
        {isSubscribed && (
          <div className="my-8 bg-success/10 border border-success/20 rounded-lg p-6 text-center">
            <Icon
              name="CheckCircle"
              size={32}
              className="text-success mx-auto mb-3"
            />
            <h3 className="font-semibold text-success mb-2">
              Successfully Subscribed!
            </h3>
            <p className="text-sm text-muted-foreground">
              Thank you for subscribing. Check your email for a welcome message.
            </p>
          </div>
        )}

        {/* Conclusion */}
        <div
          id="conclusion"
          className="mt-12 pt-8 border-t border-border scroll-mt-28"
        >
          <GradientHeading
            level={2}
            normal="Final"
            highlight="Thoughts"
            className="mb-4"
          />
          <p className="text-foreground leading-relaxed mb-6">
            {content?.conclusion}
          </p>

          {/* Call to Action */}
          <div className="bg-card rounded-lg p-6 card-elevation text-center">
            <GradientHeading
              level={3}
              normal="Ready for Your"
              highlight="Dream"
              after="Bridal Look?"
              className="mb-2"
            />
            <p className="text-muted-foreground mb-4">
              Book a consultation with our expert makeup artists and bring your
              vision to life.
            </p>
            <Button
              variant="default"
              iconName="Calendar"
              iconPosition="left"
              className="btn-hover"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
