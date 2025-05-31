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
    name: "Summer Art Festival Extravaganza", // Slightly more engaging name
    slug: generateSlug("Summer Art Festival Extravaganza"),
    tagline:
      "A vibrant weekend celebration of local art, music, and community spirit!",
    description:
      "Immerse yourself in a kaleidoscope of creativity at the annual Summer Art Festival Extravaganza! This family-friendly event brings together talented local artists, captivating live music performances, interactive art workshops, and delicious culinary delights from diverse food vendors. Explore a sprawling showcase of paintings, sculptures, photography, crafts, and digital art. Engage with artists, participate in hands-on activities, and enjoy the lively atmosphere under the summer sun. It's more than just an art show; it's a community gathering celebrating the power of expression and the joy of shared experiences. Don't miss out on this highlight of the summer!",
    shortDescription:
      "Join us for a vibrant weekend of art, music, workshops, and food. A perfect summer outing for all ages!",
    type: "Outdoor Festival",
    category: { id: "art-festival", name: "Art Festival" },
    tags: [
      { id: "t1", name: "Live Music" },
      { id: "t2", name: "Fine Arts" },
      { id: "t3", name: "Food Trucks" },
      { id: "t4", name: "Community Event" },
      { id: "t5", name: "Family Friendly" },
      { id: "t6", name: "Handmade Crafts" },
    ],
    isFeatured: true,
    isTrending: true,
    status: "upcoming",
    date: getFutureDateString(45), // Approx. 1.5 months from now
    startTime: "11:00 AM",
    endTime: "09:00 PM", // Assuming it's a full-day event
    duration: "10 hours / Day (Multi-Day Options)", // Clarified duration
    upcomingDates: [
      // Assuming this festival might run for a weekend
      {
        date: getFutureDateString(45), // Friday
        startTime: "11:00 AM",
        endTime: "09:00 PM",
        spotsLeft: 500, // General admission spots for Friday
        totalSpots: 1000,
        status: "available",
      },
      {
        date: getFutureDateString(46), // Saturday
        startTime: "10:00 AM",
        endTime: "10:00 PM",
        spotsLeft: 350,
        totalSpots: 1500,
        status: "available",
      },
      {
        date: getFutureDateString(47), // Sunday
        startTime: "10:00 AM",
        endTime: "07:00 PM",
        spotsLeft: 0, // Example: Sunday early bird sold out
        totalSpots: 1000,
        status: "sold-out",
      },
    ],
    price: 799, // Price per day or for a pass, e.g., ₹799.00
    currency: "INR",
    isFree: false,
    // ticketsLeft: (can be derived from the most relevant upcomingDate.spotsLeft, or be a general "Tickets available")
    capacity: 1500, // Max capacity for any given day, for general reference
    ticketsLeft: 110,
    heroImage: {
      url: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      alt: "Vibrant outdoor art festival with people browsing stalls",
    },
    galleryImages: [
      {
        id: "g1-1",
        url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Close-up of colorful abstract paintings at a festival stall",
      },
      {
        id: "g1-2",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Live band performing on an outdoor stage at the art festival",
      },
      {
        id: "g1-3",
        url: "https://images.unsplash.com/photo-1531027991453-6793958f6c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Children participating in a hands-on art workshop at the festival",
      },
      {
        id: "g1-4",
        url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Artisan food truck serving customers at the festival",
      },
    ],
    host: {
      id: "h1",
      name: "Artful Noida Foundation", // More formal for a festival
      tagline: "Cultivating creativity, connecting communities.",
      avatar: {
        url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg", // Replace with an actual foundation logo or generic event icon
        alt: "Artful Noida Foundation Logo",
      },
      title: "Event Organizers",
      bio: "The Artful Noida Foundation is a non-profit organization committed to making art accessible and fostering local talent. We organize a variety of cultural events throughout the year to enrich our community.",
      experience: "10+ years organizing community festivals",
      eventsHosted: 25, // Number of significant events
      verified: true,
      // languages, responseTime might not be relevant for an organization
    },
    venue: {
      id: "v1",
      name: "Noida Stadium Grounds",
      address: "Main Stadium Road, Sector 21A",
      city: "NOIDA",
      state: "Uttar Pradesh",
      zipCode: "201301",
      mapUrl: "https://maps.google.com/?q=Noida+Stadium+Sector+21A",
      directions:
        "Easily accessible via Noida-Greater Noida Expressway. Follow signs for Gate No. 3. Nearest metro: Noida Sector 16 (then auto-rickshaw).",
      venueImage: {
        url: "https://images.unsplash.com/photo-1593328349750-50576705d334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1858&q=80",
        alt: "Aerial view of Noida Stadium Grounds during an event",
      },
      howToGetThere: {
        publicTransport: [
          "Blue Line Metro to Noida Sector 16, then 10-min auto ride.",
          "UPRTC Bus routes 347, 323 stop near the stadium.",
        ],
        parking:
          "Ample paid parking available within stadium premises. Free street parking is limited.",
        byCar:
          "From Delhi via DND Flyway, take the Sector 18 exit and head towards Sector 21A. From Greater Noida, use the Expressway.",
        notes:
          "Expect traffic during peak festival hours. Consider public transport.",
      },
      accessibility: [
        "Designated accessible parking near main entrances.",
        "Paved pathways suitable for wheelchairs and strollers.",
        "Accessible restrooms available throughout the venue.",
        "First-aid station with trained medical staff.",
        "Information booths for assistance.",
      ],
      amenities: [
        "Multiple Food Courts & Beverage Stalls",
        "Public Restrooms (Male, Female, Accessible)",
        "Drinking Water Stations",
        "First Aid & Emergency Services",
        "Lost & Found Booth",
        "ATM Facility",
        "Shaded Seating Areas",
      ],
      isVerified: true,
    },
    averageRating: 4.7, // Example from 150 reviews
    reviewCount: 152,
    reviews: [
      {
        id: "r1-1",
        name: "Anjali Sharma",
        rating: 5,
        date: getFutureDateString(-60), // Assuming last year's event
        comment:
          "Absolutely loved the festival! Such a diverse range of art and fantastic music. The food options were great too. Well organized!",
        verified: true,
        avatar: {
          url: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "Anjali S.",
        },
      },
      {
        id: "r1-2",
        name: "Rohan Verma",
        rating: 4,
        date: getFutureDateString(-55),
        comment:
          "A good day out for the family. Some stalls were a bit crowded, but overall enjoyable. The kids loved the craft workshop.",
        verified: false,
        avatar: {
          url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "Rohan V.",
        },
      },
      {
        id: "r1-3",
        name: "Priya Singh",
        rating: 5,
        date: getFutureDateString(-50),
        comment:
          "The live performances were the highlight for me! Such talented musicians. Will definitely come again next year.",
        verified: true,
        profession: "Musician",
        avatar: {
          url: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "Priya S.",
        },
      },
    ],
    skillLevel: "Everyone Welcome",
    ageRequirement: "All Ages",
    highlights: [
      "Over 100+ local artist exhibitions and stalls.",
      "Multiple stages with live music and cultural performances daily.",
      "Dedicated kids' zone with interactive art activities.",
      "Gourmet food truck park and artisan beverage stalls.",
      "Live art demonstrations and pop-up workshops.",
    ],
    whatYoullDo: [
      {
        title: "Explore Diverse Art Pavilions",
        description:
          "Wander through curated sections showcasing painting, sculpture, photography, digital art, and traditional crafts.",
        image: {
          url: "https://images.unsplash.com/photo-1482160549825-59ada1e57c5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          alt: "Art gallery pavilion",
        },
      },
      {
        title: "Enjoy Eclectic Live Performances",
        description:
          "Catch a variety of musical acts, dance troupes, and street performers across multiple stages and zones.",
        image: {
          url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
          alt: "Live band on stage",
        },
      },
      {
        title: "Savor Global & Local Cuisine",
        description:
          "Indulge your taste buds with a wide array of food trucks, local eateries, and specialty beverage options.",
        image: {
          url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          alt: "Variety of food dishes",
        },
      },
      {
        title: "Participate in Creative Workshops",
        description:
          "Join drop-in workshops for pottery, painting, or crafting. Suitable for all ages and skill levels (some may have a small material fee).",
        image: {
          url: "https://images.unsplash.com/photo-1558645704-2835693695ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          alt: "Hands-on workshop",
        },
      },
    ],
    materialsIncluded: null, // Typically not applicable for a festival like this for attendees
    foodIncluded: [
      "Access to purchase from diverse food and beverage vendors.",
    ],
    whatToBring: [
      "Comfortable walking shoes.",
      "Sunscreen, hat, and sunglasses.",
      "Refillable water bottle (water stations available).",
      "Camera to capture the moments.",
      "An open mind and enthusiasm!",
    ],
    whatToWear: ["Casual, comfortable attire suitable for outdoor weather."],
    prerequisites: "None! Just a love for art and community.",
    policies: {
      cancellation:
        "Tickets are non-refundable. Event is rain or shine, with covered areas available.",
      healthSafety:
        "Please follow all posted event guidelines. First aid available. If you feel unwell, please stay home.",
      refund:
        "No refunds unless the event is officially cancelled by the organizers.",
    },
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
      {
        id: "faq1-4",
        question: "What happens if it rains?",
        answer:
          "The festival is a rain or shine event. Many stalls and stages are covered. Check weather updates.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder (rickroll, replace with actual video)
    videoPosterUrl:
      "https://images.unsplash.com/photo-1611162616805-c5873b2f9e02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // A poster for the video
    relatedEvents: [
      // Example structure, assuming slugs and basic info for related cards
      {
        id: "rev-workshop",
        slug: "intro-to-watercolor-workshop",
        name: "Intro to Watercolor Workshop",
        heroImage: {
          url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
          alt: "Watercolor supplies",
        },
        type: "Workshop",
        price: 4500,
        currency: "INR",
      },
      {
        id: "rev-gallery",
        slug: "local-artist-showcase-gallery",
        name: "Local Artist Showcase",
        heroImage: {
          url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400",
          alt: "Art gallery",
        },
        type: "Exhibition",
        isFree: true,
      },
    ],
  },

  // Event ID "2" (Philosophy & Painting - needs similar full population)
  // ... (Ensure Event 2 is also fully populated for all fields) ...
  // ... (Example: copy structure from Event 1 and adapt content) ...
  {
    // ... (Event 2 data fully populated like Event 1, with its specific content) ...
    id: "2",
    name: "Philosophy & Painting Evening",
    slug: generateSlug("Philosophy & Painting Evening"),
    tagline: "Blend discourse with artistic expression.",
    // ... ALL other fields filled like Event 1 but with content for Event 2 ...
    upcomingDates: [
      {
        date: getFutureDateString(10),
        startTime: "06:30 PM",
        spotsLeft: 5,
        totalSpots: 12,
        status: "available",
      },
      {
        date: getFutureDateString(17),
        startTime: "06:30 PM",
        spotsLeft: 12,
        totalSpots: 12,
        status: "available",
      },
      {
        date: getFutureDateString(24),
        startTime: "06:30 PM",
        spotsLeft: 0,
        totalSpots: 12,
        status: "sold-out",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      alt: "Philosophy and art",
    },
    // Make sure to populate all other fields for this event like venue, host, reviews, policies etc.
    // For brevity, I'm not re-typing all of them here, but you should.
    // For instance, for policies, ensure the strings match what your policy components expect.
    policies: {
      cancellation:
        "Free cancellation up to 7 days before the event. 50% refund for cancellations between 3-7 days prior. No refund for cancellations made less than 72 hours before the event start time.",
      refund:
        "Full refunds are issued if the event is cancelled by the host or venue. Participants may request to reschedule to a future date with at least 48 hours notice, subject to availability.",
      healthSafety:
        "Masks are currently optional. Hand sanitizing stations will be provided throughout the venue. We kindly ask that you stay home if you are feeling unwell to ensure the safety of all attendees.",
    },
    // ... other fields for Event 2
    // For brevity in this example, ensure Event 2 and 3 are also fully fleshed out.
    // Especially `upcomingDates` with varied `spotsLeft` and `status`.
    description:
      "A unique evening combining philosophical inquiry with artistic creation. Guided discussion followed by an acrylic painting session, complete with coffee and desserts in an intimate setting. Perfect for exploring big ideas and expressing them on canvas.",
    shortDescription:
      "Philosophical discussion meets acrylic painting in a cozy cafe atmosphere.",
    type: "Art Workshop",
    category: { id: "painting", name: "Painting" },
    tags: [
      { id: "philosophy", name: "Philosophy" },
      { id: "acrylic-painting", name: "Acrylic Painting" },
      { id: "creative-expression", name: "Creative Expression" },
      { id: "discussion", name: "Discussion" },
    ],
    isFeatured: false,
    isTrending: true,
    status: "upcoming",
    date: getFutureDateString(10),
    startTime: "06:30 PM",
    endTime: "09:30 PM",
    duration: "3 hours",
    price: 8500,
    currency: "USD",
    isFree: false,
    capacity: 12,
    ticketsLeft: 10,
    galleryImages: [
      {
        id: "g2-1",
        url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1",
        alt: "Thoughtful discussion group",
      },
      {
        id: "g2-2",
        url: "https://images.unsplash.com/photo-1579762593175-20226054cad0",
        alt: "Hands-on painting session",
      },
    ],
    host: {
      id: "h2",
      name: "Professor Aria Sage",
      tagline: "Exploring ideas through art.",
      avatar: {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        alt: "Professor Aria Sage",
      },
      verified: true,
      title: "Philosopher & Artist",
      bio: "Aria fosters an environment of inquiry and creativity, helping participants connect deep thoughts with artistic practice.",
      experience: "10+ years teaching",
      eventsHosted: 50,
    },
    venue: {
      id: "v2",
      name: "The Thinking Brush Cafe",
      address: "42 Abstract Alley",
      city: "Portland",
      state: "OR",
      zipCode: "97209",
      mapUrl: "https://maps.google.com/?q=The+Thinking+Brush+Cafe+Portland",
      directions: "Located in the NE Arts District. Streetcar stops nearby.",
      venueImage: {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
        alt: "Cozy cafe interior",
      },
      howToGetThere: {
        publicTransport: ["Streetcar A Loop", "Bus #17"],
        parking: "Limited street parking; paid lot on 12th.",
      },
      accessibility: ["Wheelchair accessible", "Quiet space available"],
      amenities: ["WiFi", "Restrooms", "Coffee & Tea Bar"],
      isVerified: true,
    },
    averageRating: 4.9,
    reviewCount: 42,
    reviews: [
      {
        id: "rev2-1",
        name: "Ken Adams",
        rating: 5,
        date: getFutureDateString(-15),
        comment: "Loved the philosophical depth!",
        verified: true,
        avatar: {
          url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
          alt: "Ken A.",
        },
      },
    ],
    skillLevel: "All Levels Welcome",
    ageRequirement: "18+",
    highlights: [
      "Engaging philosophical discussion",
      "Guided acrylic painting",
      "Artisanal coffee and desserts",
    ],
    whatYoullDo: [
      {
        title: "Deep Dive Discussion",
        description: "Explore themes of creativity & perception.",
        image: { url: "...", alt: "Discussion" },
      },
      {
        title: "Create Your Art",
        description: "Translate ideas onto canvas with guidance.",
        image: { url: "...", alt: "Painting" },
      },
    ],
    materialsIncluded: ["11x14 Canvas", "Acrylic paints", "Brushes", "Apron"],
    foodIncluded: [
      "Specialty Coffee/Tea",
      "Dessert Platter (Vegan options available)",
    ],
    whatToBring: ["Notebook (optional)", "Openness to explore"],
    whatToWear: ["Comfortable clothes you don't mind getting paint on"],
    prerequisites: "None - just curiosity!",
    faqs: [
      {
        id: "f2q1",
        question: "Is it for beginners?",
        answer: "Yes, all levels!",
      },
      {
        id: "f2q2",
        question: "Group size?",
        answer: "Intimate, max 12 people.",
      },
    ],
    videoUrl: null,
    videoPosterUrl: null,
    relatedEvents: null,
  },
];
