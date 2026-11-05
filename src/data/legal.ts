/**
 * Privacy Policy (/privacy-policy/) and Terms of Use (/terms/). DRAFT (3 Nov 2026) for the team and a legal review.
 * The privacy policy follows the structure of modscape.com.au/privacy-policy (Privacy Act 1988 and the Australian
 * Privacy Principles) and describes only what this site does: the three enquiry forms are emailed through Resend,
 * the site is hosted on Cloudflare (with Cloudflare Turnstile on the forms when it is switched on), fonts load from
 * Google Fonts, and there are no analytics or advertising cookies. Modscape publishes no terms, so the terms are a
 * standard Australian website terms of use, shaped around the Cloud Homes design tool.
 */

import { site } from "./site";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const legalUpdated = "3 November 2026";

const address = `${site.offices[0].lines.join(", ")}`;

export const privacySections: LegalSection[] = [
  {
    title: "About this policy",
    paragraphs: [
      "Cloud Modular respects your privacy. This policy explains how we collect, hold, use and share your personal information, and how you can access it, correct it or make a complaint. We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
    ],
  },
  {
    title: "What we collect",
    paragraphs: [
      "We collect the personal information we need to answer your enquiry and to design and deliver your project. Depending on how you contact us, this can include the following.",
    ],
    list: [
      "Your name, email address, phone number and organisation.",
      "Details of your project, such as your role, the sector, the location, the scale, the stage and your timing.",
      "For a Cloud Home, the home and finishes you chose and the address of your site.",
      "Anything else you tell us in a message, an email or a call.",
      "When you work with us, the information we need to prepare a proposal, enter into a contract and deliver your project.",
    ],
  },
  {
    title: "How we collect it",
    paragraphs: [
      "We collect personal information directly from you, when you send us an enquiry through this website, email or call us, or work with us on a project. If someone else gives us your details, for example a consultant on your project, we handle them in the same way.",
      "You can contact us without giving your full name, but we may not be able to answer your enquiry or prepare a proposal without it.",
    ],
  },
  {
    title: "Why we collect it",
    paragraphs: ["We use your personal information to do the following."],
    list: [
      "Reply to your enquiry and arrange a conversation.",
      "Review your site and prepare a proposal for your project or your Cloud Home.",
      "Design, manufacture, deliver and install your project, and look after it after handover.",
      "Keep business records and meet our legal, tax and reporting obligations.",
      "Tell you about our homes and services, if you have agreed to hear from us. You can ask us to stop at any time.",
    ],
  },
  {
    title: "Who we share it with",
    paragraphs: [
      "We share personal information only as needed for the purposes above. This can include the service providers who run our website and email, the consultants and contractors who work with us on your project, such as architects, engineers, building surveyors and builders, and our professional advisers. They may use your information only for the work they do for us or for your project.",
      "We may also disclose information where the law requires or allows it. We never sell personal information.",
    ],
  },
  {
    title: "Information held overseas",
    paragraphs: [
      "Some of our service providers store or process information outside Australia, including in the United States. Our team in Foshan, China, may also see project information when it is needed to design and manufacture your project. We take reasonable steps to make sure anyone who receives your information overseas handles it in line with the Australian Privacy Principles.",
    ],
  },
  {
    title: "This website",
    paragraphs: [
      "This website does not use analytics or advertising cookies, and we do not track you across other websites.",
      "When you send an enquiry, the form is emailed to our team through our email delivery provider. The forms may use Cloudflare Turnstile to check that a person, not a bot, is sending them.",
      "Like any website, our hosting provider handles technical information such as your IP address and browser type to deliver the site and protect it from misuse. Your browser also loads the site's fonts from Google Fonts, which receives your IP address when it does.",
      "Your Cloud Home design is kept in the page address, so you can save it or share it. We only receive it when you send it to us.",
    ],
  },
  {
    title: "Keeping it safe",
    paragraphs: [
      "We take reasonable steps to protect personal information from misuse, interference, loss and unauthorised access, change or disclosure. Only people who need it for their work can see it. We keep personal information only for as long as we need it for the purposes above or as the law requires, and then delete it or remove the details that identify you.",
    ],
  },
  {
    title: "Access and correction",
    paragraphs: [
      "You can ask to see the personal information we hold about you, and ask us to correct it if it is wrong, out of date or incomplete. Contact us using the details below. There is no fee to ask. If we cannot give you access, we will tell you why.",
    ],
  },
  {
    title: "Complaints",
    paragraphs: [
      "If you think we have not handled your personal information properly, please contact us first. We will look into it and reply within 30 days.",
      "If you are not satisfied with our reply, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      `For any privacy question, request or complaint, email ${site.email} or write to Cloud Modular, ${address}.`,
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      `We may update this policy from time to time, and the current version is always on this page. It was last updated on ${legalUpdated}.`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "About these terms",
    paragraphs: [
      "This website is run by Cloud Modular. By using it, you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    title: "Information on this site",
    paragraphs: [
      "The information on this site is general information about Cloud Modular, our homes and our services. It is not professional advice, and it does not take your site or your circumstances into account.",
      "We work to keep it accurate and up to date, but we do not promise that it is complete or free of errors. Projects shown on this site may still be in progress, and images, renders and 3D models are artist's impressions that may differ from the finished building.",
    ],
  },
  {
    title: "Cloud Homes, prices and proposals",
    paragraphs: [
      "The homes, finishes, options and prices shown on this site, including in the Cloud Homes design tool, are indicative and may change without notice. From prices are a starting point and do not include delivery, site works or extras unless we say so. The 3D home is a guide and may show items that are not included.",
      "Nothing on this site is an offer to sell or a quote. The price and what is included are set out in the written proposal we prepare for your site, and an agreement exists only once a written contract is signed.",
    ],
  },
  {
    title: "Enquiries",
    paragraphs: [
      "Sending us an enquiry or a design does not create a contract or commit you or us to anything. Please make sure the details you send are accurate. We handle them in line with our Privacy Policy.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The content of this site, including its text, designs, drawings, 3D models, images, video and logos, is owned by or licensed to Cloud Modular. You may view it and save or print a page, or your own Cloud Home design, for your personal use. You must not copy, adapt, publish or use it for any commercial purpose without our written permission.",
    ],
  },
  {
    title: "Using the site",
    paragraphs: [
      "You must not use this site in a way that breaks the law, interferes with how it works, tries to gain access to systems you are not allowed to use, or collects content from it by automated means. You must not send false or misleading information through our forms.",
    ],
  },
  {
    title: "Other websites",
    paragraphs: [
      "This site links to other websites, such as sources we cite and our LinkedIn page. We do not control those sites and are not responsible for their content or how they handle your information.",
    ],
  },
  {
    title: "Liability",
    paragraphs: [
      "To the extent the law allows, Cloud Modular is not liable for any loss or damage that comes from using this site or relying on its content, and we do not promise that the site will always be available or free of viruses.",
      "Nothing in these terms excludes, restricts or changes any right or remedy you have under the Australian Consumer Law or any other law that cannot be excluded.",
    ],
  },
  {
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of Western Australia, and you agree to the jurisdiction of its courts.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      `We may change these terms from time to time, and the current version is always on this page. They were last updated on ${legalUpdated}. For any question about them, email ${site.email}.`,
    ],
  },
];
