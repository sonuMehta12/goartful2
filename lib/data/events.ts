
import { Event } from '../types/event';
import {addDays} from 'date-fns'

// Helper function to generate slugs (simple version)
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove non-word characters except hyphens
};

export const EVENTS_DATA: Event[] = [
  // one Real Event (Expanded with new fields)
  {
    id: "1",
    name: "Summer Art Festival",
    slug: generateSlug("Summer Art Festival"),
    tagline: "A vibrant celebration of local art and creativity.",
    description:
      "Experience the vibrant world of art from your neighborhood artists. Join us for a day filled with creativity, music, and community spirit. This festival showcases a diverse range of artistic expressions, from traditional paintings and sculptures to contemporary digital art and interactive installations. Enjoy live music performances, delicious food from local vendors, and hands-on workshops for all ages. It's a perfect outing for families, art enthusiasts, and anyone looking to immerse themselves in a creative atmosphere.",
    shortDescription:
      "Experience the vibrant world of art from your neighborhood artists. Join us for a day filled with creativity, music, and community spirit.",
    type: "Festival",
    category: { id: "art-festival", name: "Art Festival" },
    tags: [
      { id: "t1", name: "Music" },
      { id: "t2", name: "Painting" },
      { id: "t3", name: "Food" },
      { id: "t4", name: "Community" },
    ],
    isFeatured: true,
    isTrending: true,
    status: "upcoming",
    date: "2025-07-15",
    startTime: "12:00 PM",
    endTime: "08:00 PM",
    duration: "8 hours",
    price: 799, // Represents ₹799.00
    currency: "INR",
    isFree: false,
    ticketsLeft: 110, // Example, might be total for the event
    capacity: 150,  // Example capacity
    heroImage: {
      url: "https://i.pinimg.com/736x/8d/97/54/8d97543991b2c801ec671fac7d72496d.jpg",
      alt: "Colorful artwork at an outdoor summer art festival",
    },
    galleryImages: [
      { id: "g1-1", url: "https://i.pinimg.com/736x/8d/97/54/8d97543991b2c801ec671fac7d72496d.jpg", alt: "Artwork display"},
      { id: "g1-2", url: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d", alt: "People enjoying the festival"},
      { id: "g1-3", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745", alt: "Live music performance"},
    ],
    host: {
      id: "h1",
      name: "Artful Minds Collective", // Changed from Mindful Julie for a festival
      avatar: {
        url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg", // Placeholder, might be org logo
        alt: "Artful Minds Collective Logo",
      },
      verified: true,
      bio: "The Artful Minds Collective is dedicated to promoting local artists and fostering community engagement through creative events."
    },
    venue: {
      id: "v1",
      name: "City Park Grounds", // Changed from Bikanarewala for a festival
      address: "123 Park Avenue, Central District",
      city: "NOIDA", // Kept city for consistency with your example
      state: "UP",
      zipCode: "201301",
      accessibility: [
        "Wheelchair Accessible Paths",
        "Accessible Restrooms",
        "Reserved Seating Areas",
        "ASL Interpreters Available on Request",
      ],
      amenities: ["Food Stalls", "Restrooms", "First Aid Station", "Information Booth"],
    },
    averageRating: 4.8,
    reviewCount: 95, // Increased review count for a festival
    reviews: [
      // Add a few sample reviews
      { id:"r1-1", name: "Rina S.", rating: 5, date: "2024-07-18", comment: "Amazing festival! So much talent on display.", verified: true, avatar: {url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", alt:"Rina S."}},
      { id:"r1-2", name: "Mohit K.", rating: 4, date: "2024-07-19", comment: "Great vibe and good food. Music was a bit loud in some areas.", verified: true, avatar: {url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde", alt:"Mohit K."}},
    ],
    skillLevel: "All Welcome",
    ageRequirement: "All Ages",
    highlights: ["Diverse art displays", "Live music & performances", "Food vendors", "Interactive workshops"],
    whatYoullDo: [
        { title: "Explore Art Installations", description: "Wander through various stalls and open-air galleries.", image: { url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968", alt: "Art installation"}},
        { title: "Enjoy Live Music", description: "Listen to local bands and musicians performing throughout the day.", image: { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745", alt: "Live music"}},
        { title: "Participate in Workshops", description: "Join mini art workshops for all skill levels.", image: { url: "https://images.unsplash.com/photo-1531027991453-6793958f6c3b", alt: "Art workshop"}},
    ],
    policies: {
        cancellation: "Event is rain or shine. Tickets are non-refundable.",
        healthSafety: "Follow posted health guidelines. Sanitizer stations available.",
    },
    faqs: [
        {id: "faq1-1", question: "Are pets allowed?", answer: "Leashed pets are welcome in outdoor areas."},
        {id: "faq1-2", question: "Is there parking?", answer: "Limited street parking. Public transport recommended."},
    ],
  },

  //  Detailed Event (Adapted to the new structure)
  {
    id: "2",
    name: "Philosophy & Painting: An Evening of Creative Exploration",
    slug: generateSlug("Philosophy & Painting: An Evening of Creative Exploration"),
    tagline: "Blend philosophical discourse with artistic expression in this unique hosted experience.",
    description:
      "Join us for an evening that combines philosophical inquiry with artistic expression. We'll begin with a guided philosophical discussion on beauty, perception, and creativity led by our host Professor David Chen. Following our discussion, you'll channel these ideas into your own acrylic painting, with step-by-step guidance regardless of your artistic experience level. The intimate café setting, accompanied by specialty coffee and desserts, creates the perfect atmosphere for this unique blend of intellectual and creative exploration.",
    shortDescription: "Blend philosophical discourse with artistic expression in this unique workshop.",
    type: "Art Workshop",
    category: { id: "painting", name: "Painting" },
    tags: [
      { id: "t5", name: "Philosophy" },
      { id: "t2", name: "Painting" },
      { id: "t6", name: "Coffee" },
      { id: "t7", name: "Storytelling" },
    ],
    isFeatured: false,
    isTrending: true,
    status: "upcoming",
    date: addDays(new Date(), 10).toISOString().split('T')[0], // Example: 10 days from now
    startTime: "06:30 PM",
    endTime: "09:30 PM",
    duration: "3 hours",
    upcomingDates: [
        { date: addDays(new Date(), 10).toISOString().split('T')[0], startTime: "06:30 PM", spotsLeft: 5, totalSpots: 12, status: "available" },
        { date: addDays(new Date(), 17).toISOString().split('T')[0], startTime: "06:30 PM", spotsLeft: 12, totalSpots: 12, status: "available"  },
        { date: addDays(new Date(), 24).toISOString().split('T')[0], startTime: "06:30 PM", spotsLeft: 0, totalSpots: 12, status: "sold-out"  },
    ],
    price: 8500, // Assuming $85.00 for your example, converted to cents if USD, or use 85 if price is 85 of your currency
    currency: "USD", // As per your $85 example for this event
    isFree: false,
    // ticketsLeft: 5, // This can come from the specific upcomingDate or be a general value
    capacity: 12, // Group size
    heroImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", // Primary image
      alt: "Philosophy and art discussion setting",
    },
    galleryImages: [
      {id: "g2-1", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", alt: "Philosophy and art discussion"},
      {id: "g2-2", url: "https://images.unsplash.com/photo-1579762593175-20226054cad0", alt: "Painting session"},
      {id: "g2-3", url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1", alt: "Participants engaged in discussion"},
      {id: "g2-4", url: "https://images.unsplash.com/photo-1571388208497-71bedc66e932", alt: "Coffee and art supplies"},
      {id: "g2-5", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f", alt: "Gallery space setup"},
      {id: "g2-6", url: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca", alt: "Completed artwork examples"},
    ],
    host: {
      id: "h2",
      name: "Professor David Chen",
      avatar: {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        alt: "Professor David Chen",
      },
      title: "Philosophy Professor & Artist",
      bio: "David holds a Ph.D. in Philosophy from Columbia University and has been teaching at Portland State for 12 years. His artistic journey began during his post-doctoral research in Florence, where he studied Renaissance art techniques. David specializes in creating experiences that bridge philosophical inquiry with creative expression, believing that each informs and enhances the other.",
      experience: "15+ years",
      eventsHosted: 87,
      responseTime: "Typically responds within 2 hours",
      languages: ["English", "Mandarin"],
      verified: true,
    },
    venue: {
      id: "v2",
      name: "Artisan Loft",
      address: "237 Artisan Way, Portland Arts District, Portland, OR 97209",
      city: "Portland",
      state: "OR",
      zipCode: "97209",
      mapUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", // This is an image, not a map URL, replace
      directions: "5 min walk from Pearl District metro Station, Street parking available",
      accessibility: ["Wheelchair accessible entrance and elevator", "Near metro", "Changing room", "Service animals welcome"],
      amenities: ["WiFi", "Restrooms", "Climate controlled", "Accessible parking"],
      isVerified: true,
    },
    averageRating: 4.9,
    reviewCount: 42,
    reviews: [
        { id:"r2-1", name: "Sarah J.", profession: "Teacher", rating: 5, date: "2024-06-02", comment: "This event was the perfect blend of intellectual stimulation and creative expression...", avatar: {url:"https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c", alt: "Sarah J."}},
        { id:"r2-2", name: "Michael T.", profession: "Software Engineer", rating: 5, date: "2024-05-15", comment: "I'm not typically artistic, but the host created such a welcoming environment...", avatar: {url:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", alt:"Michael T."}},
        { id:"r2-3", name: "Leila K.", profession: "Marketing Director", rating: 4, date: "2024-05-04", comment: "I attended with my team as a corporate bonding activity and it exceeded our expectations...", avatar: {url:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df", alt:"Leila K."}},
    ],
    skillLevel: "All Levels",
    ageRequirement: "18+",
    highlights: [
      "Engage in a stimulating philosophical discussion about aesthetics and perception",
      "Create your own acrylic painting inspired by philosophical concepts",
      "Enjoy specialty coffee and artisanal desserts in an intimate gallery setting",
      "Take home your completed artwork and a curated reading list for further exploration",
    ],
    whatYoullDo: [
        { title: "Philosophical Discourse", description: "Begin with a guided philosophical discussion on beauty, perception, and creativity.", duration: "60 minutes", image: { url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1", alt: "Discussion group"}},
        { title: "Acrylic Painting Session", description: "Channel philosophical ideas into your own acrylic painting with step-by-step guidance.", duration: "90 minutes", image: { url: "https://images.unsplash.com/photo-1579762593175-20226054cad0", alt: "Painting process"}},
        { title: "Reflection & Sharing", description: "Share your artwork and insights with the group, enjoying coffee and desserts.", duration: "30 minutes", image: { url: "https://images.unsplash.com/photo-1571388208497-71bedc66e932", alt: "Coffee and art"}},
    ],
    materialsIncluded: ['Canvas (11" x 14")', "Acrylic paint set", "Brushes", "Easel usage", "Apron", "Reading list"],
    foodIncluded: ["Specialty coffee", "Artisanal dessert platter", "Sparkling and still water"],
    whatToBring: ["Notebook and pen", "Personal reference images (optional)", "An open mind"],
    whatToWear: ["Comfortable clothing (paint-friendly)", "Closed-toe shoes recommended"],
    prerequisites: "No prior philosophy or painting experience required. Just bring curiosity!",
    policies: {
      cancellation: "Free cancellation up to 7 days before event. 50% refund for cancellations 3-7 days prior. No refund less than 72 hours before event.",
      healthSafety: "Masks optional. Hand sanitizing stations provided. Stay home if unwell.",
      refund: "Full refunds if event cancelled by host/venue. Option to move to future date with 48+ hours notice.",
      privateBooking: "Private booking available for groups of 8+. Contact host for pricing.",
      groupBooking: "Groups of 6+ receive a 10% discount. Book together or contact host.",
    },
    faqs: [
      {id:"faq2-1", question: "Is this suitable for beginners?", answer: "Absolutely! Both parts are designed for all levels."},
      {id:"faq2-2", question: "Can I bring a friend who didn't book?", answer: "Unfortunately, due to limited capacity, advance booking is required."},
      {id:"faq2-3", question: "What happens in case of bad weather?", answer: "This event is indoors and will proceed regardless of weather."},
    ],
    relatedEvents: [
      {id:"rev1", slug:"mindful-watercolors", name: "Mindful Watercolors: Meditation & Art", heroImage: {url:"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", alt:"Watercolor art"}, type: "Art Therapy", price: 6500, currency: "USD", date: addDays(new Date(), 30).toISOString().split('T')[0], startTime: "02:00 PM"},
      {id:"rev2", slug:"literary-analysis-drawing", name: "Literary Analysis Through Drawing", heroImage: {url:"https://images.unsplash.com/photo-1519791883288-dc8bd696e667", alt:"Drawing book"}, type: "Workshop", price: 7500, currency: "USD"},
    ],
  },
  // Add a Third Fake Event (more concise for brevity, expand as needed)
  {
    id: "3",
    name: "Digital Art & Illustration Masterclass",
    slug: generateSlug("Digital Art & Illustration Masterclass"),
    tagline: "Unlock your digital creativity with pro tools and techniques.",
    description:
      "Dive into the world of digital art! This masterclass covers everything from software basics (Procreate/Photoshop) to advanced illustration techniques. Learn about digital painting, character design, and creating stunning visual narratives. Perfect for aspiring digital artists and graphic designers.",
    shortDescription: "Master digital art tools and create stunning illustrations.",
    type: "Masterclass",
    category: { id: "digital-art", name: "Digital Art" },
    tags: [
      { id: "t8", name: "Procreate" },
      { id: "t9", name: "Photoshop" },
      { id: "t10", name: "Illustration" },
    ],
    isFeatured: true,
    isTrending: false,
    status: "upcoming",
    date: addDays(new Date(), 20).toISOString().split('T')[0],
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    duration: "7 hours (includes 1-hour lunch break)",
    price: 19900, // e.g. ₹199.00 if currency was INR, or $199.00 if USD
    currency: "USD", // Let's make this one USD for variety
    isFree: false,
    ticketsLeft: 15,
    capacity: 20,
    heroImage: {
      url: "https://images.unsplash.com/photo-1611241999397-94f73c044a4a",
      alt: "Digital tablet with art software and stylus",
    },
    galleryImages: [
        {id: "g3-1", url: "https://images.unsplash.com/photo-1611241999397-94f73c044a4a", alt:"Digital art setup"},
        {id: "g3-2", url: "https://images.unsplash.com/photo-1581094651087-324797167860", alt:"Student working on tablet"},
    ],
    host: {
      id: "h3",
      name: "Pixel Wizards Academy",
      avatar: {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119", // Placeholder
        alt: "Pixel Wizards Academy Logo",
      },
      verified: true,
      bio: "Pixel Wizards Academy offers cutting-edge training in digital arts and design, led by industry professionals."
    },
    venue: {
      id: "v3",
      name: "Tech Innovation Hub",
      address: "404 Digital Drive, Innovation Park",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      accessibility: ["Full ADA Compliance", "Elevator Access", "Assistive Listening Devices"],
      amenities: ["High-Speed WiFi", "Projectors", "Individual Workstations", "Cafe On-site"],
    },
    averageRating: 4.7,
    reviewCount: 78,
    reviews: [
        {id:"r3-1", name:"Alex P.", rating: 5, date: "2024-04-10", comment: "Fantastic masterclass, learned so much!", avatar: {url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61", alt: "Alex P."}},
    ],
    skillLevel: "Intermediate",
    ageRequirement: "16+",
    highlights: ["Hands-on software training", "Portfolio-worthy projects", "Industry insights", "Networking opportunities"],
    whatYoullDo: [
        { title: "Software Introduction", description: "Get familiar with Procreate and Photoshop interfaces and core tools.", duration: "1.5 hours"},
        { title: "Illustration Techniques", description: "Learn digital painting, layering, and texturing.", duration: "2.5 hours"},
        { title: "Project Work", description: "Apply your skills to a guided project.", duration: "2 hours"},
    ],
    materialsIncluded: ["Access to software during class", "Digital workbooks", "Resource list"],
    policies: { cancellation: "7-day notice for full refund." },
    faqs: [ {id:"faq3-1", question: "Do I need my own tablet?", answer: "Tablets are provided, but you can bring your own."} ],
  },
];