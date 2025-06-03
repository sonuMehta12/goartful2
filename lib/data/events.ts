// lib/data/events.ts
import { Event } from "../types/event"; // Adjust path if your types are elsewhere
import { addDays, format as formatDateFn } from "date-fns";

// Helper function to generate slugs (simple version)
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// Helper to format date for upcomingDates consistently
const getFutureDateString = (daysToAdd: number): string => {
  return formatDateFn(addDays(new Date(), daysToAdd), "yyyy-MM-dd");
};

export const EVENTS_DATA: Event[] = [
  // Event 1: Summer Art Festival (Fully Populated)
  {
    id: "1",
    name: "Paint Your Summer Mood",
    slug: generateSlug("Paint Your Summer Mood"),
    tagline:
      "Transform stress into art, emotions into colors, and strangers into connections",
    description:
      "Step away from your screens, deadlines, and daily pressures. Join Noida's first therapeutic art experience where you'll discover the healing power of mindful painting. This isn't about creating perfect art—it's about creating space for yourself. In our fast-paced professional lives, we rarely pause to check in with our inner world. This 2-hour journey combines art therapy techniques with mindfulness practices, helping you process emotions, reduce stress, and connect authentically with others who understand the modern work-life struggle.",
    shortDescription: "An Evening of Artful Expression & Connection",
    type: "Art Workshop",
    category: { id: "Art Workshop", name: "Art Workshop" },
    tags: [
      { id: "t1", name: "Mindful Painting" },
      { id: "t2", name: "Summer Vibes" },
      { id: "t3", name: "Food" },
      { id: "t4", name: "NOIDAevents" },
      { id: "t6", name: "WorkLifeBalance" },
    ],
    isFeatured: true,
    isTrending: true,
    status: "active",
    date: getFutureDateString(4), // Approx. 1.5 months from now
    startTime: "6:00 PM",
    endTime: "08:00 PM",
    duration: "2 hours / Day (Multi-Day Options)", // Clarified duration
    upcomingDates: [
      // Assuming this festival might run for a weekend
      {
        date: getFutureDateString(3), // Friday
        startTime: "6:00 PM",
        endTime: "09:00 PM",
        spotsLeft: 15, // General admission spots for Friday
        totalSpots: 15,
        status: "available",
      },
      {
        date: getFutureDateString(4), // Saturday
        startTime: "10:00 AM",
        endTime: "10:00 PM",
        spotsLeft: 15,
        totalSpots: 15,
        status: "available",
      },
    ],
    price: 799, // Price per day or for a pass, e.g., ₹799.00
    currency: "INR",
    isFree: false,
    // ticketsLeft: (can be derived from the most relevant upcomingDate.spotsLeft, or be a general "Tickets available")
    capacity: 15, // Max capacity for any given day, for general reference
    ticketsLeft: 15,
    heroImage: {
      url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/Summer_HERO_veqoki.webp",
      alt: "Vibrant outdoor art festival with people browsing stalls",
    },
    galleryImages: [
      {
        id: "g1-2",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/SUmmer-Step2_brwfr0.webp",
        alt: "Live band performing on an outdoor stage at the art festival",
      },
      {
        id: "g1-3",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748941319/myqhrnp1y3dse2axeg0l_mgsoal.png",
        alt: "Children participating in a hands-on art workshop at the festival",
      },

      {
        id: "g1-5",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748969809/WhatsApp_Image_2025-06-03_at_14.57.35_88e14e43_ki3y57.jpg",
        alt: "Attendees works",
      },
      {
        id: "g1-6",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748969809/WhatsApp_Image_2025-06-03_at_14.57.35_b18b86ca_wlkol7.jpg",
        alt: "Attendees works",
      },
      {
        id: "g1-4",
        url: "https://img.traveltriangle.com/blog/wp-content/uploads/2019/09/Restaurants-In-Bikaner.jpg",
        alt: "Artisan food truck serving customers at the festival",
      },
      {
        id: "g1-1",
        url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Close-up of colorful abstract paintings at a festival stall",
      },
    ],
    host: {
      id: "h1",
      name: "Akansha Sharma", // More formal for a festival
      tagline: "Cultivating creativity, connecting communities.",
      avatar: {
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748969461/Akansha_Sharma_aexlhb.jpg", // Replace with an actual foundation logo or generic event icon
        alt: "Akansha Sharma",
      },
      title: "Artist & Associate Dentist",
      bio: "I am Akanksha Sharma , an acrylic and watercolor artist. Creative art has been my go to especially in times when pressed by overwhelming emotions as it provides a healthy medium of expressing oneself . I wish to help others to utilise this meditative experience and thus introduce to them a tool they can access to process their feelings.",
      experience: "1+ years doing art workshops and community events",
      eventsHosted: 2, // Number of significant events
      verified: true,
      // languages, responseTime might not be relevant for an organization
    },
    venue: {
      id: "v1",
      name: "Bikanervala | Sector 62 Noida",
      address:
        "Ground Floor, TOWER-A, A-40, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301",
      city: "NOIDA",
      state: "Uttar Pradesh",
      zipCode: "201301",
      mapUrl: "https://maps.google.com/?q=Bikanervala+Sector+62+Noida",
      directions:
        "Easily accessible via NOIDA electronic city metro station. Take a 5-min walk from the station.",
      venueImage: {
        url: "https://cdn.shopify.com/s/files/1/0774/9769/6567/files/Untitled_design_-_2024-07-18T140314.462_480x480.png?v=1721291681",
        alt: "Aerial view of Noida Bikanervala Grounds",
      },
      howToGetThere: {
        publicTransport: [
          "Blue Line Metro to Noida Sector 16, then 10-min auto ride.",
          "UPRTC Bus routes 347, 323 stop near the stadium.",
        ],
        parking:
          "Paid parking available within tower premises. Free street parking is limited.",
      },
      accessibility: [
        "Designated accessible parking near main entrances.",
        "Paved pathways suitable for wheelchairs and strollers.",
      ],
      amenities: [
        "Food & Beverage",
        "Restrooms (Male, Female, Accessible)",
        "First Aid & Emergency Services",
        "ATM Facility",
        "Shaded Seating Areas",
      ],
      isVerified: true,
    },
    averageRating: 0, // Example from 150 reviews
    reviewCount: 0,
    reviews: [],
    skillLevel: "Everyone Welcome",
    ageRequirement: "All Ages",
    highlights: [
      "No Art Experience Required - This is about expression, not perfection. We provide all materials and gentle guidance.",
      "Science-Backed Benefits - Art therapy has been proven to reduce cortisol (stress hormone) levels by up to 75% in just 45 minutes and provides fresh perspective on work challenges.",
      "Genuine Connection - Meet like-minded professionals in a judgment-free environment designed for authentic sharing.",
      "Complete Experience - End with delicious food from Bikanervala while sharing your creative journey.",
      "Digital Detox: Two hours of screen-free, hands-on creativity that resets your nervous system.",
    ],
    perfectFor: [
      "Busy professionals needing a creative outlet",
      "You want to meet authentic people beyond professional networking",
      "You believe self-care should be more than bubble baths and face masks",
      "You're curious about art and creativity but don't know where to start",
    ],

    whatYoullDo: [
      {
        title: "Welcome & Theme Immersion (Approx. 15-20 mins)",
        description:
          "Enjoy a welcome tea and brief introductions, followed by a guided breathing exercise to shift from a work mindset to a creative one, and an overview of the therapeutic painting process.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/Summer_step1_qeq94c.webp",
          alt: "Art gallery pavilion",
        },
      },
      {
        title: "Mindful Art Creation (75 minutes)",
        description:
          "Experience color meditation to explore your emotional landscape, engage in mood mapping to visually express your feelings, and dive into intuitive painting to capture your summer mood without overthinking.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/gamkxopc3r7viuoyafex_r9xggv.webp",
          alt: "Live band on stage",
        },
      },
      {
        title: "Share & Connect (20 minutes)",
        description:
          "Join an optional sharing circle to discuss your creative process, witness others' artistic expressions and stories, and build meaningful connections through vulnerability and authenticity.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/STEP4_h3exgm.webp",
          alt: "Variety of food dishes",
        },
      },
      {
        title: "Your Artful Takeaway:  Nourish & Celebrate (10 minutes)",
        description:
          "Enjoy Bikanervala’s menu with ₹250 included per person, pack your artwork as a keepsake of your inner journey, and leave with your unique creation, a lighter spirit, and new connections.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940563/dzzdcrxd4wsfuy7a7yrt_lmr2jy.webp",
          alt: "Hands-on workshop",
        },
      },
    ],
    materialsIncluded: [
      "All painting materials (canvas, paints, brushes, aprons)",
      "Expert facilitation with art therapy techniques",
      "Food/refreshments up to ₹250 from Bikanervala menu",
      "Take-home artwork as your personal mood memoir",
      "Post-experience connection with a like-minded creative community",
    ], // Typically not applicable for a festival like this for attendees
    foodIncluded: [
      "Included food/refreshments up to ₹250 from Bikanervala menu.",
    ],
    whatToBring: [
      "Just yourself, an open mind, and a willingness to explore your creativity!",
      "Appetite for delicious food and new experiences.",
    ],
    prerequisites:
      "None! Just a curiosity to explore your emotions through art and a desire to connect.",
    policies: {
      cancellation: "Full refund available up to 24 hours before the event",
      healthSafety:
        "Please follow all posted event guidelines. First aid available. If you feel unwell, please stay home.",
      refund: "All approved refunds processed within 24 hours.",
    },
    guidelines: [
      "We maintain a safe, inclusive space where everyone can explore freely",
      "Arrive 15 minutes early to check in and settle down.",
      "Respect others' creative processes and sharing choices.",
      "Bring an open mind and a willingness to explore your emotions through art.",
      "Support each other's artistic exploration without judgment",
    ],
    faqs: [
      {
        id: "faq1-1",
        question: "Are pets allowed at the festival?",
        answer:
          "Yes, leashed and well-behaved pets are welcome in outdoor park areas. Please clean up after your pet.",
      },
      {
        id: "faq1-2",
        question: "Is there an entry fee for children?",
        answer:
          "Children under 12 enter free when accompanied by a ticketed adult.",
      },
      {
        id: "faq1-3",
        question: "Can I re-enter the festival if I leave?",
        answer:
          "Yes, re-entry is permitted with a valid ticket/wristband for the same day.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder (rickroll, replace with actual video)
    videoPosterUrl:
      "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748940564/Summer_HERO_veqoki.webp", // A poster for the video
  },

  // Event ID "2" (Philosophy & Painting - needs similar full population)
  // ... (Ensure Event 2 is also fully populated for all fields) ...
  // ... (Example: copy structure from Event 1 and adapt content) ...
];
