const brevo = require("@getbrevo/brevo");

// Create EXACT same working client like enquiry.js
const client = new brevo.TransactionalEmailsApi();

// Use .trim() to remove hidden spaces (this is why 401 sometimes happens)
const API_KEY = (process.env.BREVO_API_KEY || "").trim();

client.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  API_KEY
);

exports.sendMail = async (to, subject, html) => {
  try {

    console.log("------ EMAIL DEBUG LOG ------");
    console.log("API KEY LOADED:", API_KEY.length > 0 ? "YES" : "NO");
    console.log("Sending To:", to);

    await client.sendTransacEmail({
      sender: { email: process.env.MAIL_FROM, name: "SP Coaching" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("Email Sent Successfully");

  } catch (err) {
    console.log("BREVO EMAIL FAILED");
    console.log(err.response?.text || err.message);
  }
};
