import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { fullName, organization, email, message } = await req.json();

    // Validate required fields
    if (!fullName || !organization || !email || !message) {
      return NextResponse.json(
        { status: 400, message: "All fields are required" },
        { status: 400 },
      );
    }

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { status: 500, message: "Email service is not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    // Send email notification using Resend
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const toEmail = process.env.RESEND_TO_EMAIL || "fahrinurilll@gmail.com";

      console.log(`Attempting to send email from: ${fromEmail} to: ${toEmail}`);

      const emailResult = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Contact Form Submission from ${fullName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #C44829; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 20px; }
                .field-label { font-weight: bold; color: #C44829; margin-bottom: 5px; }
                .field-value { background-color: white; padding: 10px; border-radius: 4px; border-left: 3px solid #C44829; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">${fullName}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Organization/Institution:</div>
                    <div class="field-value">${organization}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="field-label">Message:</div>
                    <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
                  </div>
                  <div class="footer">
                    <p>This email was sent from your website contact form.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log("Email sent successfully:", emailResult);

      // Check if there's an error in the response
      if (emailResult.error) {
        console.error("Resend API Error:", emailResult.error);
        return NextResponse.json(
          {
            status: emailResult.error.statusCode || 500,
            message: emailResult.error.message || "Failed to send email",
          },
          { status: emailResult.error.statusCode || 500 },
        );
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { status: 500, message: "Failed to send email notification" },
        { status: 500 },
      );
    }

    // Optional: Add email to Mailchimp
    try {
      const MailchimpKey = process.env.MAILCHIMP_API_KEY;
      const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
      const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

      if (MailchimpKey && MailchimpServer && MailchimpAudience) {
        const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

        const mailchimpResponse = await fetch(customUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `anystring:${MailchimpKey}`,
            ).toString("base64")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: fullName.split(" ")[0] || fullName,
              LNAME: fullName.split(" ").slice(1).join(" ") || "",
            },
            tags: ["contact-form"],
          }),
        });

        if (!mailchimpResponse.ok) {
          console.warn(
            "Mailchimp subscription failed (non-critical):",
            await mailchimpResponse.text(),
          );
          // Don't fail the entire request if Mailchimp fails
        } else {
          console.log("Email added to Mailchimp successfully");
        }
      }
    } catch (mailchimpError) {
      // Log but don't fail the request
      console.warn("Mailchimp error (non-critical):", mailchimpError);
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Message sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
