export type EventTimeSlot = {
  eventDate: string;
  startTime: string;
  endTime: string;
};

export type PersonRole = {
  eventName: string;
  role: "groom" | "bride" | "birthday-person" | "other" | "babyName";
  name: string;
};

export interface UserType {
  _id: string;             
  userId: string;
  operatorId?: string;     
  memberId?: string;      
  name: string;
  email: string;
  role: "admin" | "operator" | "member";
  password: string;      
  lastLogin: string;      
}
export type AssignedTeam = {
  name: string;
  role: string;
  price: number;
  id?: string;
  createdAt?: string;
  location?: string;
  pincode?: string;
  avatar?: string;
  status?: string;
  rating?: number;
  phone?: string;
  email?: string;
  experience?: string;
  totalProjects?: number;
  projects?: number;
};

export type BookingData = {
  createdAt: string;
  details: {
    category: string;
    package: string;
    name: string;
    email: string;
    phone: string;
    eventType: string;
    pinCode: string;
    location: string;
    dist:string;
    state:string;
    nearArea:string;
    areaType:string,
    forPersons: PersonRole[];
    message: string;
    totalAmount: number; 
    status:string;
    advance:number;
    assignedTeam:AssignedTeam[] | null;
    completedAt:Date | null;
    photoVideoUse: boolean;
    paymentStatus:string;
    eventTimes: { eventDate: string; startTime: string; endTime: string }[];
  };

  selectedService: { id: string; price: number }[];
  requiredServices: {
    photography: {
      photoTypes: { id: string; price: number }[];
      albumTypes: { id: string; price: number }[];
    };

    videography: {
      videoCategory: { id: "classic" | "cinematic" | "standard"; price: number };
      videoQuality: { id: "1080p" | "4k" | "8k" | ""; price: number };
      durationMinutes: number;
      extraVideos: { id: string; price: number }[];
    };

    preWedding: { id: string; price: number }[];
    stageLights: { id: string; price: number }[];
  };
};



export type SelectedServices = {
  photography: boolean;
  videography: boolean;
  weddingOutdoor: boolean;
  droneCoverage: boolean;
  stageLighting: boolean;
  liveStreaming: boolean;
};

export type PhotoService = {
  photoTypes: string[];
  albumTypes: string[];
};

export type VideographyService = {
  videoCategory: string;
  videoType: string;
  videoQuality: string;
  durationMinutes: number;
  extraVideos: string[];
};

export type RequiredServices = {
  photoservice: PhotoService;
  videography: VideographyService;
};

export type PriceInfo = {
  mrp: number;
  discount: number;
  finalPrice: number;
};


export const initialBookingData :BookingData = {
  createdAt: new Date().toISOString(),
  details: {
    category: "event",
    package: "event-premium",
    name: "",
    email: "",
    phone: "",
    eventType: "",
    pinCode: "",
    dist: "",
    state: "",
    nearArea: "",
    areaType: "urban",
    location: "",
    forPersons: [],
    message: "",
    totalAmount: 0,
    advance:0,
    status:"pending",
    paymentStatus:"Panding",
    assignedTeam: [
    { name: "Alice Johnson", role: "Video Editor", price: 12050 },
    { name: "Bob Smith", role: "Camera Operator", price: 2000 },
    { name: "Charlie Brown", role: "Sound Engineer", price: 4000 }
  ],
    completedAt: new Date("2025-09-02T11:22:35.213+00:00"),
    photoVideoUse: true,
    eventTimes: [{ eventDate: "", startTime: "", endTime: "" }],
  },

  requiredServices: {
    photography: {
      photoTypes: [],
      albumTypes: [],
    },
    videography: {
      videoCategory: { id: "standard", price: 0 },
      videoQuality: { id: "1080p", price: 0 },
      durationMinutes: 10,
      extraVideos: [],
    },
    preWedding: [],
    stageLights: [],
  },
  selectedService: [],
};



    // Helper function to calculate time difference in hours
   export const calculateDuration = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date();
    const end = new Date();
    start.setHours(startHour, startMinute, 0);
    end.setHours(endHour, endMinute, 0);

    if (end <= start) end.setDate(end.getDate() + 1);

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return parseFloat(duration.toFixed(2));
  };


// Event type
export type MemberEvent = {
  date: string;
  title: string;
  location: string;
  contact: string;
};


// Main form data type
export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string; 
  gender: string;
  role: string; // adjust as needed
  experience: string;
  location: string;
  availability: string;
  expectedSalary: string;
  resumeLink: string; 
  agree: boolean; 
  skills: string[];
  message: string;
  pincode: string;
  district: string;
  avatar: string;
  rating: number;
  state: string;
  status:string;
  totalProjects: number;
  country: string;
  joinDate: string; // assuming `today` is a string
  memberId: string;
  password: string;
  events: MemberEvent[];
  createdAt: string; // Adding missing createdAt property
  operatorId?: string; // Adding optional operatorId property
};


export interface PostOffice {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

export interface areaType {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}
















export type Item = { id: string; price: number } ;

export type ExpandablePriceProps = {
  title: string; 
  items: Item | Item[]; 
};
