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

// Drone Options
export const droneOptions = [
  {
    id: "drone-1",
    name: "DJI Mini 3",
    mrp: 2000,
    discount: 25,
    price: applyDiscount(2000, 25),
    description: "Compact, beginner-friendly 4K drone",
  },
  {
    id: "drone-2",
    name: "DJI Air 2S",
    mrp: 3000,
    discount: 17,
    price: applyDiscount(3000, 17),
    description: "1-inch sensor, great for prosumers",
  },
  {
    id: "drone-3",
    name: "DJI Mavic 3",
    mrp: 5000,
    discount: 20,
    price: applyDiscount(5000, 20),
    description: "Hasselblad camera, cinematic quality",
  },
  {
    id: "drone-4",
    name: "DJI Inspire 2",
    mrp: 7500,
    discount: 25,
    price: applyDiscount(7500, 25),
    description: "Pro drone with dual-operator support",
  },
  {
    id: "drone-5",
    name: "DJI Matrice 30",
    mrp: 11000,
    discount: 18,
    price: applyDiscount(11000, 18),
    description: "Industrial-grade drone with advanced sensors",
  },
  {
    id: "drone-6",
    name: "Freefly Alta X",
    mrp: 18000,
    discount: 17,
    price: applyDiscount(18000, 17),
    description: "Heavy-lift drone for cinema cameras",
  },
];

// Light Options
export const lightOptions = [
  {
    id: "photography-umbrella",
    name: "Photography Lighting Umbrella",
    mrp: 0,
    discount:100,
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
    price:  2000,
    description:
      "Ambient uplights that create colorful accents on walls, drapes, and stage décor",
  },
  {
    id: "short-wedding-led",
    name: "Decorative LED Light",
    discount:80,
    price: 2200,
    description:
      "Compact decorative LED lights designed for wedding stage ambience",
  },
  {
    id: "flower-stand-lighted",
    name: "Lighted Flower Stand",
    discount:60,
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
    price: 20000,
    icon: <Film className="h-6 w-6 text-orange-600" />,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    mrp: 30000,
    discount: 30,
    parMin: 80,
    price:20000,
    icon: <Clapperboard className="h-6 w-6 text-orange-600" />,
  },
  {
    id: "premiumCinematic",
    name: "Premium Cinematic",
    mrp: 50000,
    discount: 50,
    parMin: 100,
    price: applyDiscount(50000, 50),
    icon: <Clapperboard className="h-6 w-6 text-orange-600" />,
  },
];
// Video quality options
export const videoQualityOptions = [
  {
    id: "1080p",
    label: "1080p",
    discount: 100,
    price: 20000,
    icon: <Monitor className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "4k",
    label: "4K",
    mrp: 30000,
    discount: 50,
    price: applyDiscount(30000, 50),
    icon: <Tv className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "8k",
    label: "8K",
    mrp: 40000,
    discount: 50,
    price: applyDiscount(40000, 50),
    icon: <Tv2 className="h-5 w-5 text-orange-400" />,
  },
];

// Deliverables options for photos

export const photoPackages = [
    {
    id: "pendrive",
    label: "Pendrive",
    mrp: 6000,
    discount: 50,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
    icon: <Usb className="h-5 w-5 text-cyan-600" />,
    desc: "All photo & video files stored in a USB",
  },
  {
    id: "edited-photos",
    label: "Edited Photos (200-500)",
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
    price:6000,
    icon: <ImageIcon className="h-5 w-5 text-cyan-600" />,
    desc: "All unedited raw photo files",
  },

  {
    id: "wall-frame",
    label: "Wall Frame (Large Size)",
    mrp: 20000,
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
    price:2000,
  },
  {
    id: "digital-premium",
    label: "Digital(Premium)",
    desc: "Gallery + slideshow",
    mrp: 3000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "printed-standard",
    label: "Printed(Standard)",
    desc: "50 pages, 8x10 matte",
    mrp: 12000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "printed-premium",
    label: "Printed(Premium)",
    desc: "100 pages, 12x12 glossy",
    mrp: 22500,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "printed-luxury",
    label: "Printed(Luxury)",
    desc: "150 pages, 14x14 leather",
    mrp: 37500,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
  },
  {
    id: "canvas-prints",
    label: "Canvas Prints (Set of 5)",
    desc: "Professional canvas shots",
    mrp: 18000,
    discount: 33,
    get price() {
      return applyDiscount(this.mrp, this.discount);
    },
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
    desc: "5–7 min event recap",
    mrp: 12000,
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
    price:6000,
    icon: Camera,
    description: "Professional event photography",
    required: [camera, cameraLights, operator],
  },
  {
    id: "videography",
    name: "Videography",
    discount: 60,
    price:12000,
    icon: Video,
    description: "High-quality video recording",
    required: [camera, mic, cameraLights, operator],
  },
  {
    id: "drone-coverage",
    name: "Drone Coverage",
    discount: 50,
    price:16000,
    icon: Video,
    description: "Aerial photography and videography",
    required: [drone, droneOperator],
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
      price:8000,
      icon: Lightbulb,
      description: "Professional stage lighting setup",
      required: [stageLights],
    },
    {
      id: "led-screen",
      name: "LED Screen",
      discount: 50,
      price:12000,
      icon: ScreenShare,
      description: "High-resolution dynamic event display",
      // required: [Laptop, Led],
    },
    {
      id: "live-streaming",
      name: "Live Streaming",
      mrp: 27000,
      discount: 60,
      price:40000,
      icon: Monitor,
      description: "Real-time event streaming",
      required: [camera, mic, streamingRig, operator],
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
    discount: 40,
    price:10000,
  },
  {
    id: "outdoor-standard",
    label: "Outdoor Shoot (Standard)",
    desc: "3-hour outdoor session with multiple locations",
    discount: 60,
    price:15000,
  },
  {
    id: "outdoor-extended",
    label: "Outdoor Shoot (Extended)",
    desc: "6-hour session with multiple locations and professional editing",
    discount: 60,
   price:20000,
  },
  {
    id: "outdoor-full-day",
    label: "Outdoor Shoot (Full Day)",
    desc: "Full-day coverage with multiple locations, assistants, and advanced edits",
    discount: 60,
    price:25000,
  },
  {
    id: "outdoor-1-5-days",
    label: "Outdoor Shoot (1.5 Days)",
    desc: "One and a half days of outdoor coverage across multiple locations",
    mrp: 75000,
    discount: 60,
    price:30000,
  },
  {
    id: "outdoor-2-days",
    label: "Outdoor Shoot (2 Days)",
    desc: "Two full days of outdoor coverage with professional team support",
    discount: 60,
    price:40000
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



export function PriceHandeler(basePrice, discount, reqPackage, areaType) {
  let mrp =0;
  let finalPrice =0;
  if(discount==100){
    mrp=basePrice;
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
    default:
      packageMul = 1;
 
    }
  switch (areaType) {
    case "semi-urban":
      baseOnArea = 1.3;
      break;
    case "urban":
      baseOnArea = 1.4;
      break;
    case "rural":
    default:
      baseOnArea = 1;
  }
   finalPrice = Math.round(  basePrice * packageMul * baseOnArea);
   mrp = Math.round((finalPrice * 100) / (100 - discount));
  return { mrp, discount, finalPrice };
}









// for join us from 

import {
  Users,
  Award,
  BookOpen,
  TrendingUp,
} from "lucide-react"; 

export   const skillOptions = {
    cameraman: [
      { id: "wedding-photography", label: "Wedding Photography" },
      { id: "event-videography", label: "Event Videography" },
      { id: "commercial-shoots", label: "Commercial Shoots" },
      { id: "drone-operation", label: "Drone Operation" },
      { id: "live-streaming", label: "Live Streaming" },
      { id: "portrait-photography", label: "Portrait Photography" },
      { id: "product-photography", label: "Product Photography" },
      { id: "fashion-photography", label: "Fashion Photography" },
      { id: "documentary-filming", label: "Documentary Filming" },
      { id: "music-video-production", label: "Music Video Production" },
      { id: "corporate-videography", label: "Corporate Videography" },
      { id: "sports-photography", label: "Sports Photography" },
      { id: "aerial-cinematography", label: "Aerial Cinematography" },
      { id: "underwater-photography", label: "Underwater Photography" },
      { id: "time-lapse-photography", label: "Time-lapse Photography" },
      { id: "macro-photography", label: "Macro Photography" },
    ],
    editor: [
      { id: "premiere-pro", label: "Adobe Premiere Pro" },
      { id: "after-effects", label: "After Effects" },
      { id: "final-cut-pro", label: "Final Cut Pro" },
      { id: "color-grading", label: "Color Grading" },
      { id: "motion-graphics", label: "Motion Graphics" },
      { id: "audio-editing", label: "Audio Editing" },
      { id: "davinci-resolve", label: "DaVinci Resolve" },
      { id: "avid-media-composer", label: "Avid Media Composer" },
      { id: "photoshop", label: "Adobe Photoshop" },
      { id: "illustrator", label: "Adobe Illustrator" },
      { id: "cinema-4d", label: "Cinema 4D" },
      { id: "blender", label: "Blender" },
      { id: "sound-design", label: "Sound Design" },
      { id: "vfx-compositing", label: "VFX Compositing" },
      { id: "animation", label: "2D/3D Animation" },
      { id: "subtitle-editing", label: "Subtitle Editing" },
    ],
    equipment: [
      { id: "camera-maintenance", label: "Camera Maintenance" },
      { id: "lighting-setup", label: "Lighting Setup" },
      { id: "audio-equipment", label: "Audio Equipment" },
      { id: "drone-equipment", label: "Drone Equipment" },
      { id: "rental-management", label: "Rental Management" },
      { id: "technical-support", label: "Technical Support" },
      { id: "lens-calibration", label: "Lens Calibration" },
      { id: "gimbal-operation", label: "Gimbal Operation" },
      { id: "live-streaming-setup", label: "Live Streaming Setup" },
      { id: "wireless-systems", label: "Wireless Systems" },
      { id: "backup-solutions", label: "Backup Solutions" },
      { id: "color-monitoring", label: "Color Monitoring" },
      { id: "power-management", label: "Power Management" },
      { id: "rigging-systems", label: "Rigging Systems" },
      { id: "transport-logistics", label: "Transport & Logistics" },
      { id: "insurance-handling", label: "Insurance Handling" },
    ],
    team: [
      { id: "project-management", label: "Project Management" },
      { id: "team-coordination", label: "Team Coordination" },
      { id: "event-planning", label: "Event Planning" },
      { id: "client-communication", label: "Client Communication" },
      { id: "budget-management", label: "Budget Management" },
      { id: "timeline-planning", label: "Timeline Planning" },
      { id: "quality-control", label: "Quality Control" },
      { id: "risk-management", label: "Risk Management" },
      { id: "vendor-coordination", label: "Vendor Coordination" },
      { id: "logistics-planning", label: "Logistics Planning" },
      { id: "crew-scheduling", label: "Crew Scheduling" },
      { id: "equipment-allocation", label: "Equipment Allocation" },
      { id: "safety-compliance", label: "Safety Compliance" },
      { id: "post-production-coordination", label: "Post-Production Coordination" },
      { id: "client-presentation", label: "Client Presentation" },
      { id: "team-training", label: "Team Training" },
    ],
  };


export  const roles = [
      {
    id: "team",
    icon: Users,
    title: "Production Team",
    description: "Collaborate with a full team for large-scale events",
  },
    {
      id: "cameraman",
      icon: Camera,
      title: "Cameraman",
      description: "Professional videographers and photographers",
    },
    {
      id: "editor",
      icon: Edit,
      title: "Video Editor",
      description: "Skilled post-production specialists",
    },
    {
      id: "equipment",
      icon: Video,
      title: "Equipment Partner",
      description: "Rent your professional gear to our clients",
    },
  ];

export   const experienceLevels = [
    {
      id: "experienced",
      title: "Experienced Professional",
      description: "Join our team with your existing skills",
      icon: Award,
    },
    {
      id: "moderate",
      title: "Moderate Experience",
      description: "Some experience with skill enhancement program",
      icon: TrendingUp,
    },
    {
      id: "fresher",
      title: "Fresher / New Graduate",
      description: "Start your career with our training program",
      icon: BookOpen,
    },
  ];


export const experiencedRequirements = {
  cameraman: [
    "3+ years of professional experience",
    "Proficiency with DSLR/Mirrorless cameras",
    "Knowledge of lighting and composition",
    "Experience with weddings, events, or commercials",
    "Own professional equipment (preferred)",
    "Reliable transportation",
    "Portfolio of previous work",
    "Client testimonials or references",
  ],
  editor: [
    "2+ years of video editing experience",
    "Proficiency in Adobe Premiere Pro/Final Cut Pro",
    "Color grading and audio mixing skills",
    "Motion graphics experience (After Effects)",
    "Fast turnaround capabilities",
    "Strong attention to detail",
    "Portfolio of edited projects",
    "Knowledge of various video formats",
  ],
  equipment: [
    "Professional-grade equipment inventory",
    "Well-maintained gear with documentation",
    "Insurance coverage for equipment",
    "Flexible rental availability",
    "Local pickup/delivery capability",
    "Competitive rental rates",
    "Equipment maintenance knowledge",
    "Business registration (preferred)",
  ],
  team: [
    "5+ years of combined team experience",
    "Specialized roles (cameramen, editors, coordinators)",
    "Proven track record with large-scale events",
    "Strong communication and coordination skills",
    "Ability to manage multiple shoots simultaneously",
    "Availability for travel and long-duration projects",
    "Comprehensive portfolio of team projects",
    "Client references showcasing teamwork efficiency",
  ],
};


export  const moderateRequirements = {
    cameraman: [
      "1-2 years of basic experience",
      "Basic knowledge of camera operations",
      "Some experience with events or personal projects",
      "Willingness to learn advanced techniques",
      "2-week skill enhancement program",
      "Mentorship from senior cameramen",
      "Portfolio development assistance",
      "Equipment training provided",
    ],
    editor: [
      "6 months to 1 year editing experience",
      "Basic knowledge of editing software",
      "Some personal or small project experience",
      "Eagerness to learn professional workflows",
      "2-week intensive training program",
      "Advanced software training",
      "Portfolio building assistance",
      "Industry standard workflow training",
    ],
    equipment: [
      "Some equipment or technical background",
      "Basic understanding of video gear",
      "Interest in equipment rental business",
      "Willingness to learn maintenance",
      "2-week equipment training program",
      "Business development guidance",
      "Partnership development support",
      "Marketing assistance provided",
    ],
    team: [
      "2-3 years of team coordination experience",
      "Basic project management skills",
      "Some experience leading small groups",
      "Willingness to learn advanced team management",
      "3-week team leadership training program",
      "Mentorship from senior production managers",
      "Project coordination practice",
      "Communication skills enhancement",
    ],
  };
export const fresherPrograms = {
  cameraman: [
    "6-week intensive camera training program",
    "Hands-on experience with professional equipment",
    "Mentorship from experienced cinematographers",
    "Portfolio development assistance",
    "Real wedding/event shooting experience",
    "Certification in video production",
    "2-month unpaid internship",
    "Guaranteed job placement after completion",
  ],
  editor: [
    "4-week video editing bootcamp",
    "Training in Adobe Creative Suite",
    "Color grading and motion graphics workshops",
    "Real project experience with client work",
    "Industry-standard workflow training",
    "Portfolio creation assistance",
    "2-month unpaid internship",
    "Job placement assistance",
  ],
  equipment: [
    "3-week equipment handling training",
    "Equipment maintenance and care workshops",
    "Business development support",
    "Insurance and legal guidance",
    "Marketing assistance for equipment rental",
    "Partnership development program",
    "2-month unpaid internship",
    "Revenue optimization strategies",
  ],
  team: [
    "4-week collaborative teamwork program",
    "Leadership and coordination workshops",
    "Hands-on experience with live event projects",
    "Mentorship from senior production teams",
    "Training in project and people management",
    "Certification in team management & collaboration",
    "2-month unpaid group internship",
    "Guaranteed placement in large-scale event projects",
  ],
};


export const benefits = {
  experienced: {
    cameraman: [
      "Competitive daily rates: ₹8,000-25,000/day",
      "Performance bonuses up to ₹50,000/month",
      "Flexible scheduling and project selection",
      "Equipment provided for major projects",
      "Professional development workshops",
      "Regular work assignments guaranteed",
      "Health insurance coverage",
      "Annual equipment upgrade allowance",
    ],
    editor: [
      "Hourly rates: ₹2,000-6,000/hour",
      "Project completion bonuses",
      "Work-from-home flexibility",
      "Latest software licenses provided",
      "Skill development courses",
      "Priority project assignments",
      "Health and wellness benefits",
      "Annual performance incentives",
    ],
    equipment: [
      "Revenue sharing: 60-70% of rental income",
      "Equipment insurance coverage",
      "Marketing and promotion support",
      "Priority booking system",
      "Maintenance cost sharing",
      "Business development assistance",
      "Legal and contract support",
      "Expansion funding opportunities",
    ],
    team: [
      "Project-based compensation: ₹50,000-2,00,000/project",
      "Performance bonuses for large events",
      "Priority allocation for premium clients",
      "Dedicated project management support",
      "Team-building and leadership training",
      "Health and group insurance plans",
      "Annual international project opportunities",
      "Profit-sharing on long-term collaborations",
    ],
  },
  moderate: {
    cameraman: [
      "Starting rates: ₹5,000-12,000/day",
      "Free 2-week skill enhancement program",
      "Mentorship from senior professionals",
      "Equipment training and access",
      "Performance-based rate increases",
      "Career development pathway",
      "Health insurance after 3 months",
      "Guaranteed rate increase after 6 months",
    ],
    editor: [
      "Starting rates: ₹1,500-3,500/hour",
      "Free 2-week intensive training",
      "Advanced software training",
      "Portfolio development support",
      "Performance-based bonuses",
      "Skill certification programs",
      "Work-from-home options",
      "Rate progression plan",
    ],
    equipment: [
      "Revenue sharing: 50-60% of rental income",
      "Free 2-week equipment training",
      "Business development support",
      "Marketing assistance",
      "Equipment upgrade guidance",
      "Partnership development",
      "Insurance guidance",
      "Growth funding opportunities",
    ],
    team: [
      "Starting project rates: ₹30,000-80,000/project",
      "Free 3-week teamwork and coordination training",
      "Mentorship from senior production teams",
      "Access to advanced project management tools",
      "Career progression to lead positions",
      "Health insurance after 6 months",
      "Guaranteed project allocation after training",
      "Performance-linked bonuses",
    ],
  },
  fresher: {
    cameraman: [
      "Free 6-week comprehensive training",
      "Mentorship from industry professionals",
      "2-month unpaid internship with real projects",
      "Starting salary: ₹4,000-8,000/day after internship",
      "Career growth path to senior positions",
      "Certification upon completion",
      "Equipment training and access",
      "Job guarantee after successful completion",
    ],
    editor: [
      "Free 4-week intensive bootcamp",
      "Software training and licenses",
      "2-month unpaid internship with portfolio building",
      "Starting rate: ₹1,000-2,500/hour after internship",
      "Mentorship and skill development",
      "Industry networking opportunities",
      "Certification in video editing",
      "Guaranteed placement in our team",
    ],
    equipment: [
      "Free 3-week business training program",
      "Equipment handling and maintenance training",
      "2-month unpaid business development internship",
      "Partnership opportunities after completion",
      "Business setup assistance",
      "Insurance and legal guidance",
      "Marketing support and promotion",
      "Revenue sharing opportunities",
    ],
    team: [
      "Free 4-week collaborative training program",
      "Hands-on internship with live events",
      "Mentorship from senior production leads",
      "Starting stipend: ₹15,000-30,000/project after internship",
      "Certification in teamwork and production management",
      "Guaranteed placement in collaborative projects",
      "Career growth into specialized team roles",
      "Exposure to large-scale event production",
    ],
  },
};


export  const basicConditions = {
    experienced: [
      "Must pass practical skills assessment",
      "Provide portfolio and client references",
      "Own reliable transportation",
      "Professional communication skills",
      "Flexible schedule availability",
      "Commitment to quality standards",
      "Professional appearance and conduct",
      "Valid ID and business documentation",
    ],
    moderate: [
      "Complete 2-week skill enhancement program",
      "Pass practical and theoretical assessments",
      "Show willingness to learn and improve",
      "Maintain professional attitude",
      "Commit to 6-month minimum with company",
      "Attend all training sessions",
      "Accept mentorship and feedback",
      "Valid ID and basic documentation",
    ],
    fresher: [
      "Complete full training program (no dropouts)",
      "Maintain 90%+ attendance during training",
      "Successfully complete 2-month unpaid internship",
      "Pass final skills assessment",
      "Commit to 1-year minimum with company after training",
      "Professional attitude and eagerness to learn",
      "Basic computer and communication skills",
      "Valid ID and educational certificates",
    ],
  };

















export const requiredServices = {
  photoservice: {
    photoTypes: ["a", "b", "c"],
    albumTypes: ["x", "y", "z"],
  },
  videography: {
    videoCategory: "",
    videoType: "standard",
    videoQuality: "1080p",
    durationMinutes: 10,
    extraVideos: [],
  },
};
