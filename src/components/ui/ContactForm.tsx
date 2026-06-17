"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

type Props = {
  onSuccess?: () => void;
};

const contactSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  organization: Yup.string()
    .min(2, "Organization must be at least 2 characters")
    .required("Organization is required"),
  institution: Yup.string()
    .min(2, "Institution must be at least 2 characters")
    .required("Institution is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

function ContactForm({ onSuccess }: Props) {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          fullName: "",
          organization: "",
          institution: "",
          email: "",
          message: "",
        }}
        validationSchema={contactSchema}
        onSubmit={async (values, { resetForm }) => {
          setButtonDisabled(true);
          setMessage("");
          setStatus(null);

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok || data.status >= 400) {
              setStatus(data.status || response.status);
              setMessage(
                data.message ||
                  "Error sending message. Please try again later.",
              );
              setTimeout(() => {
                setMessage("");
                setStatus(null);
                setButtonDisabled(false);
              }, 3000);
              return;
            }

            setStatus(200);
            setMessage(
              "Thank you for contacting me! I'll get back to you soon.",
            );

            setTimeout(() => {
              setMessage("");
              setStatus(null);
              resetForm();
              setButtonDisabled(false);
              if (onSuccess) {
                onSuccess();
              }
            }, 4000);
          } catch (error) {
            console.error("Contact form error:", error);
            setStatus(500);
            setMessage("Error sending message. Please try again later.");
            setTimeout(() => {
              setMessage("");
              setStatus(null);
              setButtonDisabled(false);
            }, 3000);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-[SpaceGroteskMedium] font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <Field
                type="text"
                name="fullName"
                id="fullName"
                className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 font-[SpaceGroteskRegular] outline-none transition-all focus:ring-2 focus:ring-[#C44829] focus:border-transparent ${
                  errors.fullName && touched.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="John Doe"
                autoComplete="name"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500 text-sm mt-1 font-[SpaceGroteskRegular]"
              />
            </div>

            {/* Organization */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-[SpaceGroteskMedium] font-medium text-gray-700 mb-1"
              >
                Organization/Institution *
              </label>
              <Field
                type="text"
                name="organization"
                id="organization"
                className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 font-[SpaceGroteskRegular] outline-none transition-all focus:ring-2 focus:ring-[#C44829] focus:border-transparent ${
                  errors.organization && touched.organization
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Your Organization"
                autoComplete="organization"
              />
              <ErrorMessage
                name="organization"
                component="p"
                className="text-red-500 text-sm mt-1 font-[SpaceGroteskRegular]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-[SpaceGroteskMedium] font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 font-[SpaceGroteskRegular] outline-none transition-all focus:ring-2 focus:ring-[#C44829] focus:border-transparent ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="john@example.com"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1 font-[SpaceGroteskRegular]"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-[SpaceGroteskMedium] font-medium text-gray-700 mb-1"
              >
                Message *
              </label>
              <Field
                as="textarea"
                name="message"
                id="message"
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 font-[SpaceGroteskRegular] outline-none transition-all focus:ring-2 focus:ring-[#C44829] focus:border-transparent resize-none ${
                  errors.message && touched.message
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Tell me about your inquiry..."
              />
              <ErrorMessage
                name="message"
                component="p"
                className="text-red-500 text-sm mt-1 font-[SpaceGroteskRegular]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={buttonDisabled}
              className="w-full rounded-full bg-[#C44829] px-6 py-3 font-bold text-white font-[SpaceGroteskMedium] transition-all hover:bg-[#B03E25] hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#C44829] focus:ring-offset-2"
            >
              {buttonDisabled ? "Sending..." : "Send Message"}
            </button>

            {/* Status Message */}
            {message && (
              <p
                className={`text-center pt-2 font-[SpaceGroteskMedium] font-medium ${
                  status !== 200 ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactForm;
