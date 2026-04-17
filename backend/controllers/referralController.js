import nodemailer from "nodemailer";

export const sendReferral = async (req, res) => {
  try {
    console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);
console.log("FILE:", req.file);
    const { message, toEmail } = req.body;
    const file = req.file;

    if (!toEmail) {
      return res.status(400).json({ message: "Email required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Referral Request 🚀",
      text: message || "I am interested in this opportunity.",
    };

    // ✅ Attach file only if exists
    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          path: file.path,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully ✅" });

  } catch (error) {
    console.log("❌ Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};