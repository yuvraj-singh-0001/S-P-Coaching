const Contact = require("../../models/Contact");

async function enquiry(req, res) {
  try {
    const { name, email, phone, enquiryType, enquiryMessage } = req.body;

    if (!name || !email || !phone || !enquiryType || !enquiryMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      enquiryType,
      enquiryMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully",
      data: contact
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}

module.exports = enquiry;
