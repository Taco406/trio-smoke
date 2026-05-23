import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Instagram,
  Sparkles,
  Leaf,
  Recycle,
  HandCoins,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Navbar from "@/components/site/Navbar";
import LeafMotif from "@/components/LeafMotif";
import useReveal from "@/hooks/useReveal";

const API = "/api";

// ------- Real photos from Daily Inter Lake feature (Kate Heston, Feb 2025) -------
const IMG = {
  // Wide store interior — kitchen decor & clothing
  hero: "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_4_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
  // Owners: Janae Kaarto, Lynn Nasset, Josie Homola
  owners:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_3_of_7.jpg.2262x1498_q85_box-0%2C0%2C4524%2C2996_crop_detail.jpg",
  // Swedish candy display
  candy:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_6_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
  // Store interior — home goods
  homeDecor:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_5_of_7.jpg.2391x1584_q85_box-0%2C0%2C4783%2C3168_crop_detail.jpg",
  // Store interior — apparel + decor
  apparel:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_7_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
  // Kitchen + gifts mix shots — re-use wide interior since article shows few
  kitchen:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_4_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
  gifts:
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_1_of_7_t1170.jpg",
  gallery: [
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_5_of_7.jpg.2391x1584_q85_box-0%2C0%2C4783%2C3168_crop_detail.jpg",
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_7_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_3_of_7.jpg.2262x1498_q85_box-0%2C0%2C4524%2C2996_crop_detail.jpg",
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_6_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_4_of_7.jpg.2464x1632_q85_box-0%2C0%2C4928%2C3264_crop_detail.jpg",
    "https://hagadone.media.clients.ellingtoncms.com/img/photos/2025/02/05/TrioCollective_Heston_1_of_7_t1170.jpg",
  ],
};

const CATEGORIES = [
  {
    name: "Home Decor",
    blurb:
      "Hand-picked vases, textiles, candles and small-batch finds to soften every corner.",
    img: IMG.homeDecor,
    span: "md:col-span-7 md:row-span-2",
    tall: true,
  },
  {
    name: "Kitchen",
    blurb: "Linens, boards, ceramics — beautiful tools for the everyday table.",
    img: IMG.kitchen,
    span: "md:col-span-5",
  },
  {
    name: "Swedish Candy",
    blurb: "Imported jars of lakrits, gelé & polkagris. Pick & mix by the scoop.",
    img: IMG.candy,
    span: "md:col-span-5",
    tag: "Local favorite",
  },
  {
    name: "Gifts",
    blurb: "Wrapped with intention. Cards, keepsakes & little luxuries.",
    img: IMG.gifts,
    span: "md:col-span-6",
  },
  {
    name: "New & Used Apparel",
    blurb:
      "Curated new arrivals alongside gently-loved pieces from our consignors.",
    img: IMG.apparel,
    span: "md:col-span-6",
  },
];

// =============== Hero ===============
function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="bg-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end relative">
        {/* Left */}
        <div className="lg:col-span-6 relative">
          <LeafMotif
            className="hidden lg:block absolute -left-16 -top-8 h-72 w-28 text-forest/40"
            stroke="hsl(148 25% 24%)"
          />
          <div className="reveal">
            <span
              data-testid="hero-overline"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-forest"
            >
              <span className="h-px w-8 bg-forest/60" />
              Kalispell, Montana · Est. Locally
            </span>
          </div>
          <h1
            data-testid="hero-title"
            className="reveal mt-6 font-serif font-light text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02] tracking-tight text-forest-ink"
            style={{ transitionDelay: "80ms" }}
          >
            Curated finds for your
            <span className="italic font-medium text-forest"> home</span> &amp;
            <span className="italic font-medium text-forest"> wardrobe</span>.
          </h1>
          <p
            data-testid="hero-tagline"
            className="reveal mt-8 max-w-lg text-base lg:text-lg leading-relaxed text-muted2"
            style={{ transitionDelay: "180ms" }}
          >
            Home decor. Kitchen. Gifts. Swedish candy. New &amp; used apparel —
            a little of everything we love, gathered under one warm roof.
          </p>
          <div
            className="reveal mt-10 flex flex-wrap items-center gap-4"
            style={{ transitionDelay: "280ms" }}
          >
            <a
              href="#visit"
              data-testid="hero-cta-visit"
              className="group inline-flex items-center gap-3 h-12 px-7 rounded-full bg-forest text-cream text-sm uppercase tracking-widest2 hover:bg-forest-deep transition-colors"
            >
              Plan a visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              data-testid="hero-cta-browse"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest2 text-forest-ink hover:text-forest transition-colors"
            >
              Browse the shop
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div
            className="reveal mt-14 grid grid-cols-3 max-w-md gap-6 text-forest-ink"
            style={{ transitionDelay: "380ms" }}
          >
            <div>
              <div className="font-serif text-3xl">5</div>
              <div className="mt-1 text-[11px] uppercase tracking-widest2 text-muted2">
                Curated departments
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl">100%</div>
              <div className="mt-1 text-[11px] uppercase tracking-widest2 text-muted2">
                Locally owned
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl">
                <Leaf className="inline h-6 w-6 -mt-1 text-forest" />
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-widest2 text-muted2">
                Consignment friendly
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="lg:col-span-6 relative">
          <div className="reveal relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-[28px] shadow-[0_30px_80px_-20px_rgba(20,40,30,0.35)]">
            <img
              src={IMG.hero}
              alt="Inside Trio Collectives boutique"
              data-testid="hero-image"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/30 via-transparent to-transparent" />
          </div>
          <div
            className="reveal hidden md:flex absolute -bottom-6 -left-6 lg:-left-10 items-center gap-3 bg-cream border border-forest/15 px-5 py-4 rounded-2xl shadow-lg"
            style={{ transitionDelay: "200ms" }}
          >
            <Sparkles className="h-5 w-5 text-forest" />
            <div>
              <div className="text-[10px] uppercase tracking-widest2 text-muted2">
                Now in store
              </div>
              <div className="font-serif text-lg text-forest-ink leading-tight">
                Fresh Swedish candy jars
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== Marquee ===============
function Marquee() {
  const items = [
    "Home Decor",
    "Kitchen",
    "Gifts",
    "Swedish Candy",
    "New & Used Apparel",
    "Consignment",
    "Locally Owned",
    "Kalispell, MT",
  ];
  const loop = [...items, ...items];
  return (
    <div
      data-testid="brand-marquee"
      className="border-y border-forest/15 bg-sand/60 overflow-hidden"
    >
      <div className="marquee-track animate-marquee py-6">
        {loop.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-10 px-10 font-serif text-2xl md:text-3xl text-forest-ink/80 whitespace-nowrap"
          >
            <span>{t}</span>
            <Leaf className="h-4 w-4 text-forest" />
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== About ===============
function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <div
            data-testid="about-overline"
            className="text-[11px] uppercase tracking-widest2 text-forest"
          >
            <span className="inline-block h-px w-8 bg-forest/60 align-middle mr-3" />
            Our Story
          </div>
        </div>
        <div className="lg:col-span-8 reveal">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-forest-ink">
            A mother, two daughters, one little shop just off U.S. 2 — built
            around the belief that a home can be{" "}
            <span className="italic text-forest">layered slowly</span>, that
            candy should{" "}
            <span className="italic text-forest">taste like memory</span>, and
            that good clothes deserve a{" "}
            <span className="italic text-forest">second chapter</span>.
          </p>
          <p className="mt-8 text-muted2 text-sm md:text-base leading-relaxed max-w-3xl">
            Trio Collectives is{" "}
            <span className="text-forest-ink font-medium">Lynn Nasset</span> and
            her daughters{" "}
            <span className="text-forest-ink font-medium">Josie Homola</span>{" "}
            and{" "}
            <span className="text-forest-ink font-medium">Janae Kaarto</span> —
            three Flathead-Valley locals who turned a long-held vision into a
            creative one-stop shop in January 2025. Knickknacks for the kids,
            elevated decor for the grown-ups, baby clothes, candles, cards,
            Swedish pick-and-mix, and a fast-changing rack of new and gently
            used women's clothing — gathered with a single eye for what people
            actually love.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-8 text-sm text-muted2 leading-relaxed">
            <div>
              <div className="text-forest-ink font-medium mb-2">
                Family-owned
              </div>
              A trio of women, 23 grandkids cheering them on, and a Flathead
              Valley address — locally rooted in every sense.
            </div>
            <div>
              <div className="text-forest-ink font-medium mb-2">
                Local makers welcome
              </div>
              We stock small-batch lines like Sagebrush Home candles alongside
              imports straight from Sweden.
            </div>
            <div>
              <div className="text-forest-ink font-medium mb-2">
                Consignment welcome
              </div>
              We give pre-loved apparel a thoughtful, well-styled second life —
              as space allows.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== Categories Bento ===============
function Categories() {
  return (
    <section
      id="categories"
      data-testid="categories-section"
      className="relative py-24 lg:py-32 bg-sand/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="reveal">
            <div className="text-[11px] uppercase tracking-widest2 text-forest">
              <span className="inline-block h-px w-8 bg-forest/60 align-middle mr-3" />
              What you'll find inside
            </div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-forest-ink leading-[1.05]">
              A little of everything we love.
            </h2>
          </div>
          <p className="reveal max-w-md text-muted2">
            Five carefully tended departments — each chosen for craftsmanship,
            character, and story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-[220px] md:auto-rows-[260px]">
          {CATEGORIES.map((c, i) => (
            <article
              key={c.name}
              data-testid={`category-card-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className={`cat-tile reveal group relative overflow-hidden rounded-3xl bg-forest-ink ${c.span} ${
                c.tall ? "min-h-[480px] md:min-h-0" : ""
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/85 via-forest-ink/30 to-transparent" />
              {c.tag && (
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-cream/90 text-forest-ink text-[10px] uppercase tracking-widest2 px-3 py-1.5 rounded-full">
                  <Sparkles className="h-3 w-3 text-forest" />
                  {c.tag}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-cream">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm text-cream/80 max-w-sm">
                      {c.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 h-10 w-10 rounded-full border border-cream/40 flex items-center justify-center transition-all group-hover:bg-cream group-hover:text-forest-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============== Gallery ===============
function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7 reveal">
            <div className="text-[11px] uppercase tracking-widest2 text-forest">
              <span className="inline-block h-px w-8 bg-forest/60 align-middle mr-3" />
              Inside the shop
            </div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-forest-ink leading-[1.05]">
              Wander the aisles — without leaving the couch.
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted2 reveal">
            A small peek at how things look on any given afternoon: warm light,
            woven baskets, candy jars catching the sun.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {IMG.gallery.map((src, i) => {
            // staggered heights
            const heights = [
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/5]",
            ];
            const colSpan = [
              "col-span-1",
              "col-span-1 md:col-span-1",
              "col-span-2 md:col-span-2",
              "col-span-1",
              "col-span-1 md:col-span-2",
              "col-span-1",
            ];
            return (
              <div
                key={src}
                data-testid={`gallery-item-${i}`}
                className={`reveal relative overflow-hidden rounded-2xl bg-sand ${heights[i]} ${colSpan[i]}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img
                  src={src}
                  alt={`Trio Collectives shop ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============== Consignment ===============
function Consignment() {
  const steps = [
    {
      icon: Mail,
      title: "Say hello",
      copy: "DM us on Instagram @trio_collectives with a few photos of the pieces you'd like to consign — we respond as space allows.",
    },
    {
      icon: Check,
      title: "We curate",
      copy: "If it's a fit, drop your items by the shop on U.S. 2. We handle styling and pricing from there.",
    },
    {
      icon: HandCoins,
      title: "You get paid",
      copy: "Earn cash or store credit on every sale. Simple terms, transparent splits, friendly process.",
    },
  ];
  return (
    <section
      id="consign"
      data-testid="consignment-section"
      className="relative py-24 lg:py-32 bg-sand/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 reveal">
          <div className="text-[11px] uppercase tracking-widest2 text-forest">
            <span className="inline-block h-px w-8 bg-forest/60 align-middle mr-3" />
            Consignment
          </div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-forest-ink leading-[1.05]">
            Give your closet a <span className="italic">second chapter</span>.
          </h2>
          <p className="mt-6 text-muted2 max-w-md">
            We accept gently-loved apparel that matches the Trio aesthetic —
            considered, comfortable, well-made. Simple terms, friendly process,
            no appointments needed for first inquiries.
          </p>
          <a
            href="https://www.instagram.com/trio_collectives/"
            target="_blank"
            rel="noreferrer"
            data-testid="consign-cta"
            className="mt-8 inline-flex items-center gap-3 h-12 px-6 rounded-full bg-forest text-cream text-sm uppercase tracking-widest2 hover:bg-forest-deep transition-colors"
          >
            DM us on Instagram
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <ol className="lg:col-span-7 space-y-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-testid={`consign-step-${i + 1}`}
              className="reveal group flex gap-6 p-6 md:p-7 rounded-2xl border border-forest/15 bg-cream hover:border-forest/40 transition-colors"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl text-forest-ink">
                    0{i + 1}
                  </span>
                  <h3 className="font-medium text-forest-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-muted2 text-sm leading-relaxed">
                  {s.copy}
                </p>
              </div>
              <Recycle className="hidden md:block h-5 w-5 text-forest/30 self-center group-hover:text-forest/60 transition-colors" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// =============== Online Ordering Teaser ===============
function OnlineOrderingTeaser() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email, source: "online-ordering-teaser" });
      setDone(true);
      toast.success("You're on the list — we'll be in touch soon.");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="online"
      data-testid="online-ordering-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-[32px] bg-forest-ink text-cream p-10 md:p-16 lg:p-20">
          <LeafMotif
            className="absolute -right-12 -top-10 h-[420px] w-40 text-sage/30 hidden md:block"
            stroke="hsl(120 15% 70%)"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-7 reveal">
              <div className="text-[11px] uppercase tracking-widest2 text-sage">
                <span className="inline-block h-px w-8 bg-sage/60 align-middle mr-3" />
                Coming Soon
              </div>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                Online ordering, powered by{" "}
                <span className="italic text-sage">Toast</span>.
              </h2>
              <p className="mt-6 text-cream/75 max-w-xl">
                We're getting our shelves ready for the web. Drop your email
                and we'll send you a single, quiet note the day our online
                store goes live — first-pick of the Swedish candy boxes
                included.
              </p>
            </div>
            <div className="lg:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
              {done ? (
                <div
                  data-testid="newsletter-success"
                  className="rounded-2xl border border-sage/30 bg-cream/5 p-8 text-center"
                >
                  <Check className="mx-auto h-8 w-8 text-sage" />
                  <p className="mt-4 font-serif text-2xl">Welcome aboard.</p>
                  <p className="mt-2 text-sm text-cream/70">
                    We'll be in touch when we go live.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  data-testid="newsletter-form"
                  noValidate
                  className="space-y-4"
                >
                  <label
                    htmlFor="newsletter-email"
                    className="block text-[11px] uppercase tracking-widest2 text-cream/70"
                  >
                    Email address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="newsletter-email"
                      data-testid="newsletter-email-input"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-full bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus-visible:ring-sage focus-visible:ring-offset-0 px-5"
                    />
                    <Button
                      type="submit"
                      data-testid="newsletter-submit"
                      disabled={loading}
                      className="h-12 rounded-full bg-cream text-forest-ink hover:bg-sage hover:text-forest-ink px-7 text-xs uppercase tracking-widest2"
                    >
                      {loading ? "Sending..." : "Notify me"}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-[11px] text-cream/50">
                    One email when we launch. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== Visit / Contact ===============
function Visit() {
  return (
    <section
      id="visit"
      data-testid="visit-section"
      className="relative py-24 lg:py-32 bg-sand/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="text-[11px] uppercase tracking-widest2 text-forest">
              <span className="inline-block h-px w-8 bg-forest/60 align-middle mr-3" />
              Visit Us
            </div>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl text-forest-ink leading-[1.0]">
              Come say hi —
              <br />
              <span className="italic text-forest">the kettle's on.</span>
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-xl">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-forest mt-1 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 text-muted2">
                    Find us
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Trio+Collectives+1085+B+US+Highway+2+W+Kalispell+MT+59901"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="visit-address"
                    className="text-forest-ink mt-1 block hover:text-forest"
                  >
                    1085 B U.S. Hwy 2 W
                    <br />
                    Kalispell, MT 59901
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-5 w-5 text-forest mt-1 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 text-muted2">
                    Open
                  </div>
                  <div data-testid="visit-hours" className="text-forest-ink mt-1">
                    Tue–Fri · 10am–6pm
                    <br />
                    Sat · 10am–2pm
                    <br />
                    <span className="text-muted2 text-sm">Closed Sun &amp; Mon</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Instagram className="h-5 w-5 text-forest mt-1 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 text-muted2">
                    Follow
                  </div>
                  <a
                    href="https://www.instagram.com/trio_collectives/"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="visit-instagram"
                    className="text-forest-ink mt-1 block hover:text-forest"
                  >
                    @trio_collectives
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-forest mt-1 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 text-muted2">
                    Consignment
                  </div>
                  <a
                    href="https://www.instagram.com/trio_collectives/"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="visit-consign"
                    className="text-forest-ink mt-1 block hover:text-forest"
                  >
                    DM us on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
            <div className="relative overflow-hidden rounded-3xl border border-forest/15 aspect-[4/5]">
              <iframe
                title="Trio Collectives map"
                data-testid="visit-map"
                className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-[0.95]"
                src="https://www.google.com/maps?q=1085+B+US+Highway+2+W%2C+Kalispell%2C+MT+59901&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============== Footer ===============
function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-forest-ink text-cream pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-cream/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LeafMotif className="h-9 w-5 text-sage" stroke="hsl(120 15% 80%)" />
              <div>
                <div className="font-serif text-3xl tracking-[0.04em]">TRIO</div>
                <div className="text-[10px] uppercase tracking-widest2 text-cream/60 -mt-1">
                  Collectives
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm text-cream/70 leading-relaxed">
              Home decor. Kitchen. Gifts. Swedish candy. New &amp; used apparel.
              A family-owned shop at 1085 B U.S. 2 W, Kalispell, Montana.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-widest2 text-cream/50 mb-4">
              Shop
            </div>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <a
                    href="#categories"
                    data-testid={`footer-link-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-cream/80 hover:text-cream"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-widest2 text-cream/50 mb-4">
              Follow along
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/trio_collectives/"
                target="_blank"
                rel="noreferrer"
                data-testid="footer-instagram"
                className="h-11 w-11 inline-flex items-center justify-center rounded-full border border-cream/20 hover:bg-cream hover:text-forest-ink transition-colors"
                aria-label="Instagram @trio_collectives"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/trio_collectives/"
                target="_blank"
                rel="noreferrer"
                data-testid="footer-instagram-handle"
                className="text-sm text-cream/80 hover:text-cream"
              >
                @trio_collectives
              </a>
            </div>
            <p className="mt-6 text-[11px] text-cream/50 leading-relaxed">
              Online ordering coming soon, powered by Toast. Consignment
              inquiries always welcome.
            </p>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-cream/50">
          <div>© {new Date().getFullYear()} Trio Collectives. All rights reserved.</div>
          <div className="uppercase tracking-widest2">Kalispell · Montana</div>
        </div>
      </div>
    </footer>
  );
}

// =============== Page ===============
export default function Landing() {
  useReveal(".reveal");
  return (
    <div className="bg-cream text-forest-ink overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Categories />
        <Gallery />
        <Consignment />
        <OnlineOrderingTeaser />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
