import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const galleryRef = useRef(null);
  const lightboxRef = useRef(null);

  const portfolioImages = [
    {
      id: 1,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "bridal",
      title: "Classic Bridal Look",
      description: "Timeless elegance with soft glam makeup"
    },
    {
      id: 2,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1583900985737-6d0495555783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "glam",
      title: "Glamorous Evening Look",
      description: "Bold and dramatic makeup for special occasions"
    },
    {
      id: 3,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "natural",
      title: "Natural Bridal Glow",
      description: "Soft and natural makeup enhancing natural beauty"
    },
    {
      id: 4,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "bridal",
      title: "Vintage Bridal Style",
      description: "Classic vintage-inspired bridal makeup"
    },
    {
      id: 5,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1583900985737-6d0495555783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "glam",
      title: "Red Carpet Glam",
      description: "High-fashion makeup for glamorous events"
    },
    {
      id: 6,
      before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      after: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "natural",
      title: "Everyday Elegance",
      description: "Polished natural look for everyday wear"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Looks', count: portfolioImages?.length },
    { id: 'bridal', label: 'Bridal', count: portfolioImages?.filter(img => img?.category === 'bridal')?.length },
    { id: 'glam', label: 'Glamorous', count: portfolioImages?.filter(img => img?.category === 'glam')?.length },
    { id: 'natural', label: 'Natural', count: portfolioImages?.filter(img => img?.category === 'natural')?.length }
  ];

  const filteredImages = activeFilter === 'all' 
    ? portfolioImages 
    : portfolioImages?.filter(img => img?.category === activeFilter);

  useEffect(() => {
    const gallery = galleryRef?.current;
    if (!gallery) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    
    if (!prefersReducedMotion) {
      const items = gallery?.querySelectorAll('.gallery-item');
      gsap?.fromTo(items, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [filteredImages]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        closeLightbox();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth focus-ring ${
              activeFilter === filter?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-foreground hover:bg-primary/10'
            }`}
          >
            {filter?.label} ({filter?.count})
          </button>
        ))}
      </div>
      {/* Gallery Grid */}
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages?.map((image) => (
          <div
            key={image?.id}
            className="gallery-item group cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg transition-smooth hover:shadow-xl">
              {/* Before/After Images */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative overflow-hidden">
                    <Image
                      src={image?.before}
                      alt={`Before - ${image?.title}`}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-foreground/80 text-background px-2 py-1 rounded text-xs font-medium">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={image?.after}
                      alt={`After - ${image?.title}`}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      After
                    </div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-smooth flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="bg-background/95 backdrop-blur-sm rounded-full p-3">
                      <Icon name="ZoomIn" size={20} className="text-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {image?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {image?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />
          
          <div ref={lightboxRef} className="relative bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {selectedImage?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedImage?.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                iconName="X"
                className="flex-shrink-0"
              />
            </div>

            {/* Before/After Comparison */}
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Before</h4>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage?.before}
                      alt={`Before - ${selectedImage?.title}`}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">After</h4>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage?.after}
                      alt={`After - ${selectedImage?.title}`}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;