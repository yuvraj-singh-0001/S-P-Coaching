import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Courses", path: "/courses" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid md:grid-cols-4 gap-8">

          {/* LOGO  with clik go to home  */}
          <div className="md:col-span-2">
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-90 transition"
              onClick={() => navigate("/")}
            >

              {/* logo  */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 font-extrabold text-3xl leading-none">
                  SP
                </span>
              </div>

              <div className="text-white font-semibold">
                <p className="text-xl leading-none">
                  Coaching Classes
                </p>
                <div className="w-24 h-[2px] bg-yellow-400 mt-1"></div>

                <p className="text-yellow-300 text-sm mt-1">
                  Paudali Bazar, Deoria
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-5">
              Providing quality education with disciplined guidance and
              result-focused learning since 2010.
            </p>

            {/* SOCIAL ICONS ) */}
            <div className="flex gap-3">
              <a className="w-9 h-9 bg-gray-800 border border-gray-400 rounded-full flex items-center justify-center hover:border-blue-400 transition">
                <Facebook size={18} />
              </a>

              <a className="w-9 h-9 bg-gray-800 border border-gray-400 rounded-full flex items-center justify-center hover:border-blue-400 transition">
                <Instagram size={18} />
              </a>

              <a className="w-9 h-9 bg-gray-800 border border-gray-400 rounded-full flex items-center justify-center hover:border-blue-400 transition">
                <Twitter size={18} />
              </a>

              <a className="w-9 h-9 bg-gray-800 border border-gray-400 rounded-full flex items-center justify-center hover:border-blue-400 transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-300 hover:text-yellow-400 transition text-left"
                  >
                    {link.title}
                  </button>
                </li>
              ))}

              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition text-left">
                  Fee Structure
                </button>
              </li>
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Contact Info
            </h3>

            <ul className="space-y-3 text-sm">

              {/* Location Click → Google Map Open */}
              <li className="flex items-center gap-3 cursor-pointer"
                onClick={() => window.open("https://maps.app.goo.gl/2CbDJdqSJ55mFyQE8", "_blank")}>
                <MapPin className="text-blue-400" size={18} />
                <span className="text-gray-300 hover:text-blue-400 transition">
                  Paudali Bazar, Deoria, UP
                </span>
              </li>

              {/* Call Click → Dial Pad */}
              <li className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <a href="tel:+918887581808" className="text-gray-300 hover:text-green-400 transition">
                  +91 88875 81808
                </a>
              </li>

              {/* Gmail Click → Gmail Compose */}
              <li className="flex items-center gap-3">
                <Mail className="text-purple-400" size={18} />
                <a
                  href="mailto:contact@spcoaching.com"
                  className="text-gray-300 hover:text-purple-400 transition">
                  contact@spcoaching.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Coaching Classes. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Crafted with precision by -
            <span
              onClick={() => window.open("https://webyuvraj.vercel.app/", "_blank")}
              className="text-yellow-400 font-semibold cursor-pointer hover:underline ml-1"
            >
              YUVRAJ SINGH
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
