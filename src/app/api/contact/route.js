import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple professional email templates
const getAdminEmailTemplate = ({ name, email, phone, service, packageInfo, message, inquiryType }) => {
  const isPackage = inquiryType === 'package';
  const isService = inquiryType === 'service';
  const isMeeting = inquiryType === 'meeting';

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
                  <h2 style="color: #333; margin: 0; font-size: 18px; font-weight: 600;">
                    ${isPackage ? 'New Package Inquiry' : isMeeting ? 'Meeting Request' : isService ? 'Service Inquiry' : 'New Contact Message'}
                  </h2>
                  ${isPackage ? `<p style="color: #d946ef; margin: 8px 0 0; font-size: 14px;">${service} - ${packageInfo.tier} ($${packageInfo.price})</p>` : ''}
                  ${isService && !isPackage ? `<p style="color: #666; margin: 8px 0 0; font-size: 14px;">Service: ${service}</p>` : ''}
                  ${isMeeting ? `<p style="color: #666; margin: 8px 0 0; font-size: 14px;">Consultation: ${service}</p>` : ''}
                </td>
              </tr>

              <!-- Client Info -->
              <tr>
                <td style="padding: 25px 40px;">
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
                    ${phone ? `
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                      <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #d946ef; font-size: 14px; text-decoration: none;">${phone}</a></td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding: 0 40px 25px;">
                  <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Message</p>
                  <p style="color: #444; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px;">${message}</p>
                </td>
              </tr>

              <!-- Actions -->
              <tr>
                <td style="padding: 0 40px 30px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right: 10px;">
                        <a href="mailto:${email}" style="display: inline-block; background: #d946ef; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Reply</a>
                      </td>
                      ${phone ? `
                      <td>
                        <a href="tel:${phone}" style="display: inline-block; background: #0a0a0f; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Call</a>
                      </td>
                      ` : ''}
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

const getClientEmailTemplate = ({ name, service, packageInfo, inquiryType }) => {
  const isPackage = inquiryType === 'package';
  const isService = inquiryType === 'service';
  const isMeeting = inquiryType === 'meeting';

  let title = 'Thank You for Contacting Us';
  let description = "We've received your message and will get back to you within 24 hours.";

  if (isPackage) {
    title = 'Package Inquiry Received';
    description = `Thank you for your interest in our ${packageInfo.tier} package for ${service}. Our team will review your requirements and get back to you shortly.`;
  } else if (isMeeting) {
    title = 'Consultation Request Received';
    description = `Thank you for requesting a consultation for ${service}. We'll contact you soon to schedule a convenient time.`;
  } else if (isService) {
    title = 'Inquiry Received';
    description = `Thank you for your interest in our ${service} services. Our team will review your requirements and respond shortly.`;
  }

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
                  <h2 style="color: #333; margin: 0 0 20px; font-size: 20px; font-weight: 600;">${title}</h2>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    Hi ${name},
                  </p>

                  <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px;">
                    ${description}
                  </p>

                  ${isPackage ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Your Selection</p>
                        <p style="color: #333; font-size: 16px; font-weight: 600; margin: 0;">${service}</p>
                        <p style="color: #d946ef; font-size: 20px; font-weight: 700; margin: 8px 0 0;">${packageInfo.tier} - $${packageInfo.price}</p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-left: 3px solid #d946ef; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="color: #333; font-size: 14px; font-weight: 600; margin: 0 0 12px;">What happens next?</p>
                        <p style="color: #666; font-size: 14px; line-height: 1.8; margin: 0;">
                          1. Our team reviews your requirements<br>
                          2. We prepare a personalized response<br>
                          3. You'll hear from us within 24 hours
                        </p>
                      </td>
                    </tr>
                  </table>

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
                  <p style="color: #666; font-size: 13px; margin: 0 0 15px;">Need immediate help?</p>
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
    const { name, email, phone, service, package: packageInfo, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Determine inquiry type
    let inquiryType = 'general';
    if (packageInfo && packageInfo.tier && packageInfo.tier !== 'Inquiry' && packageInfo.tier !== 'Meeting') {
      inquiryType = 'package';
    } else if (packageInfo && packageInfo.tier === 'Meeting') {
      inquiryType = 'meeting';
    } else if (service) {
      inquiryType = 'service';
    }

    // Subject lines
    let adminSubject = 'New Contact Message';
    let clientSubject = 'Thank you for contacting Apex Technify';

    if (inquiryType === 'package') {
      adminSubject = `Package Inquiry: ${service} - ${packageInfo.tier}`;
      clientSubject = `Package Inquiry Received - ${service}`;
    } else if (inquiryType === 'meeting') {
      adminSubject = `Meeting Request: ${service}`;
      clientSubject = `Consultation Request Received - ${service}`;
    } else if (inquiryType === 'service') {
      adminSubject = `Service Inquiry: ${service}`;
      clientSubject = `Inquiry Received - ${service}`;
    }

    const { error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NM_EMAIL_USER,
      replyTo: email,
      subject: adminSubject,
      html: getAdminEmailTemplate({ name, email, phone, service, packageInfo, message, inquiryType }),
    });

    if (adminError) {
      console.error('Resend admin email failed:', adminError);
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 });
    }

    const { error: clientError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      replyTo: process.env.NM_EMAIL_USER,
      subject: clientSubject,
      html: getClientEmailTemplate({ name, service, packageInfo, inquiryType }),
    });

    if (clientError) {
      console.error('Resend client email failed:', clientError);
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
