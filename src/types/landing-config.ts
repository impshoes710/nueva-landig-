export interface LandingColorOption {
  name: string;
  image: string;
}

export interface LandingPackage {
  label: string;
  subtitle: string;
  comparePrice: string;
  price: string;
  quantity: number;
  percent: string;
}

export interface LandingTiktokVideo {
  url: string;
  views: string;
  poster?: string;
}

export interface LandingTrustItem {
  title: string;
  video: string;
  heading: string;
  text: string;
}

export interface LandingFaqItem {
  q: string;
  a: string;
}

export interface LandingRelatedProduct {
  title: string;
  price: number;
  compareAtPrice: number;
  image: string;
  url: string;
}

export interface LandingConfig {
  meta: {
    title: string;
    description: string;
  };
  theme: {
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
  };
  product: {
    name: string;
    colorLabel: string;
    discountBadge: string;
    features: string[];
    gallery: string[];
    sizes: string[];
    colorOptions: LandingColorOption[];
  };
  promotion: {
    urgencyText: string;
    countdownHours: number;
    showCountdown: boolean;
  };
  packages: LandingPackage[];
  tiktok: {
    title: string;
    videos: LandingTiktokVideo[];
    caption: string;
  };
  social: {
    brand: string;
    posts: string;
    followers: string;
    following: string;
    message: string;
  };
  trust: LandingTrustItem[];
  benefits: { title: string; text: string }[];
  testimonials: {
    title: string;
    images: string[];
  };
  faq: {
    title: string;
    items: LandingFaqItem[];
    whatsapp: string;
    whatsappUrl: string;
  };
  related: {
    title: string;
    products: LandingRelatedProduct[];
    catalogUrl: string;
    catalogLabel: string;
  };
  footer: {
    termsUrl: string;
    privacyUrl: string;
    credit: string;
  };
}
