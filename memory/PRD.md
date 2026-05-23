# Trio Collectives — Demo Landing Page (PRD)

## Original problem
Build a quick, cost-effective free demo landing page for a potential client — **Trio Collectives** — a locally-owned boutique in Kalispell, Montana selling Home decor, Kitchen, Gifts, Swedish candy, and New & used apparel. They run on Toast POS and plan to add online ordering. They also do consignment.

## User choices (verbatim)
- Scope: Landing page only (Hero, About, Categories, Gallery, Consignment, Visit/Contact)
- Style: Warm earthy boutique (cream/sand + deep forest/olive green, serif headings)
- Photos: Try to use linked Google Maps photos (used boutique stock + generated boutique image as fallback)
- Online ordering teaser: Yes — email signup

## Architecture
- **Frontend**: React (CRA + craco), TailwindCSS, shadcn/ui, lucide-react, sonner
- **Backend**: FastAPI + Motor (MongoDB), Pydantic v2 with EmailStr
- **Deployment**: Kubernetes ingress; backend on :8001 with /api prefix; frontend uses REACT_APP_BACKEND_URL
- Typography: Cormorant Garamond (serif headings) + Manrope (body)
- Brand tokens (HSL): cream `40 33% 96%`, sand `35 20% 92%`, forest `148 25% 24%`, forest-ink `150 30% 10%`, sage `120 15% 70%`

## What's implemented (2025-12)
- Single-page Landing (`/app/frontend/src/pages/Landing.jsx`) with sections:
  - Sticky glass Navbar (anchor scroll + mobile menu)
  - Asymmetric Hero with brand wordmark, leaf motif, CTAs, "Now in store" badge
  - Marquee brand strip
  - About / Story (editorial pull-quote)
  - Categories bento grid (5 cards: Home Decor, Kitchen, Swedish Candy, Gifts, New & Used Apparel)
  - Photo gallery (staggered)
  - Consignment 3-step process + email CTA
  - "Coming Soon: Online Ordering" forest-dark card with email signup form
  - Visit/Contact (address, hours, phone, email, embedded Google map)
  - Footer (wordmark, shop links, Instagram + Facebook)
- Backend (`/app/backend/server.py`):
  - `GET /api/` health
  - `POST /api/newsletter` (idempotent on email, validates EmailStr)
  - `GET /api/newsletter` (no `_id` leak)
- Reveal-on-scroll via IntersectionObserver (`useReveal` hook)
- All interactive/info elements have `data-testid` per design guidelines

## Testing
- iteration_1.json: backend 100%, frontend 92% — one UX bug (browser native validation blocking JS toast) → fixed by adding `noValidate` to the newsletter `<form>`.

## Prioritized backlog
- P1: Wire real Trio Collectives photos from Google Maps contributor (manual asset upload from client) once received
- P1: Replace placeholder Kalispell address / phone / email / hours with the client's real details
- P1: Hook newsletter signups to client's email tool (Mailchimp/Klaviyo/Resend) or a Toast guest list
- P2: Add a Consignment intake form (name, email, photos upload) backed by `/api/consignment`
- P2: Add a real shop preview page sourced from Toast Online Ordering API once enabled
- P2: SEO meta tags + OpenGraph image (currently generic title)
- P3: Light "press" / testimonials section
- P3: Newsletter export endpoint (CSV) for the owner

## Personas
- **Owner / Trio team**: wants a clean, on-brand digital storefront that captures email leads for the upcoming online store and explains consignment without phone tag.
- **Local shopper**: needs hours, address, and a feel for what's inside before visiting.
- **Consignor**: wants to understand the consignment process and reach out in one click.

## Update — 2025-12 (real content swap)
Swapped all placeholder copy/imagery for real Trio Collectives data sourced from the Daily Inter Lake feature (Kate Heston, Feb 2025):
- Photos (hero, categories, gallery): 6 real interior + owner photos from hagadone.media (Daily Inter Lake CDN, all 200 OK)
- About: real story of Lynn Nasset and daughters Josie Homola & Janae Kaarto; opened Jan 2025; Sagebrush Home candles partner
- Visit: 1085 B U.S. Hwy 2 W, Kalispell, MT 59901
- Hours: Tue–Fri 10am–6pm · Sat 10am–2pm · Closed Sun & Mon
- Social: Instagram @trio_collectives (Facebook icon removed — not publicly verified)
- Consign CTA + step 1 routes to Instagram DMs (no public phone/email confirmed)
- Map embed now shows the real address
- Newsletter form `noValidate` fix so JS error toast fires for invalid emails

Still placeholder / not yet provided by client:
- Phone number
- Direct email address
- Newsletter ESP integration (currently DB only)
