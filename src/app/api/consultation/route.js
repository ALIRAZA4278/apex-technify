import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, service, preferredTime, message } = await request.json();

    // Validate input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NM_EMAIL_USER,
        pass: process.env.NM_EMAIL_PW,
      },
    });

    // Verify transporter
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Email to admin
    const mailToAdmin = {
      from: process.env.NM_EMAIL_USER,
      to: process.env.NM_EMAIL_USER,
      subject: `New Consultation Booking - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #fff; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #d946ef, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
              New Consultation Request
            </h1>
          </div>

          <div style="background: rgba(217,70,239,0.1); border: 1px solid rgba(217,70,239,0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Service Requested</h3>
            <p style="font-size: 18px; margin: 0; color: #fff;">${service}</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Preferred Time</h3>
            <div style="background: rgba(6,182,212,0.1); padding: 15px; border-radius: 8px; text-align: center;">
              <p style="color: #06b6d4; margin: 0; font-size: 14px;">Client's Availability</p>
              <p style="color: #fff; margin: 5px 0 0; font-size: 18px; font-weight: bold;">${preferredTime || 'Not specified'}</p>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Client Details</h3>
            <table style="width: 100%; color: #ccc;">
              <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #06b6d4;">${phone}</a></td></tr>
            </table>
          </div>

          ${message ? `
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Additional Message</h3>
            <p style="color: #ccc; line-height: 1.6; margin: 0;">${message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #d946ef, #a855f7); color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; margin-right: 10px; font-weight: 500;">Reply via Email</a>
            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 500;">Call Now</a>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #666; font-size: 12px;">Apex Technify - Digital Solutions</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to client
    const autoReplyToClient = {
      from: process.env.NM_EMAIL_USER,
      to: email,
      replyTo: process.env.NM_EMAIL_USER,
      subject: `Consultation Confirmed - ${service} | Apex Technify`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #fff; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #d946ef, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
              Consultation Confirmed!
            </h1>
          </div>

          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">
            Hi <strong style="color: #fff;">${name}</strong>,
          </p>

          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">
            Thank you for booking a consultation with Apex Technify! We're excited to discuss your <strong style="color: #d946ef;">${service}</strong> project.
          </p>

          <div style="background: linear-gradient(135deg, rgba(217,70,239,0.1), rgba(6,182,212,0.1)); border: 1px solid rgba(217,70,239,0.3); padding: 25px; border-radius: 16px; margin: 25px 0; text-align: center;">
            <h3 style="color: #fff; margin-top: 0;">Your Consultation Request</h3>
            <div style="background: rgba(255,255,255,0.05); padding: 20px 40px; border-radius: 12px; margin: 10px auto; max-width: 300px;">
              <p style="color: #d946ef; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Preferred Time</p>
              <p style="color: #fff; margin: 10px 0 0; font-size: 18px; font-weight: bold;">${preferredTime || 'To be discussed'}</p>
            </div>
            <p style="color: #888; font-size: 14px; margin-top: 15px;">We'll confirm the exact time via email</p>
          </div>

          <div style="background: rgba(168,85,247,0.1); border-left: 4px solid #a855f7; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="color: #a855f7; margin: 0; font-weight: 500;">What to Expect:</p>
            <ul style="color: #ccc; margin: 10px 0 0; padding-left: 20px; line-height: 1.8;">
              <li>Discussion of your project requirements</li>
              <li>Expert recommendations for your needs</li>
              <li>Clear pricing and timeline overview</li>
              <li>Q&A session</li>
            </ul>
          </div>

          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">
            We'll send you a meeting link before the scheduled time. If you need to reschedule, please reply to this email.
          </p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Looking forward to speaking with you!</p>
            <p style="color: #d946ef; font-weight: 500; margin: 0;">Team Apex Technify</p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(autoReplyToClient);

    return NextResponse.json(
      { message: 'Consultation booked successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in consultation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
