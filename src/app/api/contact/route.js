import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, service, package: packageInfo, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Determine inquiry type
    const isPackageInquiry = packageInfo && packageInfo.tier && packageInfo.tier !== 'Inquiry';
    const isMeetingRequest = packageInfo && packageInfo.tier === 'Meeting';

    let subjectLine = 'New Contact Form Submission';
    if (isPackageInquiry) {
      subjectLine = `Package Inquiry: ${service} - ${packageInfo.tier}`;
    } else if (isMeetingRequest) {
      subjectLine = `Meeting Request: ${service}`;
    } else if (service) {
      subjectLine = `Service Inquiry: ${service}`;
    }

    // Email to admin
    const mailToAdmin = {
      from: process.env.NM_EMAIL_USER,
      to: process.env.NM_EMAIL_USER,
      subject: `${subjectLine} | Apex Technify`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #fff; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #d946ef, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
              ${isPackageInquiry ? 'New Package Inquiry' : isMeetingRequest ? 'Meeting Request' : 'New Contact'}
            </h1>
          </div>

          ${service ? `
          <div style="background: rgba(217,70,239,0.1); border: 1px solid rgba(217,70,239,0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Service</h3>
            <p style="font-size: 18px; margin: 0; color: #fff;">${service}</p>
            ${isPackageInquiry ? `<p style="color: #06b6d4; margin: 10px 0 0;">Package: ${packageInfo.tier} - $${packageInfo.price}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Client Details</h3>
            <table style="width: 100%; color: #ccc;">
              <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #06b6d4;">${phone}</a></td></tr>` : ''}
            </table>
          </div>

          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #d946ef; margin-top: 0;">Message</h3>
            <p style="color: #ccc; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #d946ef, #a855f7); color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; margin-right: 10px; font-weight: 500;">Reply via Email</a>
            ${phone ? `<a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 500;">Call Now</a>` : ''}
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
      subject: `Thank you for contacting Apex Technify!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #fff; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #d946ef, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
              Thank You!
            </h1>
          </div>

          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">
            Hi <strong style="color: #fff;">${name}</strong>,
          </p>

          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to Apex Technify! We've received your message and our team will get back to you within 24 hours.
          </p>

          ${isPackageInquiry ? `
          <div style="background: linear-gradient(135deg, rgba(217,70,239,0.1), rgba(6,182,212,0.1)); border: 1px solid rgba(217,70,239,0.3); padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #fff; margin-top: 0; text-align: center;">Your Package Interest</h3>
            <p style="text-align: center; margin: 0;">
              <span style="color: #d946ef; font-size: 18px;">${service}</span><br>
              <span style="color: #06b6d4; font-size: 24px; font-weight: bold;">${packageInfo.tier} - $${packageInfo.price}</span>
            </p>
          </div>
          ` : ''}

          <div style="background: rgba(168,85,247,0.1); border-left: 4px solid #a855f7; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="color: #a855f7; margin: 0; font-weight: 500;">What happens next?</p>
            <ul style="color: #ccc; margin: 10px 0 0; padding-left: 20px; line-height: 1.8;">
              <li>Our team will review your requirements</li>
              <li>We'll prepare a personalized response</li>
              <li>You'll hear from us within 24 hours</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Looking forward to working with you!</p>
            <p style="color: #d946ef; font-weight: 500; margin: 0;">Team Apex Technify</p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(autoReplyToClient);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
