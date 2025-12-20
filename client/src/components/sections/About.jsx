import { User, Target, Award, Book } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About S P Coaching Center
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              S P Coaching Center is a dedicated learning institute located in Paudali Bazar, Deoria, Uttar Pradesh. 
              Our mission is to provide strong academic guidance, clear concept building, and exam-oriented learning 
              to help students achieve outstanding results in board examinations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To build confidence, improve understanding, and help students achieve excellent results through disciplined learning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Promise</h3>
                  <p className="text-gray-600">
                    Not just exam preparation, but holistic development of students' academic capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Book className="text-white" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Quality Education</h3>
                    <p className="text-gray-600">Since 2010 in Deoria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Founder Image/Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={80} />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-yellow-600">👨‍🏫</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Info */}
            <div className="md:col-span-2">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4 font-semibold">
                Founder & Instructor
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Santosh Prashad
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With years of teaching experience, Santosh Sir has guided many students towards academic success. 
                He is passionate about student growth, disciplined study habits, and creating a motivating learning environment. 
                His teaching style focuses on clarity, understanding, and real-life examples to make learning simple and effective.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Students Guided</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;