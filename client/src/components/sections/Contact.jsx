import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ===== BACKEND CONNECTED SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiryType: formData.enquiryType,
          enquiryMessage: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 Enquiry Submitted Successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          enquiryType: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to submit enquiry");
      }

    } catch (err) {
      alert("Server error — please try again later");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/2CbDJdqSJ55mFyQE8", "_blank");
  };

  return (
    <section className="w-full py-6 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">

          {/* ENQUIRY FORM */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 
          hover:border-blue-300 transition-all duration-300 hover:shadow-lg p-4 flex flex-col h-full">

            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
              Admission Enquiry Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <label className="font-semibold text-gray-700 text-sm">
                Name<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              />

              <label className="font-semibold text-gray-700 text-sm">
                email<span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Gmail"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              />

              <label className="font-semibold text-gray-700 text-sm">
                Phone Number<span className="text-red-700">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              />

              <label className="font-semibold text-gray-700 text-sm">
                Enquiry Type<span className="text-red-700">*</span>
              </label>
              <select
                name="enquiryType"
                required
                value={formData.enquiryType}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              >
                <option value="">Select Enquiry Type</option>
                <option value="Admission">Admission</option>
                <option value="Fees Enquiry">Fees Enquiry</option>
                <option value="Course Information">Course Information</option>
                <option value="Other">Other</option>
              </select>

              <label className="font-semibold text-gray-700 text-sm">
                Message / Query<span className="text-red-700">*</span>
              </label>
              <textarea
                rows="3"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message / Query "
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                font-semibold transition-all duration-300 hover:shadow-lg flex justify-center items-center gap-2"
              >
                <Send size={16} />
                {loading ? "Please wait..." : "Submit Enquiry"}
              </button>
            </form>
          </div>

          {/* VISIT CENTER CARD — unchanged */}
          {/* (same as your original UI, preserved exactly) */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 
          hover:border-blue-300 transition-all duration-300 hover:shadow-lg p-4 flex flex-col h-full">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Visit Our Center
            </h3>

            <div className="space-y-2 flex-1">

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Address</h4>
                  <button
                    onClick={openGoogleMaps}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors text-left"
                  >
                    📍 Paudali Bazar, Deoria, Uttar Pradesh
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone size={20} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Phone</h4>
                  <a href="tel:+918887581808" className="text-gray-700 hover:text-blue-600 text-sm transition-colors">
                    +91 88875 81808
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail size={20} className="text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Email</h4>
                  <a href="mailto:contact@spcoaching.com" className="text-gray-700 hover:text-blue-600 text-sm transition-colors">
                    contact@spcoaching.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Clock size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Timings</h4>
                  <p className="text-gray-700 text-sm leading-tight">
                    Morning: 6:00 AM - 10:00 AM<br />
                    Evening: 3:00 PM - 6:30 PM<br />
                    Monday to Saturday
                  </p>
                </div>
              </div>

              <div
                onClick={openGoogleMaps}
                className="p-3 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg border 
                border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 
                cursor-pointer group h-28 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center 
                  mb-1 group-hover:scale-110 transition-transform mx-auto">
                    <MapPin size={18} className="text-blue-600" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800">Click to View Location</h4>
                  <p className="text-xs text-gray-600">Paudali Bazar, Deoria</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
