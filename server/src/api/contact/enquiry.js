const Contact = require("../../models/Contact");
const brevo = require("@getbrevo/brevo");

async function enquiry(req, res) {
  try {
    const { name, email, phone, enquiryType, enquiryMessage } = req.body;

    if (!name || !email || !phone || !enquiryType || !enquiryMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // SAVE TO DATABASE
    const contact = await Contact.create({
      name,
      email,
      phone,
      enquiryType,
      enquiryMessage,
    });

    // ================= BREVO CLIENT =================
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // ================= USER AUTO REPLY =================
    let replyMessage = "";

    if (enquiryType === "Admission") {
      replyMessage = `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting <strong>SP Coaching</strong> regarding <b>Admission</b>.</p>
        <p>Our team will reach out to you shortly with admission details.</p>
        <p>Regards,<br/>SP Coaching<br/>Paudali Bazar, Deoria<br/>Contact: 8887581808</p>
      `;
    } 
    else if (enquiryType === "Fees Enquiry") {
      replyMessage = `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting SP Coaching regarding <b>Fees</b>.</p>
        <p>We will contact you shortly and share full fee structure.</p>
        <p>Regards,<br/>SP Coaching</p>
      `;
    } 
    else if (enquiryType === "Course Information") {
      replyMessage = `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting SP Coaching regarding <b>Course details</b>.</p>
        <p>We will soon provide syllabus & duration information.</p>
        <p>Regards,<br/>SP Coaching</p>
      `;
    } 
    else {
      replyMessage = `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting SP Coaching.</p>
        <p>We have received your enquiry & our team will get back soon.</p>
        <p>Regards,<br/>SP Coaching</p>
      `;
    }

    await client.sendTransacEmail({
      sender: { email: process.env.MAIL_FROM, name: "SP Coaching" },
      to: [{ email }],
      subject: "📩 We Received Your Enquiry — SP Coaching",
      htmlContent: replyMessage,
    });

    // ================= ADMIN NOTIFICATION =================
    await client.sendTransacEmail({
      sender: { email: process.env.MAIL_FROM, name: "SP Coaching Website" },
      to: [{ email: process.env.ADMIN_EMAIL }],
      subject: `📢 New Enquiry — ${enquiryType}`,
      htmlContent: `
        <h2>New Contact Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Type:</b> ${enquiryType}</p>
        <p><b>Message:</b> ${enquiryMessage}</p>
        <hr/>
        <p>Website: SP Coaching</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry Submitted + Auto Reply Sent + Admin Notified",
      data: contact,
    });

  } catch (err) {
    console.log("Brevo Error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
}

module.exports = enquiry;
