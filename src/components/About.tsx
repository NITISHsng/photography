import React from "react";
import {
  Users,
  Award,
  Calendar,
  CheckCircle,
  Camera,
  Heart,
  Trophy,
  Target,
  Zap,
} from "lucide-react";

const About: React.FC = () => {
  const stats = [
    {
      icon: Calendar,
      number: "5+",
      label: "Years Experience",
      description: "Delivering exceptional video content",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      number: "40+",
      label: "Team Members",
      description: "Professional creatives and technicians",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      number: "800+",
      label: "Projects Completed",
      description: "Successful deliveries across industries",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Trophy,
      number: "98%",
      label: "Client Satisfaction",
      description: "Happy clients who return for more",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const achievements = [
    "Industry-leading 4K and 8K video production capabilities",
    "Award-winning documentary and commercial work",
    "Partnerships with major brands and production houses",
    "State-of-the-art equipment and technology",
    "Certified professionals in cinematography and editing",
    "Full-service production from concept to delivery",
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every shot is carefully planned and executed",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do and it shows in our work",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Always exploring new techniques and technologies",
    },
  ];

  return (
    <section
      id="about"
      className="py-6 md:py-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About AsanCapture
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            With over 5 years of experience in the video production industry,
            we&apos;ve built a reputation for delivering exceptional visual
            storytelling that captures hearts and minds.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.number}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {stat.label}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Crafting Visual Stories That Matter
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                From weddings to commercials, our team of 40+ creatives blends
                passion, precision, and innovation to produce visuals that
                resonate.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We believe every story deserves to shine — powered by the latest
                gear, expert talent, and meaningful client partnerships.
              </p>
            </div>

            {/* Values */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                Our Core Values
              </h4>
              <div className="space-y-4">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 dark:text-white mb-1">
                          {value.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 rounded-3xl shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full">
                <div className="text-center space-y-6">
                  <div className="flex justify-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Passion Meets Professionalism
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    Every frame we capture is infused with creativity and
                    technical precision, ensuring your story is told exactly as
                    you envision it.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        24/7
                      </div>
                      <div className="text-sm text-gray-500">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        4K
                      </div>
                      <div className="text-sm text-gray-500">Quality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        ∞
                      </div>
                      <div className="text-sm text-gray-500">Creativity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-3xl opacity-20"></div>
            <div className="absolute -z-20 top-16 left-16 w-full h-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-3xl opacity-10"></div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-12 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Our Achievements
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Celebrating milestones, awards, and work that define our creative
              journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl"
              >
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
