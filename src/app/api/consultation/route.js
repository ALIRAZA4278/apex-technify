import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const getAdminEmailTemplate = ({ name, email, phone, service, preferredTime, message }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

              <!-- Header -->
              <tr>
                <td style="background: #0a0a0f; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 1px;">
                    APEX TECHNIFY
                  </h1>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td style="padding: 30px 40px 20px; border-bottom: 1px solid #eee;">
                  <h2 style="color: #333; margin: 0; font-size: 18px; font-weight: 600;">New Consultation Request</h2>
                  <p style="color: #666; margin: 8px 0 0; font-size: 14px;">Service: ${service}</p>
                </td>
              </tr>

              <!-- Schedule Info -->
              <tr>
                <td style="padding: 25px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-radius: 8px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Preferred Time</p>
                        <p style="color: #d946ef; font-size: 16px; font-weight: 600; margin: 0;">${preferredTime || 'Not specified'}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Client Info -->
              <tr>
                <td style="padding: 0 40px 25px;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Client Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px; width: 80px;">Name</td>
                      <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                      <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d946ef; font-size: 14px; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                      <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #d946ef; font-size: 14px; text-decoration: none;">${phone}</a></td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              ${message ? `
              <tr>
                <td style="padding: 0 40px 25px;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Additional Notes</p>
                  <p style="color: #444; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px;">${message}</p>
                </td>
              </tr>
              ` : ''}

              <!-- Actions -->
              <tr>
                <td style="padding: 0 40px 30px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right: 10px;">
                        <a href="mailto:${email}" style="display: inline-block; background: #d946ef; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Reply</a>
                      </td>
                      <td>
                        <a href="tel:${phone}" style="display: inline-block; background: #0a0a0f; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Call</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
                  <p style="color: #999; font-size: 12px; margin: 0;">Apex Technify</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const getClientEmailTemplate = ({ name, service, preferredTime }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

              <!-- Header -->
              <tr>
                <td style="background: #0a0a0f; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 1px;">
                    APEX TECHNIFY
                  </h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #333; margin: 0 0 20px; font-size: 20px; font-weight: 600;">Consultation Request Received</h2>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    Hi ${name},
                  </p>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    Thank you for booking a consultation with Apex Technify. We're excited to discuss your ${service} project and explore how we can help.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Your Consultation</p>
                        <p style="color: #333; font-size: 16px; font-weight: 600; margin: 0 0 15px;">${service}</p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 6px;">
                          <tr>
                            <td style="padding: 15px;">
                              <p style="color: #888; font-size: 11px; text-transform: uppercase; margin: 0 0 5px;">Preferred Time</p>
                              <p style="color: #d946ef; font-size: 15px; font-weight: 600; margin: 0;">${preferredTime || 'To be confirmed'}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-left: 3px solid #d946ef; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="color: #333; font-size: 14px; font-weight: 600; margin: 0 0 12px;">What to expect:</p>
                        <p style="color: #666; font-size: 14px; line-height: 1.8; margin: 0;">
                          1. Discussion of your project requirements<br>
                          2. Expert recommendations for your needs<br>
                          3. Clear pricing and timeline overview<br>
                          4. Q&A session
                        </p>
                      </td>
                    </tr>
                  </table>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    We'll send you a meeting link before the scheduled time. If you need to reschedule, please reply to this email.
                  </p>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 5px;">
                    Best regards,
                  </p>
                  <p style="color: #333; font-size: 15px; font-weight: 600; margin: 0;">
                    Team Apex Technify
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #f9f9f9; padding: 25px 40px; text-align: center; border-top: 1px solid #eee;">
                  <p style="color: #666; font-size: 13px; margin: 0 0 15px;">Need to reschedule?</p>
                  <p style="margin: 0 0 15px;">
                    <a href="mailto:apextechnify@gmail.com" style="color: #d946ef; font-size: 13px; text-decoration: none;">apextechnify@gmail.com</a>
                  </p>
                  <table cellpadding="0" cellspacing="0" style="margin: 0 auto 15px;">
                    <tr>
                      <td style="padding: 0 8px;">
                        <a href="https://www.instagram.com/apextechnify?igsh=MThqZnZkY2ZidGZnYw==" style="display: inline-block; width: 32px; height: 32px; background: #E4405F; border-radius: 6px; text-align: center; line-height: 32px; text-decoration: none; color: #fff; font-size: 14px;">in</a>
                      </td>
                      <td style="padding: 0 8px;">
                        <a href="https://www.facebook.com/share/1BsaF4wPGr/" style="display: inline-block; width: 32px; height: 32px; background: #1877F2; border-radius: 6px; text-align: center; line-height: 32px; text-decoration: none; color: #fff; font-size: 14px;">fb</a>
                      </td>
                    </tr>
                  </table>
                  <p style="color: #999; font-size: 11px; margin: 0;">
                    © ${new Date().getFullYear()} Apex Technify. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export async function POST(request) {
  try {
    const { name, email, phone, service, preferredTime, message } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Please fill all required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NM_EMAIL_USER,
        pass: process.env.NM_EMAIL_PW,
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 });
    }

    await transporter.sendMail({
      from: `"Apex Technify" <${process.env.NM_EMAIL_USER}>`,
      to: process.env.NM_EMAIL_USER,
      subject: `Consultation Request - ${service}`,
      html: getAdminEmailTemplate({ name, email, phone, service, preferredTime, message }),
    });

    await transporter.sendMail({
      from: `"Apex Technify" <${process.env.NM_EMAIL_USER}>`,
      to: email,
      replyTo: process.env.NM_EMAIL_USER,
      subject: `Consultation Confirmed - ${service}`,
      html: getClientEmailTemplate({ name, service, preferredTime }),
    });

    return NextResponse.json({ message: 'Consultation booked successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error in consultation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
