import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import GradientHeading from "../../../components/ui/GradientHeading";
import { fetchFeaturedTransformations } from "../../../lib/sanity";

gsap?.registerPlugin(ScrollTrigger);

const BeforeAfterGallery = () => {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transformations from Sanity
  useEffect(() => {
    const loadTransformations = async () => {
      try {
        console.log('🔄 Loading transformations from Sanity...');
        setLoading(true);
        const data = await fetchFeaturedTransformations();
        console.log('📊 Raw transformation data:', data);
        console.log('📊 Number of transformations found:', data.length);
        console.log('📊 Individual transformation details:', JSON.stringify(data, null, 2));
        
        if (data && data.length > 0) {
          console.log('✅ Using Sanity transformations');
          setTransformations(data);
        } else {
          console.log('⚠️ No transformations found, using fallback data');
          console.log('⚠️ Data is:', data);
          // Fallback to static data if needed
          setTransformations([
          {
            _id: 'fallback-1',
            title: "Classic Bridal Look",
            description: "Natural enhancement with timeless elegance",
            category: "Bridal",
            beforeImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            },
            afterImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            }
          },
          {
            _id: 'fallback-2',
            title: "Glamorous Evening",
            description: "Bold and sophisticated party makeup",
            category: "Party",
            beforeImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            },
            afterImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            }
          }
        ]);
        }
      } catch (error) {
        console.error('❌ Error fetching transformations:', error);
        setTransformations([
          {
            _id: 'error-fallback-1',
            title: "Classic Bridal Look",
            description: "Natural enhancement with timeless elegance",
            category: "Bridal",
            beforeImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            },
            afterImage: {
              asset: {
                url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTransformations();
  }, []);

  useEffect(() => {
    const ctx = gsap?.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      )?.matches;

      if (!prefersReducedMotion) {
        ScrollTrigger?.create({
          trigger: sectionRef?.current,
          start: "top 80%",
          onEnter: () => {
            gsap?.fromTo(
              sectionRef?.current?.querySelectorAll(".gallery-item"),
              { opacity: 0, scale: 0.9 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
              }
            );
          },
        });
      }
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  const openLightbox = (transformation) => {
    setSelectedImage(transformation);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleKeyDown = (e) => {
    if (e?.key === "Escape") {
      closeLightbox();
    }
  };

  useEffect(() => {
    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isLightboxOpen]);

  return (
    <>
      <section ref={sectionRef} className="py-16 lg:py-24 bg-background">
        <div className="container-padding">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <GradientHeading
              align="center"
              normal="Transformation"
              highlight="Gallery"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              See the magic of professional makeup artistry through our before
              and after showcase
            </p>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Loading transformations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {transformations?.map((transformation) => (
                <div
                  key={transformation?._id}
                  className="gallery-item group cursor-pointer"
                  onClick={() => openLightbox(transformation)}
                >
                  <div className="bg-card rounded-lg overflow-hidden card-elevation hover:shadow-lg transition-smooth">
                    {/* Before/After Images */}
                    <div className="relative h-80 overflow-hidden">
                      <div className="flex h-full">
                        {/* Before */}
                        <div className="w-1/2 relative">
                          <Image
                            src={transformation?.beforeImage?.asset?.url}
                            alt={`Before makeup transformation - ${transformation?.title}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <div className="bg-foreground/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                              <span className="text-xs font-caption font-medium">
                                Before
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-border relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
                              <Icon
                                name="ArrowRight"
                                size={16}
                                color="var(--color-primary-foreground)"
                              />
                            </div>
                          </div>
                        </div>

                        {/* After */}
                        <div className="w-1/2 relative">
                          <Image
                            src={transformation?.afterImage?.asset?.url}
                            alt={`After makeup transformation - ${transformation?.title}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full">
                              <span className="text-xs font-caption font-medium">
                                After
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm rounded-full p-3">
                          <Icon
                            name="ZoomIn"
                            size={24}
                            className="text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {transformation?.title}
                        </h3>
                        <div className="bg-accent px-2 py-1 rounded-full">
                          <span className="text-xs font-caption text-accent-foreground">
                            {transformation?.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-body text-sm">
                        {transformation?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More CTA */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              iconName="Images"
              iconPosition="left"
              className="btn-hover"
            >
              View Full Portfolio
            </Button>
          </div>
        </div>
      </section>
      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-200 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-background rounded-lg overflow-hidden animate-scale-in"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-foreground/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-foreground transition-smooth focus-ring"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Lightbox Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Before Image */}
              <div className="lg:w-1/2 relative">
                <Image
                  src={selectedImage?.beforeImage?.asset?.url}
                  alt={`Before makeup transformation - ${selectedImage?.title}`}
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-foreground/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-caption font-medium">
                      Before
                    </span>
                  </div>
                </div>
              </div>

              {/* After Image */}
              <div className="lg:w-1/2 relative">
                <Image
                  src={selectedImage?.afterImage?.asset?.url}
                  alt={`After makeup transformation - ${selectedImage?.title}`}
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full">
                    <span className="text-sm font-caption font-medium">
                      After
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lightbox Info */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                    {selectedImage?.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {selectedImage?.description}
                  </p>
                </div>
                <div className="bg-accent px-3 py-1 rounded-full">
                  <span className="text-sm font-caption text-accent-foreground">
                    {selectedImage?.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeforeAfterGallery;
