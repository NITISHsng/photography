import React from "react";

import {
  Camera,
  Video,
  Edit,
  FileText,
} from "lucide-react";
const ourServices = [ 
  { label: "Wedding", imageUrl: "/homeImages/l13.webp" },
  { label: "Pre-Wedding", imageUrl: "/homeImages/ser1.webp" },
  { label: "Engagement Ceremony", imageUrl: "/homeImages/l114.webp" },
  { label: "Outdoor Wedding (Photo & Video)", imageUrl: "/homeImages/outdoor_wedding.webp" },
  { label: "Baby Photography", imageUrl: "/homeImages/l35.webp" },
  { label: "Rice Ceremony Photography", imageUrl: "/homeImages/annaprashan.webp" },
  { label: "Corporate Event", imageUrl: "/homeImages/l41.webp" },
  { label: "Birthday", imageUrl: "/homeImages/l37.webp" },
];


const Services: React.FC = () => {
  const services = [
    {
      icon: FileText,
      title: "Production Contracts",
      description:
        "We currently provide full-service contracts for weddings, private parties, and small programs — with a goal to expand into all types of event productions.",
      features: [
        "Wedding Productions",
        "Pre-Wedding Shoots",
        "Engagement Ceremony",
        "Birthday Parties",
        "Outdoor Wedding (Photo & Video)",
        "Rice Ceremony Photography / Annoprashan",
        "Engagements & Anniversaries",

      ],
      color: "from-green-500 to-green-600",
      buttonText: "Book Event",
    },
    {
      icon: Camera,
      title: "Cameraman (coming soon)",
      description:
        "We plan to offer skilled videographers and photographers for weddings, parties, corporate events, and creative productions of all kinds.",
      features: [
        "Weddings & Functions",
        "Birthday Parties",
        "Music Videos",
        "Commercial Shoots",
        "Documentaries",
        "Corporate Events",
      ],
      color: "from-blue-500 to-blue-600",
      buttonText: "Book Cameraman",
    },
    {
      icon: Video,
      title: "Camera & Equipment Rental (coming soon)",
      description:
        "We aim to provide high-quality camera gear for creators, agencies, and freelancers — affordable and fully equipped.",
      features: [
        "4K Cameras (Cinema, DSLR)",
        "Lenses, Gimbals, Tripods",
        "Lighting & Audio Kits",
        "Complete Shooting Setups",
      ],
      color: "from-purple-500 to-purple-600",
      buttonText: "Rent Equipment",
    },
    {
      icon: Edit,
      title: "Video Editing (coming soon)",
      description:
        "We’re working to offer expert video editing for events, brands, and creators — from highlights to high-end production.",
      features: [
        "Wedding & Event Editing",
        "Birthday & Family Edits",
        "Music Video Editing",
        "Promo & Social Media Videos",
        "Color Grading, VFX & Sound",
      ],
      color: "from-pink-500 to-pink-600",
      buttonText: "Hire Editor",
    },
  ];




  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="md:py-6 py-4 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
 

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive video production services to bring your vision to
            life, from concept to delivery.
          </p>
        </div>

        {/* Services Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 pb-16 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600 relative"
              >
                <div
                  className={`w-16 h-16 md:w-18 md:h-18 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${service.color} hover:shadow-xl text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105`}
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}

  {/* services card  */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {ourServices.map((service, index) => (
        <div
          key={index}
          className="bg-white relative rounded-2xl pb-[40px] shadow-md hover:shadow-xl transition overflow-hidden dark:bg-gray-600 border-2 dark:border-gray-600"
        >
          <div className="relative h-full">
           <img src={service.imageUrl} alt="" className="h-full max-h-[360px] w-full" /> 
          </div>
          <div className="absolute flex justify-center w-[100%] text-center items-center mt-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{service.label}</h3>
          </div>
        </div>
      ))}
    </div>

     
      </div>


    </section>
  );
};

export default Services;
