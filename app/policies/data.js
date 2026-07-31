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

export const POLICY_ORDER = ['delivery-policy', 'returns-policy']

export const POLICIES = {
  'delivery-policy': {
    name: 'Delivery & Installation',
    eyebrow: 'Policy',
    hero: 'Delivery & installation.',
    lead: 'What happens after you approve the design — how long it takes, what we need from your site, and what is included.',
    seoTitle: 'Delivery & Installation Policy | Berco',
    seoDesc: 'Berco delivery and installation policy for Philippine homes: lead times, scheduling, site access requirements, serviceable areas and what is included.',
    keywords: ['cabinetry delivery Philippines', 'kitchen installation policy', 'Berco delivery', 'cabinetry lead time Philippines'],
    updated: '31 July 2026',
    sections: [
      { h: 'Timeline', p: 'A quotation is prepared within 7 working days of an agreed scope. Once the design is approved and the deposit received, production runs 70 to 90 days depending on the materials specified — melamine and lacquer finishes sit at the shorter end, solid wood and specialist finishes at the longer end. That window includes manufacturing, freight and customs clearance. Your designer confirms the expected date in writing before anything is ordered, and tells you if it moves.' },
      { h: 'What is included', list: [
        'Residential projects: delivery and installation are included within serviceable areas.',
        'Commercial projects: delivery may require additional logistics planning, quoted before the work is confirmed.',
        'Remote or difficult-access locations may carry an additional delivery fee. Where that applies, it is disclosed in your quotation — never added afterwards.',
      ] },
      { h: 'Scheduling', list: [
        'Delivery and installation dates are confirmed after final design approval and the agreed payment.',
        'You receive a delivery window at least 3 days in advance.',
        'Changes to a confirmed date need at least 72 hours notice.',
      ] },
      { h: 'What we need from your site', p: 'The area must be clear, safe and accessible on the agreed date, with the room ready to receive cabinetry. Obstructions, unsafe conditions or a site that is not ready may mean rescheduling, and a return visit may be charged. We will tell you what "ready" means for your project well before the date, so there are no surprises.' },
      { h: 'Weather and conditions beyond our control', p: 'Severe weather can make delivery or installation unsafe, or risk damaging the cabinetry. If that happens we will tell you promptly and move you to the next available slot. We would rather lose a day than fit a kitchen badly.' },
      { h: 'Payment', p: 'Payment is staged: 60% deposit to begin, 30% before delivery, and the final 10% after installation is complete. The last payment is deliberately after the work — it is our incentive to finish properly.' },
    ],
  },

  'returns-policy': {
    name: 'Returns & Warranty',
    eyebrow: 'Policy',
    hero: 'Returns & warranty.',
    lead: 'Custom cabinetry cannot be returned like a shop-bought item. Here is exactly what can be cancelled, what is covered, and for how long.',
    seoTitle: 'Returns, Cancellation & Warranty Policy | Berco',
    seoDesc: 'Berco returns, cancellation and warranty policy: 5-year cabinetry warranty, 1-year installation workmanship, what can be cancelled and how to make a claim.',
    keywords: ['cabinetry warranty Philippines', 'kitchen cabinet warranty', 'Berco returns policy', 'custom cabinetry cancellation'],
    updated: '31 July 2026',
    sections: [
      { h: 'Custom work cannot be returned', p: 'Everything we make is built to your room and your specification, so it cannot be resold or restocked. Once materials have been fabricated or installation has begun, the order cannot be returned. This is normal for custom cabinetry, and we would rather you read it here than discover it later.' },
      { h: 'Cancelling before production', p: 'You can cancel before your order is committed to production. Your deposit is refundable at that point, less the design and consultation work already carried out and any costs already committed on your behalf. Once drawings are confirmed and the order is placed with the factory, those costs are locked in and cannot be recovered — your designer will tell you clearly when that point is reached, before it happens.' },
      { h: 'What is not refundable', list: [
        'Custom materials once they have been ordered or fabricated.',
        'Completed installations.',
        'Design and consultation fees.',
        'Permits, inspection fees and third-party services.',
        'Damage caused by misuse, alteration, or conditions outside normal use.',
      ] },
      { h: 'Warranty', p: 'Two things are covered, for different lengths of time, because they are different kinds of work.', list: [
        'Cabinetry — 5 years. Covers manufacturing defects in the cabinetry itself, backed by the manufacturer.',
        'Our installation workmanship — 1 year. Covers how it was fitted: alignment, fixings and the quality of the install.',
        'Appliances and electrical items are covered by their own manufacturer warranty, which is provided with the product.',
      ] },
      { h: 'Service visits', p: 'In the first year, a warranty visit is free. After the first year the cabinetry is still covered and we will supply the replacement part, but the visit and labour are charged. We quote that before we come, so you can decide. We say this plainly because most warranties bury it.' },
      { h: 'If something is wrong', p: 'Contact us with your name and contact details, the project address, your invoice number, a description of the issue and photographs. Photographs matter — they usually let us bring the right part on the first visit instead of the second. We will confirm the next step and a timeframe.' },
      { h: 'Resolving problems', p: 'We will work with you to put things right. If a matter cannot be resolved directly, it may be escalated to mediation or arbitration under Philippine consumer protection law. Your statutory rights are not affected by this policy.' },
    ],
  },
}
