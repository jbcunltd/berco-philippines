// Delivery and Returns policies.
//
// Terms confirmed by Jumbo 2026-07-31 and reconciled against the supplier's published
// terms, so nothing here promises something Berco cannot stand behind:
//   supplier warranty ....... 5 years wood products, 1 year electrical
//   supplier production ..... 18-63 days depending on product and finish
//   supplier payment ........ 10% on PI, 40% after drawings, 50% before shipping
// Berco's own terms sit deliberately outside those: quotation within 7 working days,
// 70-90 day production including freight, 60/30/10 payment.
//
// Truth rules that shaped the wording: never hide fees, lead times or payment terms;
// never state a warranty Berco cannot honour; never imply a completed-project record.

export const POLICY_ORDER = ['delivery-policy', 'returns-policy', 'privacy-policy', 'terms']

export const POLICIES = {
  'delivery-policy': {
    name: 'Delivery & Installation',
    eyebrow: 'Policy',
    hero: 'Delivery & installation.',
    lead: 'What happens after you approve the design: how long it takes, what we need from your site, and what is included.',
    seoTitle: 'Delivery & Installation Policy | Berco',
    seoDesc: 'Berco delivery and installation policy for Philippine homes: lead times, scheduling, site access requirements, serviceable areas and what is included.',
    keywords: ['cabinetry delivery Philippines', 'kitchen installation policy', 'Berco delivery', 'cabinetry lead time Philippines'],
    updated: '31 July 2026',
    sections: [
      { h: 'Timeline', p: 'A quotation is prepared within 7 working days of an agreed scope. Once the design is approved and the deposit received, production runs 70 to 90 days depending on the materials specified. Melamine and lacquer finishes sit at the shorter end, solid wood and specialist finishes at the longer end. That window includes manufacturing, freight and customs clearance. Your designer confirms the expected date in writing before anything is ordered, and tells you if it moves.' },
      { h: 'What is included', list: [
        'Residential projects: delivery and installation are included within serviceable areas.',
        'Commercial projects: delivery may require additional logistics planning, quoted before the work is confirmed.',
        'Remote or difficult-access locations may carry an additional delivery fee. Where that applies, it is disclosed in your quotation, never added afterwards.',
      ] },
      { h: 'Scheduling', list: [
        'Delivery and installation dates are confirmed after final design approval and the agreed payment.',
        'You receive a delivery window at least 3 days in advance.',
        'Changes to a confirmed date need at least 72 hours notice.',
      ] },
      { h: 'What we need from your site', p: 'The area must be clear, safe and accessible on the agreed date, with the room ready to receive cabinetry. Obstructions, unsafe conditions or a site that is not ready may mean rescheduling, and a return visit may be charged. We will tell you what "ready" means for your project well before the date, so there are no surprises.' },
      { h: 'Weather and conditions beyond our control', p: 'Severe weather can make delivery or installation unsafe, or risk damaging the cabinetry. If that happens we will tell you promptly and move you to the next available slot. We would rather lose a day than fit a kitchen badly.' },
      { h: 'Payment', p: 'Payment is staged: 60% deposit to begin, 30% before delivery, and the final 10% after installation is complete. The last payment is deliberately after the work. It is our incentive to finish properly.' },
    ],
  },

  'returns-policy': {
    name: 'Returns & Warranty',
    eyebrow: 'Policy',
    hero: 'Returns & warranty.',
    lead: 'Custom cabinetry cannot be returned like a shop-bought item. Here is what that means, what is covered, and for how long.',
    seoTitle: 'Returns, Cancellation & Warranty Policy | Berco',
    seoDesc: 'Berco returns and warranty policy: 5-year cabinetry warranty, 1-year installation workmanship, what is covered and how to make a claim.',
    keywords: ['cabinetry warranty Philippines', 'kitchen cabinet warranty', 'Berco returns policy', 'custom cabinetry cancellation'],
    updated: '31 July 2026',
    sections: [
      { h: 'Custom work cannot be returned', p: 'Everything we make is built to your room and your specification, so it cannot be resold or restocked. Once materials have been fabricated or installation has begun, the order cannot be returned. This is normal for custom cabinetry, and we would rather you read it here than discover it later.' },
      { h: 'Your signed agreement governs the order', p: 'Every project is confirmed by a signed contract and quotation. That agreement sets out the scope, the schedule, the payment stages and what happens in any situation covered by it. Nothing on this page replaces or adds to your contract. Where the two differ, your contract applies.' },
      { h: 'Orders are a commitment', p: 'Once the contract is signed and the order is placed, it is a firm commitment and cannot be cancelled. Cabinetry is cut and finished to your room, so it cannot be reassigned to another project or returned to the manufacturer. Before you sign, nothing is committed. That is the point to ask every question you have, and we would rather you took the time.' },
      { h: 'What is not refundable', list: [
        'Custom materials once they have been ordered or fabricated.',
        'Completed installations.',
        'The site measurement fee, once the visit has been made.',
        'Permits, inspection fees and third-party services.',
        'Damage caused by misuse, alteration, or conditions outside normal use.',
      ] },
      { h: 'Warranty', p: 'Two things are covered, for different lengths of time, because they are different kinds of work.', list: [
        'Cabinetry: 5 years. Covers manufacturing defects in the cabinetry itself, backed by the manufacturer.',
        'Our installation workmanship: 1 year. Covers how it was fitted: alignment, fixings and the quality of the install.',
        'Appliances and electrical items are covered by their own manufacturer warranty, which is provided with the product.',
      ] },
      { h: 'Service visits', p: 'In the first year, a warranty visit is free. After the first year the cabinetry is still covered and we will supply the replacement part, but the visit and labour are charged. We quote that before we come, so you can decide. We say this plainly because most warranties bury it.' },
      { h: 'If something is wrong', p: 'Contact us with your name and contact details, the project address, your invoice number, a description of the issue and photographs. Photographs matter. They usually let us bring the right part on the first visit instead of the second. We will confirm the next step and a timeframe.' },
      { h: 'Resolving problems', p: 'We will work with you to put things right. If a matter cannot be resolved directly, it may be escalated to mediation or arbitration under Philippine consumer protection law. Your statutory rights are not affected by this policy.' },
    ],
  },

  // Written to match what the site ACTUALLY does, not a generic template. Every
  // claim here is checkable against the code: the inquiry form fields are the
  // ones in InquiryForm.js, there is genuinely no database, and the three
  // measurement tools are the three loaded in layout.js / Consent.js.
  // If any of those change, this page changes with them.
  'privacy-policy': {
    name: 'Privacy',
    eyebrow: 'Policy',
    hero: 'Privacy.',
    lead: 'What this site collects, what sets a cookie and what does not, and how to change your mind.',
    seoTitle: 'Privacy Policy | Berco',
    seoDesc: 'How Berco handles inquiry details and website measurement: what is collected, which tools set cookies, who processes it, and your rights under the Philippine Data Privacy Act.',
    keywords: ['Berco privacy policy', 'data privacy Philippines', 'cookie policy Berco'],
    updated: '3 October 2026',
    sections: [
      { h: 'When you send an inquiry', p: 'The contact form asks for your name and mobile number, what you are planning and roughly when. Email address, location and a message are optional. The form works without them. We ask for a mobile number because that is how we actually follow up.' },
      { h: 'Where it goes', p: 'Submissions are delivered to our team as an email, through a sending service called Resend. There is no customer database behind this website and no account for you to create. Your details arrive in an inbox and stay there, the same as if you had emailed us directly.' },
      { h: 'Cookies and measurement', p: 'Three tools measure how the site is used. They are not equivalent, and they do not wait for the same thing, so we list them separately rather than asking you to accept one undifferentiated bundle.', list: [
        'Vercel Web Analytics counts page views. It sets no cookies and does not identify you, so it runs whether or not you accept.',
        'Google Analytics shows how people found the site and which pages lead to an inquiry. It is on the page from the start, with measurement switched off: no cookie, nothing that identifies you. Accepting switches it on, and that is when it sets cookies.',
        'Meta Pixel lets us show our Facebook and Instagram ads to people who have visited this site, and tells us which ads lead to a real inquiry. This one does not wait for your answer. It loads shortly after the page finishes, and it sets a cookie called _fbp, unless you have declined on this device before.',
      ] },
      { h: 'What the Meta pixel sets, and why we are honest about it', p: 'We would rather say this plainly than have a banner that is technically a lie. The pixel sets _fbp, a random identifier in your browser that lasts up to three months, and it tells Meta that this device opened a page on bercohome.com, which page, and whether you sent an inquiry from it. It does not read your name, your number or anything you typed into the form, and we do not use it to build a profile of you. We run it on arrival because most people who reach us from an ad never answer a banner at all, and without the pixel we cannot tell which of our ads are worth running. If you would rather not be part of that, Decline, and the sections below are what happens.' },
      { h: 'Before you answer', p: 'Google stores nothing: its consent signals start at denied in the page itself, so the Google tag runs without storing anything. Vercel\u2019s page counter stores nothing either. The Meta pixel is the exception, and it is already running.' },
      { h: 'If you decline', p: 'The _fbp cookie is deleted, the Meta pixel is switched off for the rest of your visit so nothing more is sent to Meta, and the Google tag stays in its switched-off state: it sets no cookie and names nobody, though it does still send Google an anonymous, cookieless ping that there was a page view. Your choice is remembered, so on your next visit from this browser the pixel is never loaded in the first place. Declining does not limit anything on the site. Every page, catalogue and the contact form work exactly the same either way.' },
      { h: 'If you accept', p: 'The Meta pixel carries on as it already was, and the Google tag switches on and starts setting its own cookies. Nothing new is asked of you.' },
      { h: 'Changing your mind', p: 'Your choice is stored in your own browser, not on our servers. To change it, clear the site data for bercohome.com in your browser settings and the choice will be asked again on your next visit.' },
      { h: 'Who else handles it', list: [
        'Resend delivers the inquiry email.',
        'Vercel hosts the site and serves the pages.',
        'Meta, for the pixel described above, unless you have declined.',
        'Google, for analytics, only if you accepted.',
      ] },
      { h: 'Your rights', p: 'Under the Philippine Data Privacy Act of 2012 (RA 10173) you can ask what information we hold about you, ask us to correct it, or ask us to delete it. Email sales@bercohome.com and we will action it. We do not sell your details, and we do not add you to a mailing list because you sent an inquiry.' },
      { h: 'Questions', p: 'Anything unclear here, ask us at sales@bercohome.com. If this page and what the site does ever disagree, the site is wrong and we want to know.' },
    ],
  },
  'terms': {
    name: 'Terms',
    eyebrow: 'Policy',
    hero: 'Terms of use.',
    lead: 'What using this website does and does not commit you to, how quotations work, and whose images you are looking at.',
    seoTitle: 'Terms & Conditions | Berco',
    seoDesc: 'Terms of use for the Berco website: how quotations and design work are offered, how imagery is labeled, and the written agreement that governs an actual order.',
    keywords: ['Berco terms and conditions', 'custom cabinetry terms Philippines'],
    updated: '7 September 2026',
    sections: [
      { h: 'What this site is', p: 'This website shows what Berco builds and lets you start a conversation about your own space. Browsing it, downloading a catalogue, or sending an inquiry commits you to nothing.' },
      { h: 'Quotations and pricing', p: 'We do not publish prices here, because every project is measured, specified and quoted individually. A quotation becomes binding only when both sides confirm it in writing; until then it is an offer, and its validity period is stated on the quotation itself.' },
      { h: 'Design work and site visits', p: 'Design concepts are prepared free of charge. A site measurement visit may carry a fee, which is always disclosed before you book it and credited to your order if you proceed. Design drawings remain Berco\u2019s work product until an order is confirmed.' },
      { h: 'Images on this site', p: 'Some imagery shows the manufacturer systems and materials we build with, used as product reference; photographs of finished projects are our own. Please do not reuse content from this site commercially without asking us first.' },
      { h: 'Accuracy', p: 'We keep specifications, materials and claims on this site aligned with what we can actually deliver. If something here ever disagrees with what we tell you directly, tell us. The site is wrong and we want to fix it.' },
      { h: 'Orders, delivery and returns', p: 'An actual order is governed by its written agreement together with our Delivery & Installation and Returns policies, linked below. Nothing on this website adds to or replaces those written terms.' },
      { h: 'Governing law', p: 'These terms and any order are governed by the laws of the Republic of the Philippines.' },
      { h: 'Questions', p: 'Anything unclear here, ask us at sales@bercohome.com.' },
    ],
  },
}
