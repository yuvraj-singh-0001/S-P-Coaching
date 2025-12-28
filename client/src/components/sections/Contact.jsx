import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    subject: "",
    enquiryType: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Enquiry submitted! We'll contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      class: "",
      subject: "",
      enquiryType: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, subject: "" });
  };

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/2CbDJdqSJ55mFyQE8", "_blank");
  };

  // SUBJECT OPTIONS BASED ON CLASS
  const getSubjectOptions = () => {
    if (["9", "10"].includes(formData.class)) {
      return ["All Subjects", "Mathematics", "Science", "English"];
    }

    if (["11", "12"].includes(formData.class)) {
      return [
        "All Subjects with Math",
        "All Subjects with Biology",
        "Mathematics",
        "Biology",
        "Chemistry",
        "Physics",
        "English",
        "Hindi",
      ];
    }

    if (formData.class === "iti") {
      return ["Electrical", "Fitter", "All Trades"];
    }

    if (formData.class === "bsc") {
      return ["PCM", "PCB", "General Science"];
    }

    if (formData.class === "polytechnic") {
      return ["Mechanical", "Electrical", "Civil"];
    }

    return [];
  };

  return (
    <section className="w-full py-4 md:py-6 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-3 md:px-4">

        {/* TITLE */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Contact Us</h1>
          <div className="w-14 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">

          {/* ADMISSION FORM — FIRST */}
          <div className="order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 
            hover:border-blue-300 transition-all duration-300 hover:shadow-lg h-full p-4">

              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Admission Enquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">

                <input
                  type="text"
                  name="name"
                  placeholder="Student Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Gmail *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                />

                <select
                  name="class"
                  required
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                >
                  <option value="">Select Class / Course *</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="iti">ITI</option>
                  <option value="bsc">B.Sc</option>
                  <option value="polytechnic">Polytechnic</option>
                </select>

                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={!formData.class}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                >
                  <option value="">Select Subject *</option>
                  {getSubjectOptions().map((sub, index) => (
                    <option key={index} value={sub}>{sub}</option>
                  ))}
                </select>

                <select
                  name="enquiryType"
                  required
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                >
                  <option value="">Select Enquiry Type *</option>
                  <option value="Admission">Admission</option>
                  <option value="Fees Enquiry">Fees Enquiry</option>
                  <option value="Other">Other</option>
                </select>

                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message / Query"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg 
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                  font-semibold transition-all duration-300 hover:shadow-lg flex justify-center items-center gap-2"
                >
                  <Send size={16} />
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>

          {/* VISIT CENTER — SECOND */}
          <div className="order-2 lg:order-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 
            hover;border-blue-300 transition-all duration-300 hover:shadow-lg h-full p-4">

              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Visit Our Center
              </h3>

              <div className="space-y-2">

                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Address</h4>
                    <button
                      onClick={openGoogleMaps}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline 
                      transition-colors text-left"
                    >
                      📍 Paudali Bazar, Deoria, Uttar Pradesh
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Phone</h4>
                    <a href="tel:+918887581808"
                      className="text-gray-700 hover:text-blue-600 text-sm transition-colors">
                      +91 88875 81808
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail size={20} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Email</h4>
                    <a href="mailto:contact@spcoaching.com"
                      className="text-gray-700 hover:text-blue-600 text-sm transition-colors">
                      contact@spcoaching.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
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

      </div>
    </section>
  );
};

export default Contact;
