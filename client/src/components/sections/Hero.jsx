import { ArrowRight, Users, Award, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-20 md:pt-24 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <span className="font-semibold">Since 2010</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              S P Coaching Center
              <span className="block text-blue-600 mt-2">Empowering Students for a Bright Future</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We provide quality education for students of classes 9 to 12 with strong conceptual learning, 
              disciplined study guidance, and result-focused preparation at Paudali Bazar, Deoria, Uttar Pradesh.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-sm text-gray-600">Students Taught</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">95%</h3>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">4</h3>
                  <p className="text-sm text-gray-600">Subjects</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Enroll Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 transform rotate-3">
                <div className="bg-white rounded-xl p-6 transform -rotate-3 shadow-2xl">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">SP</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Quality Education</h3>
                      <p className="text-gray-600">Classes 9-12 • UP Board</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Faculty</h4>
                    <p className="text-sm text-gray-500">Santosh Sir</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">★</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">4.9/5 Rating</h4>
                    <p className="text-sm text-gray-500">Student Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;