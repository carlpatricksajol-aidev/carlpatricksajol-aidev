/* Paid social from the Creative AdBundance team, shown by category, never by client name.
   `ai` says exactly which part of the ad AI made; it is only set where that is true.
   Files live in public/creative with neutral names (no brand in any filename). */

export type Reel = {
  src: string;
  poster: string;
  category: string; // what the brand sells, never who it is
  format: string;
  dur: string;
  ai?: string;
};

export const aiReels: Reel[] = [
  { src: "/creative/v-ai-meals.mp4", poster: "/creative/v-ai-meals.webp", category: "Prepared-meal delivery", format: "Illustrated story", dur: "0:42", ai: "AI illustration" },
  { src: "/creative/v-ai-beauty-eyes.mp4", poster: "/creative/v-ai-beauty-eyes.webp", category: "Beauty, eye cream", format: "AI hook into creator demo", dur: "0:45", ai: "AI hook" },
  { src: "/creative/v-ai-family-app.mp4", poster: "/creative/v-ai-family-app.webp", category: "Family finance app", format: "Scripted scene", dur: "0:23", ai: "AI performer" },
  { src: "/creative/v-ai-beauty-shades.mp4", poster: "/creative/v-ai-beauty-shades.webp", category: "Beauty, foundation", format: "AI hook into creator demo", dur: "0:38", ai: "AI hook" },
];

export const moreReels: Reel[] = [
  { src: "/creative/v-dtc-candy.mp4", poster: "/creative/v-dtc-candy.webp", category: "Protein candy", format: "ASMR", dur: "0:20" },
  { src: "/creative/v-dtc-boxers.mp4", poster: "/creative/v-dtc-boxers.webp", category: "Women's boxer briefs", format: "Creator try-on", dur: "0:32" },
  { src: "/creative/v-ecom-drinkware.mp4", poster: "/creative/v-ecom-drinkware.webp", category: "Kids' drinkware", format: "Creator demo", dur: "0:44" },
  { src: "/creative/v-b2b-scribe.mp4", poster: "/creative/v-b2b-scribe.webp", category: "AI scribe for doctors", format: "Creator explainer", dur: "0:36" },
];

export type Still = { src: string; category: string; lane: "DTC" | "B2B" | "Ecommerce"; concept: string };

/* one static per brand */
export const statics: Still[] = [
  { src: "/creative/s-meals-ryan.webp", category: "Prepared-meal delivery", lane: "Ecommerce", concept: "Be like Ryan" },
  { src: "/creative/s-rental-iceberg.webp", category: "Short-term rental analytics", lane: "B2B", concept: "The iceberg" },
  { src: "/creative/s-candy-head.webp", category: "Protein candy", lane: "DTC", concept: "What's in your head" },
  { src: "/creative/s-scribe-review.webp", category: "AI medical scribe", lane: "B2B", concept: "Clinician review" },
  { src: "/creative/s-drinkware-quiz.webp", category: "Kids' drinkware", lane: "Ecommerce", concept: "Parent quiz" },
  { src: "/creative/s-na-beer.webp", category: "Non-alcoholic beer", lane: "DTC", concept: "The numbers" },
  { src: "/creative/s-telehealth.webp", category: "Telehealth skincare", lane: "DTC", concept: "Comment reply" },
  { src: "/creative/s-dog-vitamins.webp", category: "Dog multivitamins", lane: "Ecommerce", concept: "Dog parents voted" },
  { src: "/creative/s-reading-app.webp", category: "Kids' reading app", lane: "DTC", concept: "Teacher recommended" },
  { src: "/creative/s-govdocs.webp", category: "Passport and ID service", lane: "DTC", concept: "Delivered to your door" },
  { src: "/creative/s-pet-meds.webp", category: "Pet meds by subscription", lane: "Ecommerce", concept: "Ask me about my pets" },
  { src: "/creative/s-bariatric-search.webp", category: "Bariatric vitamins", lane: "DTC", concept: "Search-bar hook" },
];

/* brands the team has made ads for, by what they sell */
export const brandLanes: { lane: string; line: string; items: string[] }[] = [
  {
    lane: "DTC",
    line: "Products sold straight to the customer, from supplements to underwear.",
    items: [
      "Immune and gut supplement",
      "Protein candy",
      "Women's boxer briefs",
      "Men's razors and grooming",
      "Beauty and skincare",
      "Pet supplements",
      "Lawn and garden care",
      "Telehealth skincare",
      "Non-alcoholic beer",
    ],
  },
  {
    lane: "B2B",
    line: "Software and data sold to doctors, hosts, builders, farms and other businesses.",
    items: [
      "AI medical scribe",
      "Global payroll and HR",
      "Short-term rental analytics",
      "Construction bidding network",
      "Ad attribution and tracking",
      "Farm accounting and finance",
      "Salon and spa business software",
      "AI website builder for small business",
    ],
  },
  {
    lane: "Ecommerce",
    line: "Online stores and subscriptions where the ad has to end in a checkout.",
    items: [
      "Online bidding auctions",
      "Kids' drinkware and tableware",
      "Prepared-meal delivery",
      "Baby and kids' furniture",
      "Men's clothing subscription box",
      "Cookware",
      "Mail-order steaks",
      "Golf rangefinders",
      "Dog multivitamins",
    ],
  },
];
