"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "@/contexts/AppContext";
import {
  Users,
  Star,
  CheckCircle,
  Send,
  Award,
  Clock,
  DollarSign,
  BookOpen,
  Target,
  Zap,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import {
  roles,
  experienceLevels,
  basicConditions,
  benefits,
  fresherPrograms,
  moderateRequirements,
  experiencedRequirements,
} from "@/contexts/fromData";
import { TeamMember } from "@/contexts/fromType";

interface JoinUsPageProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  mobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
  navigateToPage?: (page: string) => void;
  currentPage?: string;
}

const JoinUsPage: React.FC<JoinUsPageProps> = (props) => {
  const context = useAppContext();

  // const darkMode = props.darkMode ?? context.darkMode;

  const mobileMenuOpen = props.mobileMenuOpen ?? context.mobileMenuOpen;
  
  const toggleMobileMenu =
    props.toggleMobileMenu ??
    (() => context.setMobileMenuOpen(!context.mobileMenuOpen));
  const navigateToPage = props.navigateToPage ?? context.navigateToPage;
  const currentPage = props.currentPage ?? context.currentPage;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("cameraman");
  const [selectedLevel, setSelectedLevel] = useState("experienced");
   const today = new Date().toISOString().split("T")[0];

// Example usage
const [formData, setFormData] = useState<TeamMember>({
  id: "demoId",
  name: "",
  email: "",
  phone: "",
  age: "", 
  gender: "",
  role: "team",
  experience: "",
  location: "",
  availability: "",
  expectedSalary: "",
  resumeLink: "", 
  agree: false, 
  skills: [],
  message: "",
  pincode: "",
  district: "",
  avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  rating: 4.8,
  state: "",
  totalProjects: 0,
  country: "India",
  joinDate: today,
  memberId: "member",
  status:"active",
  password: "$2b$10$I4BZqXcYZ4ykoUPwwEYVD.y5lByPyOzAXf8IaN23HXCAYoYYDlscy",
  createdAt: new Date().toISOString(),
  events: [
    { date: "12/9/2025", title: "Wedding Ceremony", location: "Chopra Village", contact: "+91 9876543210" },
    { date: "14/9/2025", title: "Reception Party", location: "Kolkata City Hall", contact: "+91 9123456780" },
    { date: "1/10/2025", title: "Anniversary Gathering", location: "Town Community Center", contact: "+91 9988776655" },
  ]
});


  const handleRoleChange = (roleId: string) => {
    console.log(roleId);
    setSelectedRole(roleId);
    setFormData({ ...formData, role: roleId as "team" | "client" });
  };

  const handleLevelChange = (levelId: string) => {
    console.log(levelId);
    setSelectedLevel(levelId);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/join_us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const { error } = await response.json();
        alert(error || "Failed to submit form");
        return;
      }
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentRequirements = () => {
    console.log("Getting requirements for:", { selectedLevel, selectedRole });

    try {
      switch (selectedLevel) {
        case "experienced":
          const experiencedReqs =
            experiencedRequirements[
              selectedRole as keyof typeof experiencedRequirements
            ];
          console.log("Experienced requirements:", experiencedReqs);
          return experiencedReqs || [];

        case "moderate":
          const moderateReqs =
            moderateRequirements[
              selectedRole as keyof typeof moderateRequirements
            ];
          console.log("Moderate requirements:", moderateReqs);
          return moderateReqs || [];

        case "fresher":
          const fresherReqs =
            fresherPrograms[selectedRole as keyof typeof fresherPrograms];
          console.log("Fresher requirements:", fresherReqs);
          return fresherReqs || [];

        default:
          console.log("Unknown experience level:", selectedLevel);
          return [];
      }
    } catch (error) {
      console.error("Error getting requirements:", error);
      return [];
    }
  };

  const getCurrentBenefits = () => {
    return (
      benefits[selectedLevel as keyof typeof benefits]?.[
        selectedRole as keyof typeof benefits.experienced
      ] || []
    );
  };

  const getCurrentConditions = () => {
    return basicConditions[selectedLevel as keyof typeof basicConditions] || [];
  };


  return (
    <div
      // className={`min-h-screen transition-colors duration-300 ${
      //   darkMode ? "dark" : ""
      // }`}
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          navigateToPage={navigateToPage}
          currentPage={currentPage}
        />

        <div className="pt-16 min-h-screen bg-white dark:bg-gray-900">
          {/* heero section */}
          <div
            style={{
              backgroundImage:
                "url('https://media.weddingz.in/images/7925b20c21b1f52bdb5e827c783b527f/Bengali-marriage-rituals-5.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-16"
          >
            {/* Dark center overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,1)_100%)]"></div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Join Our Creative Team</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Whether you&apos;re an experienced professional, have moderate
                  experience, or just starting your career, we have
                  opportunities for you. Take our skills test and join
                  AsanCapture&apos;s growing team.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Level Selection */}
          <div className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                  Choose Your Path
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Select your experience level to see relevant opportunities
                </p>
              </div>

              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2 gap-2">
                  {experienceLevels.map((level) => {
                    const IconComponent = level.icon;
                    return (
                      <button
                        key={level.id}
                        onClick={() => handleLevelChange(level.id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          selectedLevel === level.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-sm md:text-base">
                          {level.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Role Selection */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Select Your Role
                </h3>
              </div>

              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2 gap-2">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => handleRoleChange(role.id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                          selectedRole === role.id
                            ? "bg-gray-300 dark:bg-black/50 text-black dark:text-white shadow-lg"
                            : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-sm md:text-base">
                          {role.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Three Column Layout: Requirements, Benefits, Conditions */}
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Requirements/Training */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                    {selectedLevel === "experienced" ? (
                      <>
                        <Award className="h-6 w-6 mr-2 text-blue-600" />
                        Requirements
                      </>
                    ) : selectedLevel === "moderate" ? (
                      <>
                        <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
                        Enhancement Program
                      </>
                    ) : (
                      <>
                        <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
                        Training Program
                      </>
                    )}
                  </h3>
                  <ul className="space-y-3">
                    {getCurrentRequirements().map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        {selectedLevel === "experienced" ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : selectedLevel === "moderate" ? (
                          <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-gray-600 dark:text-gray-300">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits & Compensation */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                    <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                    Benefits & Compensation
                  </h3>
                  <ul className="space-y-3">
                    {getCurrentBenefits().map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Basic Conditions */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-orange-600" />
                    Basic Conditions
                  </h3>
                  <ul className="space-y-3">
                    {getCurrentConditions().map((condition, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {condition}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Test Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Skills Assessment Required
                    </span>
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    All applicants must complete a skills test to demonstrate
                    their abilities
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Target className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Practical Test
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedLevel === "experienced"
                        ? "Hands-on demonstration of your professional skills"
                        : selectedLevel === "moderate"
                        ? "Skills assessment with enhancement recommendations"
                        : "Basic aptitude and learning ability assessment"}
                    </p>
                  </div>
                  <div>
                    <Clock className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Assessment Duration
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedLevel === "experienced"
                        ? "60-90 minutes depending on your chosen role"
                        : selectedLevel === "moderate"
                        ? "45-60 minutes skills evaluation"
                        : "30-45 minutes basic skills and aptitude test"}
                    </p>
                  </div>
                  <div>
                    <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Results & Next Steps
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedLevel === "experienced"
                        ? "Immediate feedback and salary negotiation"
                        : selectedLevel === "moderate"
                        ? "Enhancement program enrollment within 24 hours"
                        : "Training program enrollment within 48 hours"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Apply & Schedule Your Skills Test
                    </span>
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Fill out the form below to apply for your chosen role and
                    schedule your skills assessment
                  </p>
                </div>



                <form
                  onSubmit={handleSubmit}
                  className="max-w-2xl mx-auto space-y-6"
                >
                  {/* --- Personal Info --- */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* --- Extra Personal Info --- */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Age *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Your age"
                      />
                    </div>
                  </div>

                  {/* Gender + Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  {/* Location Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Enter 6-digit pincode"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        District *
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Enter district name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value="India"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Role & Experience */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Role *
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      >
                        <option value="">Select your role</option>
                        <option value="team">Production Team</option>
                        <option value="cameraman">Cameraman</option>
                        <option value="editor">Editor</option>
                        <option value="equipment">Equipment Partner</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Experience Level *
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      >
                        <option value="">Select experience level</option>
                        <option value="fresher">Fresher/New Graduate</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary & Resume (Drive Link) */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="expectedSalary"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Expected Salary{" "}
                        {/* Changed from "cameraman" to check if role includes "team" since the type is restricted */}
                        {formData.role === "team"
                          ? "(per day)"
                          : "(per hour)"}{" "}
                        *
                      </label>
                      <input
                        type="text"
                        id="expectedSalary"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder={
                          formData.role === "team"
                            ? "₹8,000 - ₹25,000"
                            : "₹2,000 - ₹6,000"
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="resumeLink"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Resume (Google Drive/Portfolio Link) *
                      </label>
                      <input
                        type="url"
                        id="resumeLink"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label
                      htmlFor="availability"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    >
                      <option value="">Select Availability</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Weekends Only">Weekends Only</option>
                      <option value="Evenings Only">Evenings Only</option>
                      <option value="Flexible Hours">Flexible Hours</option>
                      <option value="Project Based">Project Based</option>
                      <option value="On Call">On Call</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Remote Only">Remote Only</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Additional Message / Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                      placeholder="Write anything you’d like us to know..."
                    />
                  </div>

                  {/* Social Media Agreement */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleInputChange}
                        required // ✅ required belongs here
                        className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="agree"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        I agree that my submitted work/portfolio may be
                        showcased on the company&apos;s social media and marketing
                        platforms.
                      </label>
                    </div>
                
              {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-3 max-w-2xl mx-auto">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-700 dark:text-green-300">
                      Thank you for your application! We&apos;ll contact you within
                      24 hours to schedule your skills test.
                    </span>
                  </div>
                )}
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Apply & Schedule Test</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Experience Level Highlights */}
              {selectedLevel === "fresher" && (
                <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        🎓 Fresher Training Program Details
                      </span>
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Complete training program with guaranteed job placement
                    </p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <BookOpen className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Free Training
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedRole === "cameraman"
                          ? "6 weeks"
                          : selectedRole === "editor"
                          ? "4 weeks"
                          : "3 weeks"}{" "}
                        intensive program
                      </p>
                    </div>
                    <div>
                      <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Unpaid Internship
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        2 months hands-on experience with real projects
                      </p>
                    </div>
                    <div>
                      <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Paid Employment
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Guaranteed job with competitive salary after completion
                      </p>
                    </div>
                    <div>
                      <Award className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Certification
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Industry-recognized certificate upon successful
                        completion
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedLevel === "moderate" && (
                <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        📈 Moderate Experience Enhancement Program
                      </span>
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Skill enhancement program to advance your career
                    </p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Skills Enhancement
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        2-week intensive program to upgrade your skills
                      </p>
                    </div>
                    <div>
                      <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Mentorship
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        One-on-one guidance from senior professionals
                      </p>
                    </div>
                    <div>
                      <DollarSign className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Immediate Earning
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Start earning while you enhance your skills
                      </p>
                    </div>
                    <div>
                      <Award className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Career Growth
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Clear path to senior positions and higher rates
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedLevel === "experienced" && (
                <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        🏆 Experienced Professional Benefits
                      </span>
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Join our team and start earning immediately after skills
                      assessment
                    </p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <Target className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Skills Test
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Practical assessment to determine your skill level and
                        rate
                      </p>
                    </div>
                    <div>
                      <DollarSign className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Immediate Earning
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Start working and earning based on your assessed skill
                        level
                      </p>
                    </div>
                    <div>
                      <Clock className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Flexible Schedule
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Choose your projects and work according to your
                        availability
                      </p>
                    </div>
                    <div>
                      <TrendingUp className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Growth Opportunities
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Performance bonuses and rate increases based on quality
                        work
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default JoinUsPage;
