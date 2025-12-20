import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SP</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">S P Coaching Center</h2>
                <p className="text-gray-400">Paudali Bazar, Deoria</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Providing quality education for classes 9-12 with strong conceptual learning, 
              disciplined study guidance, and result-focused preparation since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-400 hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Fee Structure
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-gray-400">Paudali Bazar, Deoria, UP</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-green-400" size={20} />
                <span className="text-gray-400">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-purple-400" size={20} />
                <span className="text-gray-400">info@spcoachingdeoria.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} S P Coaching Center. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed for academic excellence in Deoria, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;