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
    date: "2025-06-13", // Approx. 1.5 months from now
    startTime: "6:00 PM",
    endTime: "08:00 PM",
    duration: "2 hours / Day (Multi-Day Options)", // Clarified duration
    upcomingDates: [
      // Assuming this festival might run for a weekend
      {
        date: "2025-06-13", // Friday
        startTime: "6:00 PM",
        endTime: "09:00 PM",
        spotsLeft: 15, // General admission spots for Friday
        totalSpots: 15,
        status: "available",
      },
      {
        date: "2025-06-14", // Saturday
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
    averageRating: 4.8, // Example from 150 reviews
    reviewCount: 21,
    reviews: [
      {
        id: "r1-1",
        name: "Riya Kapoor",
        rating: 5,
        comment:
          "This was such a refreshing experience! I never thought painting could be so therapeutic. The guided exercises helped me express emotions I didn't even know I had. Plus, meeting others who share the same work-life struggles was so comforting.",
        date: "2025-06-14",
        verified: true,
      },
      {
        id: "r1-2",
        name: "Rahul Verma",
        rating: 4.5,
        comment:
          "I loved the focus on mindfulness and emotional expression rather than just technique. The atmosphere was so supportive and non-judgmental. I left feeling lighter and more connected to myself and others.",
        date: "2025-06-13",
        verified: true,
      },
      {
        id: "r1-3",
        name: "Sneha Agarwal",
        rating: 5,
        comment:
          "A wonderful way to unwind after a hectic week! The art materials provided were top-notch, and the food from Bikanervala was delicious. I highly recommend this to anyone looking for a creative outlet.",
        date: "2025-06-13",
        verified: true,
      },
    ],
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

  // Event 2: Myths We Inherit Art Exhibition (Past Event)
  {
    id: "2",
    name: "Myths We Inherit",
    slug: generateSlug("Myths We Inherit"),
    tagline:
      "A visual pilgrimage through mythological stories and ancestral memory",
    description:
      "Enter a transcendent journey where ancient wisdom meets contemporary artistic vision. 'Myths We Inherit' is a groundbreaking exhibition that explores how mythological narratives, ancestral memories, and cultural symbols shape our contemporary identity. Curated by visionary Prachi Kapoor, this show brings together three powerful voices: Tirthraj Sinh Zala from Rajkot with his 'Neelantara: A Mythic Blue Journey' series, Abhishek Pandey from Pune exploring inherited myths through mixed media, and Farwa Moledina from Birmingham interpreting cultural symbolism through contemporary visual art. Zala's work specifically focuses on the cosmic power of blue, ritualistic mark-making, and symbols derived from Rajputana heritage, offering a deeply personal and evocative exploration of mythology that feels both timeless and entirely of the present.",
    shortDescription:
      "A Multi-Artist Exhibition Exploring Cultural Heritage & Identity",
    type: "Art Exhibition",
    category: { id: "Art Exhibition", name: "Art Exhibition" },
    tags: [
      { id: "t7", name: "Contemporary Art" },
      { id: "t8", name: "Mythology" },
      { id: "t9", name: "Rajputana Heritage" },
      { id: "t10", name: "Blue Journey" },
      { id: "t11", name: "Ancestral Memory" },
      { id: "t12", name: "Visual Pilgrimage" },
      { id: "t13", name: "Neelantara Series" },
      { id: "t14", name: "Cultural Symbolism" },
    ],
    isFeatured: false,
    isTrending: false,
    status: "past", // Past event
    date: "2025-05-31", // Start date from the invite
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    duration: "2 Days Exhibition",
    upcomingDates: [
      {
        date: "2025-05-31", // Preview Day 1
        startTime: "6:00 PM",
        endTime: "9:00 PM",
        spotsLeft: 0, // Past event, no spots available
        totalSpots: 80,
        status: "past", // Past event
      },
      {
        date: "2025-06-01", // Preview Day 2
        startTime: "11:00 AM",
        endTime: "8:00 PM",
        spotsLeft: 0,
        totalSpots: 120,
        status: "past", // Past event
      },
    ],
    price: 0, // Free exhibition
    currency: "INR",
    isFree: true,
    capacity: 120,
    ticketsLeft: 0, // Past event
    heroImage: {
      url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134006/Myth_gallery_2_-_Copy_qjxmq1.jpg",
      alt: "Contemporary art gallery with visitors viewing large-scale paintings",
    },
    galleryImages: [
      {
        id: "g2-1",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134004/Language_art_-_Copy_rnc9hx.jpg",
        alt: "Tirthraj Sinh Zala's 'Neelantara' series featuring blue ritualistic figures with geometric patterns",
      },
      {
        id: "g2-2",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134544/art_frl6ke.jpg",
        alt: "Close-up of Zala's intricate mark-making technique showing cosmic blue and orange patterns on human forms",
      },

      {
        id: "g2-3",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134005/Myth_gallery_1_-_Copy_jy3shg.jpg",
        alt: "Abhishek Pandey's mixed media installation exploring inherited family myths and memories",
      },
      {
        id: "g2-4",
        url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134545/art_artwork_artgallery_artist_artcollector_artoftheday_artlover_artesanato_artcurator_artjournal_arte_artdaily_arts_artistic_contemporaryart_artgalleries_artistic_tattooart_modernart_ksujre.jpg",
        alt: "Farwa Moledina's contemporary interpretation of cultural symbols from Birmingham perspective",
      },
    ],
    host: {
      id: "h2",
      name: "Prachi Kapoor",
      tagline:
        "Bringing Fine Art into functional environments, believing in art that transcends traditional boundaries",
      avatar: {
        url: "https://media.licdn.com/dms/image/v2/D4D03AQH2nZGaM9wqIQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728452638004?e=2147483647&v=beta&t=RAPuGe0rFl4L2srbERKkBMK36ZgYNny2OE_MqUHXkH0",
        alt: "Prachi Kapoor, Founder & Curator of Artura Spaces",
      },
      title: "Founder & Curator, Artura Spaces",
      bio: "Prachi Kapoor is the visionary founder of Artura Spaces, dedicated to creating dialogue between local and international artists while exploring stories, materials, cultures, and people. With a philosophy that art should transcend the confines of traditional galleries and collector storage units, she curates exhibitions that bring powerful voices together. Her curatorial approach focuses on creating space for meaningful artistic dialogue, as demonstrated in 'Myths We Inherit' where she brings together three distinct voices—each exploring myths, memories, and cultural symbols that shape identity.",
      experience:
        "8+ years creating dialogue-focused contemporary art exhibitions",
      eventsHosted: 25,
      verified: true,
    },
    venue: {
      id: "v2",
      name: "Artura Spaces",
      address:
        "Divine Chairs D-7, Arna Industrial Estate, Sakinaka Road, Sakinaka, Andheri (E), Mumbai - 400 072",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400072",
      mapUrl: "https://maps.google.com/?q=Artura+Spaces+Sakinaka+Mumbai",
      directions:
        "Located in Sakinaka's industrial arts district, easily accessible via Western Railway and Metro.",
      venueImage: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpvXvg7lZ_Fuum33n-xPAK0_0iVydHtJcyDg&s",
        alt: "Artura Spaces contemporary gallery with industrial aesthetic",
      },
      howToGetThere: {
        publicTransport: [
          "Western Railway: Andheri Station (10-minute auto ride to Sakinaka)",
          "Mumbai Metro: Andheri Metro Station, then auto/taxi to venue",
          "BEST Bus: Routes to Sakinaka from various parts of Mumbai",
        ],
        parking:
          "Industrial area parking available. Street parking accessible during exhibition hours.",
      },
      accessibility: [
        "Ground floor gallery space with easy access",
        "Wide entrance suitable for wheelchairs",
        "Accessible restroom facilities",
      ],
      amenities: [
        "Climate-controlled industrial gallery space",
        "Professional lighting for art viewing",
        "Comfortable seating areas for reflection",
        "Refreshment area during openings",
        "Artist catalogues and exhibition materials",
        "WiFi access for visitors",
      ],
      isVerified: true,
    },
    averageRating: 4.7,
    reviewCount: 89,
    reviews: [
      {
        id: "r2-1",
        name: "Aditi Sharma",
        rating: 5,
        comment:
          "Zala's 'Neelantara' series was absolutely mesmerizing! The way he uses blue to create this cosmic, ritualistic journey through mythology - it felt like meditation. The conversation with Prachi about his Rajputana heritage added so much depth to understanding the work.",
        date: "2025-06-02",
        verified: true,
      },
      {
        id: "r2-2",
        name: "Rohit Mehta",
        rating: 5,
        comment:
          "What struck me most was how Tirthraj's work connects ancient symbols with contemporary mark-making. The podcast conversation revealed how his travels across India inform his deeply personal mythology exploration. Truly transcendent art.",
        date: "2025-06-01",
        verified: true,
      },
      {
        id: "r2-3",
        name: "Kavya Patel",
        rating: 4,
        comment:
          "The exhibition brilliantly showcases how myths shape our identity. Zala's blue journey felt like a spiritual pilgrimage, and the way all three artists' works dialogue with each other shows Prachi's exceptional curatorial vision.",
        date: "2025-06-01",
        verified: true,
      },
    ],
    skillLevel: "All Art Enthusiasts",
    ageRequirement: "All Ages (Children under 16 with adult supervision)",
    highlights: [
      "Tirthraj Sinh Zala's 'Neelantara: A Mythic Blue Journey' - Experience the cosmic power of blue through ritualistic mark-making and symbols derived from Rajputana heritage, offering a deeply personal exploration of mythology.",
      "Visual Pilgrimage Through Mythology - Journey through ancestral memory and cultural symbols as interpreted by three distinct artistic voices from Rajkot, Pune, and Birmingham.",
      "Exclusive Artist Insights - Featured in The Aishya Magazine with in-depth conversations about the creative process, cultural inheritance, and the role of color in spiritual expression.",
      "Immersive Gallery Experience - Navigate through carefully curated linear pathways that create dialogue between local and international artistic perspectives.",
      "Contemporary Mythology Exploration - Witness how ancient narratives translate into present-day visual language through mark-making, mixed media, and symbolic representation.",
    ],
    perfectFor: [
      "Contemporary art enthusiasts seeking thought-provoking content",
      "Individuals exploring questions of identity and cultural heritage",
      "Art collectors interested in emerging South Asian artists",
      "Students and academics studying contemporary cultural narratives",
      "Anyone curious about the intersection of tradition and modernity",
    ],
    whatYoullDo: [
      {
        title: "Welcome & Exhibition Overview (15 minutes)",
        description:
          "Begin with a curator-led introduction to the exhibition's themes and artists. Receive a detailed gallery map and insights into the conceptual framework connecting the three distinct practices.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134005/Welcome_Exhibition_rqhz6k.jpg",
          alt: "Curator speaking to a small group in gallery entrance",
        },
      },
      {
        title:
          "Tirthraj Sinh Zala: Neelantara - A Mythic Blue Journey (45 minutes)",
        description:
          "Immerse yourself in Zala's transformative 'Neelantara' series, where the cosmic power of blue meets ritualistic mark-making. Discover how his Rajputana heritage and travels across India inform this deeply personal mythology exploration, as featured in The Aishya Magazine's exclusive artist conversation.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134004/Tirthraj_journey_zobcni.jpg",
          alt: "Zala's 'Neelantara' featuring blue ritualistic figures with intricate geometric patterns",
        },
      },
      {
        title: "Abhishek Pandey: Memory Fragments (30 minutes)",
        description:
          "Engage with Pandey's mixed-media installations that reconstruct familial and collective memories, inviting viewers to consider how personal histories shape identity formation.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134004/Memory_Fragments_angwd3.jpg",
          alt: "Mixed media installation with photographs and found objects",
        },
      },
      {
        title: "Farwa Moledina: Psychedelic Repetitions (30 minutes)",
        description:
          "Experience Moledina's hypnotic works that use repetitive patterns and vibrant colors to explore the cyclical nature of cultural transmission and transformation.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134004/Myth_gallery_1_cnnt56.jpg",
          alt: "Colorful psychedelic artwork with repetitive patterns",
        },
      },
      {
        title: "Reflection & Discussion (15 minutes)",
        description:
          "Conclude your visit in the dedicated reflection space where you can journal your thoughts, participate in guided discussions, or simply contemplate the themes explored.",
        image: {
          url: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134003/gallery_3_cbbks3.jpg",
          alt: "Visitors sitting and discussing art in gallery seating area",
        },
      },
    ],
    materialsIncluded: [
      "Exclusive exhibition catalogue featuring artist statements and Prachi Kapoor's curatorial essay",
      "The Aishya Magazine feature article with in-depth artist interviews and process insights",
      "Gallery map highlighting the 'visual pilgrimage' pathway through all three artists' works",
      "Audio guide access featuring artist conversations about mythology, color symbolism, and cultural inheritance",
      "Complimentary postcard set featuring key works from Zala's 'Neelantara' series",
      "Digital access to extended artist interviews and behind-the-scenes creative process documentation",
    ],
    foodIncluded: [
      "Welcome refreshments during preview opening",
      "Light snacks and beverages available at gallery café (additional cost)",
    ],
    whatToBring: [
      "An open mind and curiosity about cultural narratives",
      "Camera for personal documentation (flash photography not permitted)",
      "Notebook if you enjoy reflecting on art experiences",
    ],
    prerequisites:
      "No prior art knowledge required. Suitable for all levels of art appreciation.",
    policies: {
      cancellation: "Free cancellation up to 2 hours before visit time",
      healthSafety:
        "Gallery maintains COVID-19 protocols. Photography permitted without flash. No touching of artworks.",
      refund:
        "Full refunds processed within 48 hours for approved cancellations.",
    },
    guidelines: [
      "Maintain respectful distance from all artworks",
      "Keep voices low to preserve the contemplative atmosphere",
      "Children under 16 must be accompanied by adults at all times",
      "No food or beverages in exhibition areas (café available separately)",
      "Turn mobile devices to silent mode during your visit",
      "Engage respectfully with other visitors and gallery staff",
    ],
    faqs: [
      {
        id: "faq2-1",
        question: "How long should I plan for my visit?",
        answer:
          "We recommend allowing 2-2.5 hours for a comprehensive experience, though you're welcome to stay longer. The exhibition is designed for contemplative viewing.",
      },
      {
        id: "faq2-2",
        question: "Are guided tours available?",
        answer:
          "Yes, curator-led tours are available on weekends at 3 PM and 6 PM. Private group tours can be arranged by calling +91 91368 66779.",
      },
      {
        id: "faq2-3",
        question: "Can I purchase artworks from the exhibition?",
        answer:
          "Yes, most pieces are available for purchase. Please speak with gallery staff for pricing and acquisition information.",
      },
      {
        id: "faq2-5",
        question:
          "What makes Tirthraj Sinh Zala's 'Neelantara' series special?",
        answer:
          "'Neelantara: A Mythic Blue Journey' explores the cosmic power of blue through ritualistic mark-making and symbols from Rajputana heritage. As featured in The Aishya Magazine, Zala's work offers a deeply personal and evocative exploration of mythology that feels both timeless and contemporary.",
      },
    ],
    videoUrl:
      "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134006/Myth_gallery_2_-_Copy_qjxmq1.jpg", // Placeholder
    videoPosterUrl:
      "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1749134006/Myth_gallery_2_-_Copy_qjxmq1.jpg",
  },
  // Event ID "2" (Philosophy & Painting - needs similar full population)
  // ... (Ensure Event 2 is also fully populated for all fields) ...
  // ... (Example: copy structure from Event 1 and adapt content) ...
];
