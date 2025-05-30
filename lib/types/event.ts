export interface ImageAsset {
    url: string;
    alt: string;
  }
  
  export interface GalleryImageItem extends ImageAsset {
    id: string; // For key prop in React
  }
  
  export interface Tag {
    id: string;
    name: string;
  }
  
  export interface Host {
    id: string;
    name: string;
    avatar: ImageAsset;
    title?: string;
    bio?: string;
    experience?: string;
    eventsHosted?: number;
    responseTime?: string;
    languages?: string[];
    verified: boolean;
  }
  
  export interface Venue {
    id: string;
    name: string;
    address: string; // Full street address e.g., "Noida Sec-62"
    city: string;
    state: string;
    zipCode: string;
    mapUrl?: string;
    directions?: string;
    accessibility: string[]; // Array of accessibility features
    amenities?: string[];
    isVerified?: boolean;
  }
  
  export interface Review {
    id: string;
    name: string;
    profession?: string;
    avatar?: ImageAsset;
    rating: number; // e.g., 4.5
    date: string; // e.g., "June 2, 2024" or ISO string "2024-06-02"
    comment: string;
    verified?: boolean;
  }
  
  export interface UpcomingDateSession {
    date: string; // ISO Date string "YYYY-MM-DD"
    startTime: string; // "HH:MM" or "HH:MM AM/PM" e.g., "12:00 PM"
    endTime?: string;
    spotsLeft: number;
    totalSpots?: number;
    status?: "available" | "sold-out" | "cancelled";
  }
  
  export interface PolicyDetails {
    cancellation?: string;
    healthSafety?: string;
    refund?: string;
    privateBooking?: string;
    groupBooking?: string;
    [key: string]: string | undefined; // For any other custom policies
  }
  
  export interface FAQItem {
    id:string;
    question: string;
    answer: string;
  }
  
  export interface RelatedEventInfo {
    id: string;
    slug: string; // For linking
    name: string;
    heroImage: ImageAsset;
    type?: string;
    price?: number; // Assuming this is the base price for the related event card display
    currency?: string;
    isFree?: boolean;
    date?: string; // Next available date for display
    startTime?: string; // Next available time for display
  }
  
  export interface WhatYoullDoItem {
    title: string;
    description: string;
    image?: ImageAsset;
    duration?: string; // e.g., "15 minutes"
  }
  
  export interface Event {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    shortDescription: string;
    type: string;
    category: {
      id: string;
      name: string;
    };
    tags: Array<{
      id: string;
      name: string;
    }>;
    isFeatured: boolean;
    isTrending: boolean;
    status: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: string;
    price: number;
    currency: string;
    isFree: boolean;
    ticketsLeft?: number;
    capacity: number;
    heroImage: {
      url: string;
      alt: string;
    };
    galleryImages: Array<{
      id: string;
      url: string;
      alt: string;
    }>;
    host: {
      id: string;
      name: string;
      avatar: {
        url: string;
        alt: string;
      };
      verified: boolean;
      bio: string;
      title?: string;
      experience?: string;
      eventsHosted?: number;
      responseTime?: string;
      languages?: string[];
    };
    venue: {
      id: string;
      name: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      mapUrl?: string;
      directions?: string;
      accessibility: string[];
      amenities: string[];
      isVerified?: boolean;
    };
    averageRating: number;
    reviewCount: number;
    reviews: Array<{
      id: string;
      name: string;
      profession?: string;
      rating: number;
      date: string;
      comment: string;
      verified?: boolean;
      avatar: {
        url: string;
        alt: string;
      };
    }>;
    skillLevel: string;
    ageRequirement: string;
    highlights: string[];
    whatYoullDo: Array<{
      title: string;
      description: string;
      duration?: string;
      image?: {
        url: string;
        alt: string;
      };
    }>;
    materialsIncluded?: string[];
    foodIncluded?: string[];
    whatToBring?: string[];
    whatToWear?: string[];
    prerequisites?: string;
    policies: {
      cancellation: string;
      healthSafety?: string;
      refund?: string;
      privateBooking?: string;
      groupBooking?: string;
    };
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
    relatedEvents?: Array<{
      id: string;
      slug: string;
      name: string;
      heroImage: {
        url: string;
        alt: string;
      };
      type: string;
      price: number;
      currency: string;
      date?: string;
      startTime?: string;
    }>;
    upcomingDates?: Array<{
      date: string;
      startTime: string;
      spotsLeft: number;
      totalSpots: number;
      status: string;
    }>;
  }