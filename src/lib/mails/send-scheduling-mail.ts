import sendMail from "./send-mail.js";

async function sendSchedulingEmail(to: string) {
  const schedulingLink = process.env.SCHEDULING_LINK; // Use environment variable for scheduling link
  const content = `Hello if you want to schedule meeting click link down below:
    ${schedulingLink}`;

  try {
    await sendMail({
      to,
      html: content,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default sendSchedulingEmail;
