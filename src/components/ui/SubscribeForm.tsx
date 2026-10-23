"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const requiredSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function SubscribeForm() {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  return (
    <div className="flex w-full max-w-[500px] flex-col space-y-3">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={requiredSchema}
        onSubmit={async (values, { resetForm }) => {
          setButtonDisabled(true);
          setSubmitting(true);
          try {
            const response = await fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values?.email,
              }),
            });
            const datas = await response.json();
            if (datas.status >= 400) {
              setStatus(datas.status);
              setMessage("Error joining the newsletter. Please try again later.");
              setTimeout(() => {
                setMessage("");
                setButtonDisabled(false);
                setSubmitting(false);
              }, 2000);
              return;
            }

            setStatus(201);
            setMessage("Thank you for subscribing my newsletter!");
            setTimeout(() => {
              setMessage("");
              resetForm();
              setButtonDisabled(false);
              setSubmitting(false);
            }, 4000);
          } catch (error) {
            console.error("Newsletter subscription error:", error);
            setStatus(500);
            setMessage("Error joining the newsletter. Please try again later.");
            setTimeout(() => {
              setMessage("");
              setButtonDisabled(false);
              setSubmitting(false);
            }, 2000);
          }
        }}
      >
        <Form className="w-full">
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-white bg-black p-2 font-[SpaceGroteskRegular] text-white min-[420px]:flex-row min-[420px]:items-center min-[420px]:rounded-full">
            <Field
              type="email"
              name="email"
              className="min-w-0 w-full flex-1 rounded-md bg-transparent px-4 py-3 outline-none placeholder:text-white/60"
              placeholder="Enter your email"
              autoComplete="email"
              aria-label="Email address"
            />
            <button className="w-full rounded-full bg-[#E1462B] px-5 py-3 font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-80 min-[420px]:w-auto min-[420px]:py-2" type="submit" disabled={buttonDisabled}>
              {submitting ? "Submitting" : "Subscribe"}
            </button>
          </div>
          <ErrorMessage
            name="email"
            component="p"
            className="pt-2 text-sm font-bold text-red-500"
          />
          {message && <p className={`${status !== 201 ? "text-red-500" : "text-green-500"} pt-4 font-black`}>{message}</p>}
        </Form>
      </Formik>
    </div>
  );
}

export default SubscribeForm;
