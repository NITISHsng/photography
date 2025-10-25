//permition list of admin and operator
export const permissionsList = [
  { id: "bookings", name: "Bookings Management", color: "blue" },
  { id: "team", name: "Team Management", color: "purple" },
  { id: "equipment", name: "Equipment Management", color: "orange" },
  { id: "clients", name: "Client Management", color: "green" },
  { id: "inventory", name: "Inventory Control", color: "red" },
  { id: "scheduling", name: "Scheduling", color: "pink" },
];

// categories
import {
  Camera,
  ScreenShare,
  Video,
  Edit,
  Package,
  Lightbulb,
  Mic,
  Monitor,
  Film,
  Clapperboard,
  Tv,
  Tv2,
  Image as ImageIcon,
  Usb,
  PictureInPicture,
} from "lucide-react";

export const ourServices = [
  { label: "Wedding", imageUrl: "/homeImages/l13.webp" },
  { label: "Pre-Wedding", imageUrl: "/homeImages/ser1.webp" },
  { label: "Engagement Ceremony", imageUrl: "/homeImages/l114.webp" },
  {
    label: "Outdoor Wedding (Photo & Video)",
    imageUrl: "/homeImages/outdoor_wedding.webp",
  },
  { label: "Baby Photography", imageUrl: "/homeImages/l35.webp" },
  {
    label: "Rice Ceremony Photography",
    imageUrl: "/homeImages/annaprashan.webp",
  },
  { label: "Corporate Event", imageUrl: "/homeImages/l41.webp" },
  { label: "Birthday", imageUrl: "/homeImages/l37.webp" },
];

//  categories
export const categories = [
  {
    id: "event",
    icon: Package,
    title: "Complete Event",
    description: "Full event coverage with customizable services",
  },
  {
    id: "editor",
    icon: Edit,
    title: "Editor",
    description: "Skilled post-production specialists",
  },
  {
    id: "cameraman",
    icon: Camera,
    title: "Cameraman",
    description: "Professional videographers and photographers",
  },
  {
    id: "equipment",
    icon: Video,
    title: "Equipment",
    description: "High-end cameras and production gear",
  },
];

// package
export const packages = {
  cameraman: [
    {
      id: "cam-basic",
      name: "Basic Cameraman",
      price: "₹12,000/day",
      duration: "Half Day (4 hours)",
      features: [
        "Professional cameraman",
        "Basic camera setup (DSLR/Mirrorless)",
        "Standard lens kit",
        "Basic lighting equipment",
        "Memory cards included",
        "Raw footage delivery",
      ],
      popular: false,
    },
    {
      id: "cam-pro",
      name: "Professional Cameraman",
      price: "₹20,000/day",
      duration: "Full Day (8 hours)",
      features: [
        "Experienced lead cameraman",
        "Cinema camera (RED/ARRI)",
        "Premium lens collection",
        "Professional lighting setup",
        "Audio recording equipment",
        "Assistant cameraman",
        "Same-day highlight reel",
        "Cloud backup included",
      ],
      popular: true,
    },
    {
      id: "cam-premium",
      name: "Premium Cameraman",
      price: "₹32,000/day",
      duration: "Multi-Day Project",
      features: [
        "Award-winning cinematographer",
        "Full cinema camera rig",
        "Specialized equipment (drones, gimbals)",
        "Multi-camera setup",
        "Professional crew (3-5 people)",
        "Live streaming capability",
        "On-site director",
        "Priority post-production",
        "Dedicated project manager",
      ],
      popular: false,
    },
  ],
  equipment: [
    {
      id: "eq-basic",
      name: "Starter Equipment Kit",
      price: "₹6,000/day",
      duration: "Daily Rental",
      features: [
        "DSLR Camera (Canon/Sony)",
        "2-3 Prime lenses",
        "Tripod and monopod",
        "Basic LED light panel",
        "64GB memory cards",
        "Camera bag and accessories",
      ],
      popular: false,
    },
    {
      id: "eq-pro",
      name: "Professional Equipment Kit",
      price: "₹16,000/day",
      duration: "Daily/Weekly Rental",
      features: [
        "Cinema camera (BlackMagic/Sony FX)",
        "Professional lens set",
        "Gimbal stabilizer",
        "Professional lighting kit",
        "Wireless audio system",
        "External monitor",
        "Multiple batteries and chargers",
        "Professional carrying cases",
      ],
      popular: true,
    },
    {
      id: "eq-premium",
      name: "Cinema Equipment Package",
      price: "₹40,000/day",
      duration: "Weekly/Monthly Rental",
      features: [
        "RED/ARRI cinema camera",
        "Master Prime lens set",
        "Professional rigging system",
        "Advanced lighting setup",
        "Wireless follow focus",
        "Director's monitor setup",
        "Professional audio gear",
        "Drone with operator",
        "Technical support included",
      ],
      popular: false,
    },
  ],
  editor: [
    {
      id: "ed-basic",
      name: "Basic Video Editing",
      price: "₹4,000/hour",
      duration: "1-3 Days Turnaround",
      features: [
        "Video cutting and trimming",
        "Basic color correction",
        "Simple transitions",
        "Text and title cards",
        "Music synchronization",
        "Export in HD (1080p)",
        "2 rounds of revisions",
      ],
      popular: false,
    },
    {
      id: "ed-pro",
      name: "Professional Video Editing",
      price: "₹8,000/hour",
      duration: "3-7 Days Turnaround",
      features: [
        "Advanced video editing",
        "Professional color grading",
        "Motion graphics and animations",
        "Audio mixing and cleanup",
        "Multi-camera synchronization",
        "Custom transitions and effects",
        "4K export capability",
        "Unlimited revisions",
        "Project file delivery",
      ],
      popular: true,
    },
    {
      id: "ed-premium",
      name: "Cinema Post-Production",
      price: "₹12,000/hour",
      duration: "1-2 Weeks Turnaround",
      features: [
        "Hollywood-grade editing",
        "Advanced VFX and compositing",
        "Professional sound design",
        "Custom motion graphics",
        "Film-quality color grading",
        "Multi-format delivery",
        "8K capability",
        "Dedicated project manager",
        "Rush delivery available",
        "Full project archive",
      ],
      popular: false,
    },
  ],
  event: [
    {
      id: "event-basic",
      name: "Essential Event Package",
      price: "Custom Pricing",
      duration: "Based on Selected Services",
      features: [
        "Choose your required services",
        "Professional team assignment",
        "Flexible service combinations",
        "Custom pricing based on selection",
        "Quality guarantee",
        "Professional delivery",
      ],
      popular: false,
    },
    {
      id: "event-premium",
      name: "Premium Event Package",
      price: "Custom Pricing",
      duration: "Based on Selected Services",
      features: [
        "All available services to choose from",
        "Priority team assignment",
        "Advanced equipment options",
        "Flexible timing and duration",
        "Custom service combinations",
        "Dedicated project coordinator",
      ],
      popular: true,
    },
    {
      id: "event-luxury",
      name: "Luxury Event Package",
      price: "Custom Pricing",
      duration: "Full Service Coverage",
      features: [
        "Complete service selection available",
        "Premium team and equipment",
        "Unlimited service combinations",
        "VIP treatment and priority",
        "Dedicated event manager",
        "Same-day delivery options",
      ],
      popular: false,
    },
  ],
};

// Equipment & Staff
const camera = { name: "Camera", type: "equipment" };
const cameraLights = { name: "Camera Lights", type: "equipment" };
const stageLights = { name: "Stage Lights", type: "equipment" };
// const lights = { name: "Lights", type: "equipment" };
const mic = { name: "Microphone", type: "equipment" };
const operator = { name: "Camera Operator", type: "staff" };
const droneOperator = { name: "Drone Operator", type: "staff" };
// const soundTech = { name: "Sound Technician", type: "staff" };
// const editor = { name: "Editor", type: "staff" };
const drone = { name: "Drone", type: "equipment" };
const streamingRig = { name: "Streaming//drone option" };

export const applyDiscount = (mrp, discount) => {
  return Math.round(mrp - (mrp * discount) / 100);
};

// Light Options
export const lightOptions = [
  {
    id: "photography-umbrella",
    name: "Photography Lighting Umbrella",
    mrp: 0,
    discount: 100,
    price: 2500,
    description:
      "Classic umbrella diffuser for soft lighting in photography and stage setups",
  },
  {
    id: "led-wash-lights",
    name: "LED Stage Wash Lights",
    discount: 100,
    price: 3000,
    description: "Powerful LED wash lights for stage and backdrop illumination",
  },
  {
    id: "uplighting",
    name: "Stage Uplighting",
    discount: 50,
    price: 2000,
    description:
      "Ambient uplights that create colorful accents on walls, drapes, and stage décor",
  },
  {
    id: "short-wedding-led",
    name: "Decorative LED Light",
    discount: 80,
    price: 2200,
    description:
      "Compact decorative LED lights designed for wedding stage ambience",
  },
  {
    id: "flower-stand-lighted",
    name: "Lighted Flower Stand",
    discount: 60,
    price: 3000,
    description:
      "Elegant flower stand with integrated lighting for stage décor",
  },
  {
    id: "candlestick-stand",
    name: "Decorative Candlestick Light",
    discount: 80,
    price: 3500,
    description:
      "Traditional decorative candlestick-style lighting for wedding stages",
  },
];

// Lights Options
export const lightsOptions = [
  {
    id: "light-1",
    name: "Basic LED Kit",
    mrp: 700,
    discount: 29,
    price: applyDiscount(700, 29),
    description: "Portable 3-point LED setup",
  },
  {
    id: "light-2",
    name: "Softbox Kit",
    mrp: 1200,
    discount: 17,
    price: applyDiscount(1200, 17),
    description: "Continuous soft light setup",
  },
  {
    id: "light-3",
    name: "RGB LED Bars",
    mrp: 1800,
    discount: 20,
    price: applyDiscount(1800, 20),
    description: "Colorful mood lighting for effects",
  },
  {
    id: "light-4",
    name: "Aputure Nova P300c",
    mrp: 3500,
    discount: 14,
    price: applyDiscount(3500, 14),
    description: "RGBWW panel for film sets",
  },
  {
    id: "light-5",
    name: "Astera Titan Tubes",
    mrp: 5000,
    discount: 11,
    price: applyDiscount(5000, 11),
    description: "Wireless RGB tubes for creative use",
  },
  {
    id: "light-6",
    name: "Arri SkyPanel S60-C",
    mrp: 7000,
    discount: 17,
    price: applyDiscount(7000, 17),
    description: "High-end cinema light",
  },
];

// Streaming Rig Options
export const streamingRigOptions = [
  {
    id: "stream-1",
    name: "Basic DSLR Stream Kit",
    mrp: 3000,
    discount: 17,
    price: applyDiscount(3000, 17),
    description: "DSLR, capture card, mic",
  },
  {
    id: "stream-2",
    name: "ATEM Mini Setup",
    mrp: 4000,
    discount: 14,
    price: applyDiscount(4000, 14),
    description: "Multi-cam basic switcher setup",
  },
  {
    id: "stream-3",
    name: "OBS Studio PC Rig",
    mrp: 6000,
    discount: 17,
    price: applyDiscount(6000, 17),
    description: "Powerful PC, cameras, audio interface",
  },
  {
    id: "stream-4",
    name: "Blackmagic Web Presenter",
    mrp: 7500,
    discount: 13,
    price: applyDiscount(7500, 13),
    description: "Pro encoder with HDMI/SDI input",
  },
  {
    id: "stream-5",
    name: "ATEM Mini Extreme ISO",
    mrp: 9500,
    discount: 12,
    price: applyDiscount(9500, 12),
    description: "Advanced 8-input stream rig",
  },
  {
    id: "stream-6",
    name: "Cinema Live Rig",
    mrp: 14000,
    discount: 14,
    price: applyDiscount(14000, 14),
    description: "Cinema cameras + streaming encoder + audio desk",
  },
];

// Camera Options
export const cameraOptions = [
  {
    id: "dslr-basic",
    name: "DSLR Basic",
    mrp: 3000,
    discount: 33,
    price: applyDiscount(3000, 33),
    description: "Canon EOS 90D, Nikon D7500",
  },
  {
    id: "dslr-pro",
    name: "DSLR Professional",
    mrp: 6000,
    discount: 33,
    price: applyDiscount(6000, 33),
    description: "Canon 5D Mark IV, Nikon D850",
  },
  {
    id: "mirrorless-basic",
    name: "Mirrorless Basic",
    mrp: 4500,
    discount: 33,
    price: applyDiscount(4500, 33),
    description: "Sony A7III, Canon R6",
  },
  {
    id: "mirrorless-pro",
    name: "Mirrorless Professional",
    mrp: 9000,
    discount: 33,
    price: applyDiscount(9000, 33),
    description: "Sony A7R V, Canon R5",
  },
  {
    id: "cinema-basic",
    name: "Cinema Basic",
    mrp: 12000,
    discount: 33,
    price: applyDiscount(12000, 33),
    description: "BlackMagic 6K, Sony FX3",
  },
  {
    id: "cinema-pro",
    name: "Cinema Professional",
    mrp: 22500,
    discount: 33,
    price: applyDiscount(22500, 33),
    description: "RED Komodo, ARRI Alexa Mini",
  },
];

// Professional camera models
export const cameraModels = [
  { value: "any-camera", label: "Any Camera (Default)", multiplier: 1.0 },
  { value: "canon-r5", label: "Canon R5", multiplier: 1.3 },
  { value: "canon-r6", label: "Canon R6", multiplier: 1.2 },
  { value: "sony-a7iii", label: "Sony A7III", multiplier: 1.1 },
  { value: "sony-a7iv", label: "Sony A7IV", multiplier: 1.25 },
  { value: "sony-fx3", label: "Sony FX3", multiplier: 1.4 },
  { value: "nikon-z6", label: "Nikon Z6", multiplier: 1.15 },
  { value: "nikon-z9", label: "Nikon Z9", multiplier: 1.35 },
  { value: "blackmagic-6k", label: "BlackMagic 6K", multiplier: 1.3 },
  { value: "red-komodo", label: "RED Komodo", multiplier: 1.5 },
  { value: "arri-alexa", label: "ARRI Alexa Mini", multiplier: 1.6 },
];

// video catagory
export const videoCategory = [
  {
    id: "standard",
    name: "Standard",
    mrp: 12000,
    discount: 100,
    parMin: 50,
    price: 10000,
    icon: <Film className="h-6 w-6 text-orange-600" />,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    mrp: 10000,
    discount: 30,
    parMin: 80,
    price: 10000,
    icon: <Clapperboard className="h-6 w-6 text-orange-600" />,
  },
  {
    id: "premiumCinematic",
    name: "Premium Cinematic",
    mrp: 50000,
    discount: 50,
    parMin: 100,
    price: 15000,
    icon: <Clapperboard className="h-6 w-6 text-orange-600" />,
  },
];
// Video quality options
export const videoQualityOptions = [
  {
    id: "720p",
    label: "720p",
    discount: 100,
    price: 3000,
    icon: <Tv2 className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "1080p",
    label: "1080p",
    discount: 50,
    price: 5000,
    icon: <Monitor className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "4k",
    label: "4K",
    mrp: 30000,
    discount: 60,
    price: 8000,
    icon: <Tv className="h-5 w-5 text-orange-400" />,
  },
];

// Deliverables options for photos

export const photoPackages = [
  {
    id: "pendrive",
    label: "Pendrive",
    mrp: 1000,
    discount: 50,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <Usb className="h-5 w-5 text-cyan-600" />,
    desc: "All photo & video files stored in a USB",
  },
  {
    id: "edited-photos",
    label: "Edited Photos (300-500)",
    mrp: 10000,
    discount: 50,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <ImageIcon className="h-5 w-5 text-cyan-600" />,
    desc: "150-250 high-resolution edited photos",
  },
  {
    id: "raw-photos",
    label: "Raw Photos (All)",
    mrp: 6000,
    discount: 100,
    price: 6000,
    icon: <ImageIcon className="h-5 w-5 text-cyan-600" />,
    desc: "All unedited raw photo files",
  },

  {
    id: "wall-frame",
    label: "Wall Frame (Large Size)",
    mrp: 5000,
    discount: 60,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <PictureInPicture className="h-5 w-5 text-cyan-600" />,
    desc: "Large framed photo for wall display",
  },
];

// Enhanced album options with multiple selection
export const albumOptions = [
  {
    id: "digital-basic",
    label: "Digital(Basic)",
    desc: "Online gallery with downloads",
    discount: 100,
    price: 2000,
  },
  // {
  //   id: "digital-premium",
  //   label: "Digital(Premium)",
  //   desc: "Gallery + slideshow",
  //   mrp: 3000,
  //   discount: 33,
  //   get price() {
  //     return applyDiscount(this.mrp, this.discount);
  //   },
  // },
  {
    id: "printed-standard",
    label: "Printed(Standard)",
    desc: "50 pages, 8x10 matte",
    mrp: 9000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "printed-premium",
    label: "Printed(Premium)",
    desc: "100 pages, 12x12 glossy",
    mrp: 20000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "printed-luxury",
    label: "Printed(Luxury)",
    desc: "150 pages, 14x14 leather",
    mrp: 30000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  // {
  //   id: "canvas-prints",
  //   label: "Canvas Prints (Set of 5)",
  //   desc: "Professional canvas shots",
  //   mrp: 10000,
  //   discount: 33,
  //   get price() {
  //     return applyDiscount(this.mrp, this.discount);
  //   },
  // },
];

// Drone options (Rural Area Pricing)
export const droneOptions = [
  {
    id: "drone-inspire3",
    label: "DJI Inspire 3",
    desc: "Professional 8K cinema drone with dual operator support for high-end productions",
    mrp: 4000,
    discount: 100,
    price: 0, // 100% off (free / demo use)
  },
  {
    id: "drone-mini4",
    label: "DJI Mini 4 Pro",
    desc: "Lightweight 4K drone ideal for quick aerial shots and close venue flyovers",
    mrp: 6000,
    discount: 30,
    price: 6000, // 15% off
  },
  {
    id: "drone-air3",
    label: "DJI Air 3",
    desc: "Dual-camera system (wide + telephoto), perfect for cinematic wedding visuals",
    mrp: 9000,
    discount: 30,
    price: 9000, // 20% off
  },
  {
    id: "drone-mavic3pro",
    label: "DJI Mavic 3 Pro",
    desc: "Flagship 5.1K drone with triple cameras for premium aerial cinematography",
    mrp: 12000,
    discount: 30,
    price: 12000, // 25% off
  },
  {
    id: "drone-mini3",
    label: "DJI Mini 3",
    desc: "Compact and affordable 4K drone ideal for beginner wedding videographers",
    mrp: 15000,
    discount: 30,
    price: 15000, // 10% off
  },
];

// LED Screen options
export const ledScreenOptions = [
  {
    id: "led-32",
    label: "LED Screen (32-inch)",
    desc: "HD display, suitable for small venue previews or demo setups",
    mrp: 5000,
    discount: 100,
    price: 0, // 100% off (Free)
  },
  {
    id: "led-43",
    label: "LED Screen (43-inch)",
    desc: "Full HD, ideal for medium-size setups",
    mrp: 9000,
    discount: 25,
    price: 9000, // 25% off
  },
  {
    id: "led-55",
    label: "LED Screen (55-inch)",
    desc: "4K UHD, perfect for large hall displays",
    mrp: 12000,
    discount: 25,
    price: 12000, // 25% off
  },
  {
    id: "led-65",
    label: "LED Screen (65-inch)",
    desc: "4K UHD with premium color accuracy",
    mrp: 15000,
    discount: 30,
    price: 15000, // 30% off
  },
  {
    id: "led-75",
    label: "LED Screen (75-inch)",
    desc: "Ultra HD, ideal for large-scale event displays",
    mrp: 20000,
    discount: 30,
    price: 20000, // 30% off
  },
];

export const extraVideos = [
  {
    id: "teaser",
    label: "Teaser Video",
    desc: "1–2 min cinematic preview",
    mrp: 7500,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <Clapperboard className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "highlight",
    label: "Highlight Video",
    desc: "2–4 min event recap",
    mrp: 10000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <Film className="h-5 w-5 text-orange-400" />,
  },
];

export const servicesPreWedding = [
  {
    id: "photography",
    name: "Photography",
    discount: 30,
    price: 6000,
    icon: Camera,
    description: "Professional event photography",
    fullDescription:
      "Our photography service captures every cherished moment of your event with an artistic and natural approach. From candid interactions to formal portraits, we document the emotion, atmosphere and details so you can relive your special day for years to come.", // based on photography/videography overview :contentReference[oaicite:0]{index=0}
    required: [camera, cameraLights, operator],
    imageurl: "/servicesImage/camera.jpg",
  },
  {
    id: "videography",
    name: "Videography",
    discount: 60,
    price: 12000,
    icon: Video,
    description: "High-quality video recording",
    fullDescription:
      "Our videography service combines professional equipment, skilled operators and creative editing to transform your event into a compelling visual story. Whether it’s speeches, performances or candid moments, we tailor a film that evokes the atmosphere and memories of the day.", // based on event videography definition :contentReference[oaicite:1]{index=1}
    required: [camera, mic, cameraLights, operator],
    imageurl: "/servicesImage/video.jpg",
  },
  {
    id: "drone-coverage",
    name: "Drone Coverage",
    discount: 50,
    price: 5000,
    icon: Video,
    description: "Aerial photography and videography",
    fullDescription:
      "Take your event to new heights with our drone coverage service. A certified operator and advanced drone capture dramatic aerial views, sweeping landscapes and unique perspectives that conventional cameras cannot. Perfect for outdoor venues, large gatherings and adding wow-factor imagery to your memories.",
    required: [drone, droneOperator],
    imageurl: "/servicesImage/drone.jpg",
  },
];

// Enhanced service options with individual pricing
export const serviceOptions = {
  event: [
    ...servicesPreWedding,
    {
      id: "stage-lighting",
      name: "Stage Lighting",
      discount: 60,
      price: 1200,
      icon: Lightbulb,
      description: "Professional stage lighting setup",
      required: [stageLights],
      fullDescription:
        "Our stage lighting service creates a dynamic and immersive atmosphere for your event. With programmable LED systems, lighting rigs and experienced technicians, we enhance the mood, highlight key moments and ensure your venue shines both literally and figuratively.",
      imageurl: "/servicesImage/light.jpg",
    },
    {
      id: "led-screen",
      name: "LED Screen",
      discount: 50,
      price: 4000,
      icon: ScreenShare,
      description: "High-resolution dynamic event display",
      // required: [Laptop, Led],
      imageurl: "/servicesImage/led.jpg",
      fullDescription:
        "Our LED screen service offers crisp, high-definition visual displays that bring your event content to life. From live feeds to custom animations and presentation material, the LED screens provide a bold focal point partner for your speeches, entertainments or brand moments.",
    },
    {
      id: "live-stream",
      name: "Live Stream",
      mrp: 27000,
      discount: 60,
      price: 40000,
      icon: Monitor,
      description: "Real-time event streaming",
      imageurl: "/servicesImage/livestrim.jpg",
      required: [camera, mic, streamingRig, operator],
      fullDescription:
        "Our live streaming service ensures your event reaches remote audiences seamlessly. Using high-quality cameras, audio feeds, streaming rigs and skilled operators, we deliver broadcast-quality live streams to any platform — ensuring every moment is captured and shared as it happens.",
    },
  ],

  cameraman: [
    {
      id: "wedding-photographer",
      name: "Wedding Photographer",
      mrp: 22500,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Camera,
      description: "Specialized wedding photography",
    },
    {
      id: "event-videographer",
      name: "Event Videographer",
      mrp: 27000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Video,
      description: "Professional event videography",
    },
    {
      id: "portrait-photographer",
      name: "Portrait Photographer",
      mrp: 18000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Camera,
      description: "Professional portrait sessions",
    },
    {
      id: "commercial-photographer",
      name: "Commercial Photographer",
      mrp: 33000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Camera,
      description: "Commercial and product photography",
    },
    {
      id: "documentary-filmmaker",
      name: "Documentary Filmmaker",
      mrp: 37500,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Video,
      description: "Documentary style filming",
    },
  ],

  equipment: [
    {
      id: "dslr-camera",
      name: "DSLR Camera Kit",
      mrp: 4500,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Camera,
      description: "Professional DSLR with lenses",
    },
    {
      id: "cinema-camera",
      name: "Cinema Camera",
      mrp: 12000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Video,
      description: "4K cinema camera setup",
    },
    {
      id: "lighting-kit",
      name: "Professional Lighting Kit",
      mrp: 7500,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Lightbulb,
      description: "Complete lighting setup",
    },
    {
      id: "audio-equipment",
      name: "Audio Equipment",
      mrp: 6000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Mic,
      description: "Professional microphones and recorders",
    },
    {
      id: "drone",
      name: "Drone with Operator",
      mrp: 18000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Video,
      description: "Professional drone with certified operator",
    },
    {
      id: "gimbal-stabilizer",
      name: "Gimbal Stabilizer",
      mrp: 3000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Video,
      description: "Professional camera stabilization",
    },
  ],

  editor: [
    {
      id: "basic-editing",
      name: "Basic Video Editing",
      mrp: 7500,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Edit,
      description: "Standard video editing and cuts",
    },
    {
      id: "advanced-editing",
      name: "Advanced Editing",
      mrp: 15000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Edit,
      description: "Advanced editing with effects",
    },
    {
      id: "color-grading",
      name: "Color Grading",
      mrp: 9000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Edit,
      description: "Professional color correction",
    },
    {
      id: "motion-graphics",
      name: "Motion Graphics",
      mrp: 18000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Edit,
      description: "Custom animations and graphics",
    },
    {
      id: "sound-design",
      name: "Sound Design",
      mrp: 12000,
      discount: 33,
      get price() {
        return applyDiscount(this.mrp, this.discount);
      },
      icon: Mic,
      description: "Professional audio post-production",
    },
  ],
};

// wedding outdoor option
export const preWeddingOptions = [
  {
    id: "outdoor-90min",
    label: "Outdoor Shoot (90 Minutes)",
    desc: "1.5-hour outdoor session at one location",
    discount: 100,
    price: 1000,
  },
  {
    id: "outdoor-standard",
    label: "Outdoor Shoot (Standard)",
    desc: "3-hour outdoor session with multiple locations",
    discount: 60,
    price: 1500,
  },
  {
    id: "outdoor-extended",
    label: "Outdoor Shoot (Extended)",
    desc: "6-hour session with multiple locations and professional editing",
    discount: 60,
    price: 2000,
  },
  {
    id: "outdoor-full-day",
    label: "Outdoor Shoot (Full Day)",
    desc: "Full-day coverage with multiple locations, assistants, and advanced edits",
    discount: 60,
    price: 5000,
  },
  {
    id: "outdoor-2-days",
    label: "Outdoor Shoot (2 Days)",
    desc: "One and a half days of outdoor coverage across multiple locations",
    mrp: 9000,
    discount: 70,
    price: 9000,
  },
  {
    id: "outdoor-4-5-days",
    label: "Outdoor Shoot (3-5 Days)",
    desc: "Two full days of outdoor coverage with professional team support",
    discount: 60,
    price: 15000,
  },
];

export const getEventTypeOptions = (category) => {
  switch (category) {
    case "cameraman":
      return [
        { value: "basic", label: "Basic Cameraman" },
        { value: "moderate", label: "Moderate Cameraman" },
        { value: "experienced", label: "Experienced Cameraman" },
      ];
    case "equipment":
      return [
        { value: "basic", label: "Basic Equipment" },
        { value: "professional", label: "Professional Equipment" },
        { value: "premium", label: "Premium Equipment" },
      ];
    case "editor":
      return [
        { value: "basic", label: "Basic Editor" },
        { value: "moderate", label: "Moderate Editor" },
        { value: "experienced", label: "Experienced Editor" },
      ];
    case "event":
      return [
        { value: "engagementCeremony", label: "Engagement Ceremony" },
        { value: "preWedding", label: "Pre-Wedding" },
        { value: "wedding", label: "Wedding" },
        { value: "reception", label: "Reception" },
        { value: "babyPhotography", label: "Baby Photography" },
        { value: "riceCeremony", label: "Rice Ceremony" },
        { value: "birthday", label: "Birthday" },
        { value: "corporate", label: "Corporate Event" },
        { value: "other", label: "Other" },
      ];

    default:
      return [];
  }
};



const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
let eventFirstDate=formattedToday;
export const logBookingData = (bookingData) => {
  eventFirstDate=bookingData.details.eventTimes[0].eventDate;
};


export function PriceHandeler(basePrice, discount, reqPackage, areaType) {
  // Calculate remaining days

  const diffTime = new Date(eventFirstDate).getTime() - new Date(formattedToday).getTime();
  const leftDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Add bonus discount based on days left
  let moreDiscount=0;
  if (leftDays > 30) moreDiscount += 3;
  else if (leftDays > 20) moreDiscount += 2;
  else if (leftDays > 10) moreDiscount += 1;

  let mrp = 0;
  let finalPrice = 0;
  if (discount == 100) {
    mrp = basePrice;
    return { mrp, discount, finalPrice };
  }

  let packageMul = 1;
  let baseOnArea = 1;
  switch (reqPackage) {
    case "event-premium":
      packageMul = 1.2;
      break;
    case "event-luxury":
      packageMul = 1.6;
      break;
    case "event-basic":
      packageMul = 1;
      break;
    default:
      packageMul = 1;
  }
  switch (areaType) {
    case "semi-urban":
      baseOnArea = 1.2;
      break;
    case "urban":
      baseOnArea = 1.3;
      break;
    case "rural":
    default:
      baseOnArea = 1;
  }
  finalPrice = Math.round(basePrice * packageMul * baseOnArea);
  finalPrice=Math.round(finalPrice*(100 - moreDiscount)/100);
  mrp = Math.round((finalPrice * 100) / (100 - discount));
  discount+=moreDiscount;
  return { mrp, discount, finalPrice };
}

function getShortName(name) {
  return name.trim().substring(0, 3).toUpperCase();
}

function getRoleShort(role) {
  const map = {
    "Production Team": "PT",
    Cameraman: "CM",
    "Video Editor": "VE",
    "Equipment Partner": "EP",
    "Album Designer": "ALD",
    "Experienced Professional": "EXP",
    "Moderate Experience": "MOD",
    Fresher: "FRE",
    "Photography Specialist": "PHO",
    "Videography Specialist": "VID",
    "Drone Operator": "DRO",
    "Lighting Technician": "LIG",
    "Live Stream Technician": "LSO",
    Client: "CLt",
    team: "TM",
    admin: "A",
    operator: "O",
  };

  return map[role] || role;
}

export function generateMemberClientId(name, role) {
  const today = new Date();

  const nameShort = getShortName(name);
  const roleShort = getRoleShort(role);

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");

  return `${nameShort}${roleShort}-${month}-${hh}${mm}`;
}
