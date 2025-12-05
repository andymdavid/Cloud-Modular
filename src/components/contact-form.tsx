"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formOptions } from "@/content/site";

const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  "https://formspree.io/f/your-form-id";

type FormStatus = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<string, string>>;

const requiredFields = ["name", "email", "message", "consent"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validate = (formData: FormData) => {
    const newErrors: Errors = {};
    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value) {
        newErrors[field] = "This field is required.";
      }
    });

    const email = formData.get("email") as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionError(null);
    const formData = new FormData(event.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setSubmissionError(
        "Sorry, there was an error submitting your form. Please try again or email us directly at info@cloudmodular.com.au.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-sm bg-warm-white p-6 text-center text-charcoal">
        <p className="text-2xl font-serif">Thank you!</p>
        <p className="mt-3 text-mid-gray">
          We&rsquo;ve received your inquiry and will be in touch within 24 hours.
        </p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <input type="text" name="bot-field" className="hidden" tabIndex={-1} />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Full Name *" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            placeholder="John Smith"
          />
        </FormField>
        <FormField label="Email Address *" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            placeholder="john@example.com"
          />
        </FormField>
        <FormField label="Phone Number" name="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            placeholder="+61 4XX XXX XXX"
          />
        </FormField>
        <FormField label="Company Name" name="company">
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            placeholder="Your Company Pty Ltd"
          />
        </FormField>
        <FormField label="Project Type" name="projectType">
          <select
            id="projectType"
            name="projectType"
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select project type...
            </option>
            {formOptions.projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Project Location" name="location">
          <input
            id="location"
            name="location"
            type="text"
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            placeholder="Perth, WA"
          />
        </FormField>
        <FormField label="When are you looking to build?" name="timeline">
          <select
            id="timeline"
            name="timeline"
            className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select timeline...
            </option>
            {formOptions.timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Tell us about your project *" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-sm border-2 border-light-gray bg-white p-4 text-base focus:border-forest focus:outline-none"
          placeholder="Please describe your project, including size, scope, and any specific requirements..."
        />
      </FormField>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-5 w-5 rounded-sm border-2 border-light-gray accent-forest"
        />
        <label htmlFor="consent" className="text-sm text-mid-gray">
          I agree to be contacted by Cloud Modular regarding my inquiry. *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-600" role="alert">
          {errors.consent}
        </p>
      )}
      {submissionError && (
        <p className="text-sm text-red-600" role="alert">
          {submissionError}
        </p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
};

function FormField({ label, name, children, error }: FormFieldProps) {
  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium text-charcoal"
    >
      {label}
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}
