import sendMail from "./send-mail.js";

async function sendApologyEmail(to: string) {
  const content =
    "Sorry, but we are working only with development agencies, and SaaS companies! :(";

  try {
    await sendMail({
      to,
      subject: "BBR - Sorry, but we are not a good fit!",
      html: content,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default sendApologyEmail;
