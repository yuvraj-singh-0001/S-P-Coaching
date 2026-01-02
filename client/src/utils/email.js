const Brevo = require("@getbrevo/brevo");
const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

exports.sendMail = async (to, subject, html) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: { email: "spcoachingclasses888@gmail.com", name: "S-P Coaching" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });
  } catch (err) {
    console.log("Mail Error:", err.message);
  }
};
