"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

export const FaqAccordion: React.FC = () => {
  const faqs = [
    {
      q: "Where is the FOA flagship showroom located?",
      a: "Our primary showroom is located at Level 2, Shop No. 33, One Galle Face Mall, Colombo 00200. We are open daily from 10:00 AM to 10:00 PM. You can also visit our flagship headquarters at 61/9 Srimath Anagarika Dharmapala Mawatha, Colombo 00300.",
    },
    {
      q: "What payment methods are supported for orders in Sri Lanka?",
      a: "We support a range of secure payment channels: standard Visa and Mastercard credit/debit card processing, as well as 3 interest-free installment payments through Koko and MintPay.",
    },
    {
      q: "What is your refund and exchange policy?",
      a: "We accept exchanges for non-sale items in their original, unworn condition with tags intact within 7 days of delivery. To start an exchange, please bring the items to our One Galle Face showroom or contact support at +94 777 120 693.",
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship globally! You can toggle the currency at the top header from LKR to USD to view international prices. International delivery rates are calculated at the checkout page based on the region.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto bg-background">
      <div className="text-center mb-16 space-y-3">
        <HelpCircle className="h-8 w-8 mx-auto text-accent" />
        <span className="text-xs font-black tracking-[0.25em] text-accent uppercase">
          CUSTOMER ASSISTANCE
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            name="foa-faq"
            className="group border-b border-neutral-200 dark:border-neutral-850 pb-4 transition-colors duration-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none py-3 focus:outline-none">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-foreground group-hover:text-accent transition-colors duration-150">
                {faq.q}
              </h3>
              <span className="ml-4 flex-shrink-0 text-foreground transition-transform duration-300 group-open:rotate-45">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1V11M1 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pt-2 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground leading-relaxed">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
export default FaqAccordion;
