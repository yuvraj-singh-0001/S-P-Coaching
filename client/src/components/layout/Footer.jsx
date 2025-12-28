import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">

        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          
          {/* LOGO & INFO */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SP</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">S P Coaching Center</h2>
                <p className="text-gray-400 text-sm">Paudali Bazar, Deoria</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm md:text-base mb-5">
              Providing quality education with disciplined guidance and result-focused learning since 2010.
            </p>

            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">Courses</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Fee Structure</a></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="text-blue-400" size={18} />
                <span className="text-gray-400">Paudali Bazar, Deoria, UP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <span className="text-gray-400">+91 88875 81808</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-400" size={18} />
                <span className="text-gray-400">contact@spcoaching.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} S P Coaching Center. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Designed for academic excellence in Deoria, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
