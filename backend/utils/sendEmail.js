import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, name) => {
  try {
    console.log("📤 Sending email to:", to);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "EXISTS" : "MISSING");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #eee;">
      
      <div style="background: #F5A623; padding: 40px 32px; text-align: center;">
        <div style="font-size: 36px; margin-bottom: 8px;">🚀</div>
        <h1 style="color: #fff; font-size: 22px; margin: 0 0 4px;">Welcome to X'perienced!</h1>
        <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 0;">We're so glad you're here</p>
      </div>

      <div style="padding: 32px; background: #ffffff;">
        <p style="font-size: 16px; color: #111;">Hi <strong>${name}</strong> 👋</p>
        <p style="font-size: 15px; color: #555; line-height: 1.7;">
          You've just joined a community of people sharing real experiences, stories, and insights. We're thrilled to have you on board!
        </p>

        <p style="font-size: 13px; font-weight: bold; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">What you can do</p>

        <div style="margin-bottom: 12px;">
          <span style="font-size: 20px;">✍️</span>
          <strong style="color: #111; margin-left: 8px;">Share your experiences</strong>
          <p style="color: #777; font-size: 13px; margin: 2px 0 0 30px;">Write about your journey and inspire others</p>
        </div>
        <div style="margin-bottom: 12px;">
          <span style="font-size: 20px;">🔍</span>
          <strong style="color: #111; margin-left: 8px;">Explore stories</strong>
          <p style="color: #777; font-size: 13px; margin: 2px 0 0 30px;">Discover real experiences from the community</p>
        </div>
        <div style="margin-bottom: 24px;">
          <span style="font-size: 20px;">👤</span>
          <strong style="color: #111; margin-left: 8px;">Build your profile</strong>
          <p style="color: #777; font-size: 13px; margin: 2px 0 0 30px;">Add your bio, college, company & more</p>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="http://localhost:5173" style="background: #F5A623; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 500;">Get Started Now</a>
        </div>

        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="color: #888; font-size: 13px; margin: 0;">With love,</p>
          <p style="color: #111; font-size: 14px; font-weight: bold; margin: 4px 0 0;">Team X'perienced </p>
        </div>
      </div>
    </div>`;

    const info = await transporter.sendMail({
      from: `"X'perienced 🚀" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Mail sent:", info.response);

  } catch (error) {
    console.log("❌ FULL Email error:", error);
  }
};