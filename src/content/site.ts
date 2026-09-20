export const site = {
  name: "Kuroaxe",
  legalName: "Kuroaxe",
  tagline: "Make your brand impossible to ignore.",
  url: "https://kuroaxe.com",
  locale: "en",
  email: "studio@kuroaxe.com",
  phone: "+1 (212) 555-0148",
  phoneHref: "tel:+12125550148",
  studios: "New York · London · Atelier by appointment",
  codeaxes: {
    name: "Codeaxes",
    url: "https://codeaxes.com",
    note: "Technology and product development by Codeaxes.",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/kuroaxe" },
    { label: "LinkedIn", href: "https://linkedin.com/company/kuroaxe" },
    { label: "Vimeo", href: "https://vimeo.com/kuroaxe" },
  ],
  defaultDescription:
    "Kuroaxe is a premium creative growth partner. Strategy, craft, and performance for ambitious brands that refuse to be ordinary.",
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
