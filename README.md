<div align="center">
  <img src="public/images/logo.png" alt="MultiBranch Rentals" width="400" />
  <br /><br />
  <h3>Your trusted car rental partner across the UAE.</h3>
  <p>Multiple branches, one standard of excellence.</p>
</div>

---

## Features

- **Multi-Branch** — Separate fleets, pricing, and WhatsApp numbers per location (Dubai, Abu Dhabi, Sharjah)
- **Multilingual** — English, French, Arabic with full RTL support
- **WhatsApp Booking** — Pre-formatted booking messages with branch-specific numbers
- **Google Sheets CMS** — Manage cars, branches, reviews, and FAQs via Google Sheets
- **Branch Selector** — Searchable branch picker with thumbnails in navbar and hero
- **Corporate Accounts** — Dedicated page with stats, benefits, and inquiry form
- **Car Filtering** — Category filter (Economy, Sedan, SUV, Van, Luxury) with branch-aware results
- **Framer Motion** — Scroll-triggered animations, parallax hero, smooth transitions
- **SEO** — Per-page OG metadata, JSON-LD LocalBusiness schema, sitemap, robots

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org) | React framework (App Router) |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://framermotion.framer.website) | Animations |
| [next-intl](https://next-intl.dev) | Internationalization |
| [Lucide](https://lucide.dev) | Icons |

## Screenshots

| English | العربية |
|--------|---------|
| Home page | الصفحة الرئيسية |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Routes (home, cars, corporate, locations, about)
│   └── globals.css        # Global styles & CSS custom properties
├── components/
│   ├── layout/            # Navbar, Footer, WhatsAppButton, MobileCta
│   ├── sections/          # Hero, FleetGrid, Testimonials, FAQ, etc.
│   └── ui/                # CarCard, Badge, Button primitives
├── context/
│   └── BranchContext.tsx  # Selected branch state (localStorage persisted)
├── lib/
│   ├── sheets.ts          # Google Sheets / Apps Script API client
│   ├── utils.ts           # Tailwind merge & helpers
│   └── whatsapp.ts        # WhatsApp deep link & booking message builder
├── messages/              # Translation files (en, fr, ar)
└── types/                 # TypeScript type definitions
```

## Environment Variables

Set these in your `.env.local` or Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_SCRIPT_URL` | Google Apps Script endpoint URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Default WhatsApp number |
| `NEXT_PUBLIC_SITE_URL` | Production URL |

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

<p align="center">Built with Next.js · © MultiBranch Rentals</p>
