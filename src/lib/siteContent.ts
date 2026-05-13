export const SITE_CONTENT_STORAGE_KEY = "yj-developers-site-content";

export type IconName =
  | "monitor"
  | "smartphone"
  | "globe"
  | "zap"
  | "search"
  | "server"
  | "palette"
  | "megaphone"
  | "penTool"
  | "utensils"
  | "dumbbell"
  | "stethoscope"
  | "store"
  | "building"
  | "shoppingBag"
  | "graduationCap"
  | "briefcase"
  | "sparkles";

export type SiteContent = {
  brand: {
    name: string;
    email: string;
    phone: string;
    footerDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    highlightedWord: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    mutedTitle: string;
    description: string;
    items: { title: string; description: string; icon: IconName }[];
  };
  techStack: {
    eyebrow: string;
    items: string[];
  };
  portfolio: {
    items: {
      title: string;
      category: string;
      description: string;
      tech: string[];
      color: string;
    }[];
  };
  stats: { value: number; label: string; suffix: string }[];
  team: {
    eyebrow: string;
    title: string;
    description: string;
    members: { name: string; role: string; image: string }[];
  };
  testimonials: { client: string; company: string; content: string }[];
  process: { num: string; title: string; desc: string }[];
  pricing: {
    name: string;
    price: string;
    description: string;
    recommended?: boolean;
    features: string[];
  }[];
  industries: { name: string; icon: IconName }[];
  policies: {
    title: string;
    items: { title: string; content: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
  };
  vision: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
};

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "YJ DEVELOPERS",
    email: "hello@yjdevelopers.com",
    phone: "+91 98765 43210",
    footerDescription:
      "A digital, creative, web development, and branding agency focused on helping businesses launch sharper and grow smarter.",
  },
  hero: {
    badge: "Digital, creative, web and branding agency",
    title: "YJ DEVELOPERS builds",
    highlight: "brands that perform.",
    description:
      "We craft creative campaigns, conversion-ready websites, memorable brand identities, and digital systems that help businesses look sharp and grow faster.",
    primaryCta: "View Our Work",
    secondaryCta: "Book a Call",
  },
  about: {
    eyebrow: "About YJ DEVELOPERS",
    title: "We mix strategy, design and code for growing brands.",
    highlightedWord: "strategy, design and code",
    paragraphs: [
      "YJ DEVELOPERS is a multi-disciplinary agency for businesses that need more than a basic website. We plan the brand, shape the story, design the interface, and build the platform.",
      "From digital agency retainers and creative direction to web development and branding studio work, our team helps clients launch with clarity and keep improving after launch.",
    ],
    stats: [
      { value: "45+", label: "Projects Planned" },
      { value: "6", label: "Core Capabilities" },
    ],
  },
  services: {
    eyebrow: "Our Expertise",
    title: "Digital, creative, web",
    mutedTitle: "and branding services.",
    description:
      "Choose one focused service or bring us in as your complete digital partner from brand strategy to launch.",
    items: [
      {
        title: "Digital Agency Growth",
        description:
          "Campaign landing pages, funnels, analytics, automation, and conversion improvements for everyday business growth.",
        icon: "megaphone",
      },
      {
        title: "Creative Agency Campaigns",
        description:
          "Scroll-stopping visuals, motion concepts, social creatives, launch assets, and polished digital storytelling.",
        icon: "palette",
      },
      {
        title: "Web Development Agency",
        description:
          "Fast websites, dashboards, ecommerce stores, and web apps built with scalable React and Next.js foundations.",
        icon: "monitor",
      },
      {
        title: "Branding Studio",
        description:
          "Logos, typography, color systems, brand guidelines, voice, and full identity kits for confident launches.",
        icon: "penTool",
      },
      {
        title: "Landing Pages",
        description:
          "High-impact product, service, and offer pages with responsive layouts, strong copy, and measurable CTAs.",
        icon: "globe",
      },
      {
        title: "Mobile Experiences",
        description:
          "Responsive, mobile-first interfaces that keep your brand sharp on every screen size.",
        icon: "smartphone",
      },
      {
        title: "SEO & Performance",
        description:
          "Technical SEO, speed tuning, metadata, clean structure, and reporting so your website is discoverable.",
        icon: "search",
      },
      {
        title: "Backend & Integrations",
        description:
          "APIs, private dashboards, CMS setup, forms, payments, and integrations that make your website useful.",
        icon: "server",
      },
      {
        title: "Ecommerce Solutions",
        description:
          "Product catalogs, checkout flows, payment gateway setup, inventory flows, and brand-focused store design.",
        icon: "zap",
      },
    ],
  },
  techStack: {
    eyebrow: "Powered by modern tech",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "Vercel",
    ],
  },
  portfolio: {
    items: [
      {
        title: "UrbanEdge Brand Launch",
        category: "Branding Studio",
        description:
          "A complete identity system with logo direction, visual language, launch creatives, and a conversion-focused website for a modern local brand.",
        tech: ["Brand Strategy", "Identity", "Next.js", "SEO"],
        color: "from-blue-900/40 to-black",
      },
      {
        title: "DineFlow Restaurant Suite",
        category: "Web Development Agency",
        description:
          "A restaurant website with menu management, reservation flows, WhatsApp ordering, local SEO, and campaign-ready landing pages.",
        tech: ["React", "CMS", "Analytics", "Payments"],
        color: "from-orange-900/40 to-black",
      },
      {
        title: "ScaleUp Creative Campaign",
        category: "Digital Agency",
        description:
          "A digital campaign system with ad creatives, landing pages, lead capture forms, dashboards, and weekly optimization reporting.",
        tech: ["Creative Direction", "Funnels", "CRM", "Reporting"],
        color: "from-zinc-800/40 to-black",
      },
    ],
  },
  stats: [
    { value: 45, label: "Projects Planned", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
    { value: 6, label: "Service Capabilities", suffix: "" },
    { value: 100, label: "On-time Delivery", suffix: "%" },
  ],
  team: {
    eyebrow: "How we work",
    title: "A complete delivery team without staff photo dependency.",
    description:
      "Every project is handled through clear specialist roles, structured reviews, and one coordinated delivery flow from first idea to launch.",
    members: [
      { name: "Strategy & Discovery", role: "We clarify goals, audience, positioning, content needs, and the right website structure before design begins.", image: "from-cyan-400 to-blue-500" },
      { name: "Brand & Creative Direction", role: "We shape the visual system, campaign feel, messaging, and assets so the business looks consistent everywhere.", image: "from-fuchsia-400 to-rose-500" },
      { name: "UI/UX Design", role: "We create clean, responsive interfaces focused on trust, readability, conversion, and smooth user journeys.", image: "from-amber-300 to-orange-500" },
      { name: "Frontend Development", role: "We build fast, polished pages with modern React, Next.js, animation, and mobile-first implementation.", image: "from-emerald-400 to-teal-500" },
      { name: "Backend & Integrations", role: "We connect forms, dashboards, CMS flows, payments, APIs, automations, and business tools when needed.", image: "from-violet-400 to-indigo-500" },
      { name: "SEO & Launch Support", role: "We prepare metadata, performance checks, analytics, launch testing, and improvement notes after handover.", image: "from-lime-300 to-green-500" },
    ],
  },
  testimonials: [
    {
      client: "Ritesh M.",
      company: "UrbanEdge Retail",
      content:
        "YJ DEVELOPERS gave our business a clear brand identity and a fast website that finally feels premium on mobile.",
    },
    {
      client: "Sana K.",
      company: "DineFlow Kitchen",
      content:
        "They handled creative, website, SEO and launch assets together. It felt like one team owned the whole digital presence.",
    },
    {
      client: "Amit P.",
      company: "ScaleUp Services",
      content:
        "The landing pages and campaign creatives helped us explain our services better and bring in more qualified leads.",
    },
  ],
  process: [
    { num: "01", title: "Discovery", desc: "We understand your business, audience, offers, competitors, goals, and current digital gaps." },
    { num: "02", title: "Strategy", desc: "We map the brand direction, website structure, campaign plan, content needs, and technical scope." },
    { num: "03", title: "Design", desc: "We create identity assets, UI screens, creative concepts, and responsive layouts for approval." },
    { num: "04", title: "Development", desc: "We build the website, integrate forms, CMS, payments, analytics, SEO, and performance essentials." },
    { num: "05", title: "Launch & Growth", desc: "We test, deploy, monitor, and help improve the site with reporting and iteration after launch." },
  ],
  pricing: [
    {
      name: "Starter Presence",
      price: "INR 5k",
      description: "Perfect for launching a clean professional website.",
      features: ["Up to 5 Pages", "Responsive Design", "Basic SEO Setup", "Contact Form Integration", "1 Month Free Support"],
    },
    {
      name: "Business Growth",
      price: "INR 15k",
      description: "Website, branding polish, and creative assets for growing brands.",
      recommended: true,
      features: ["Up to 10 Pages", "Custom Animations (GSAP/Framer)", "Branding Starter Kit", "CMS Integration", "Advanced SEO & Analytics", "3 Months Free Support", "Performance Optimization"],
    },
    {
      name: "Agency Partner",
      price: "INR 30k+",
      description: "A complete digital, creative, web, or branding project.",
      features: ["Custom Website or Store", "Creative Campaign Assets", "Payment or CRM Setup", "Brand Guidelines", "Monthly Growth Roadmap", "6 Months Free Support"],
    },
  ],
  industries: [
    { name: "Restaurants", icon: "utensils" },
    { name: "Gyms & Fitness", icon: "dumbbell" },
    { name: "Clinics", icon: "stethoscope" },
    { name: "Local Businesses", icon: "store" },
    { name: "Real Estate", icon: "building" },
    { name: "Ecommerce", icon: "shoppingBag" },
    { name: "Education", icon: "graduationCap" },
    { name: "Professional Services", icon: "briefcase" },
    { name: "Creators & Startups", icon: "sparkles" },
  ],
  policies: {
    title: "Our Policies",
    items: [
      {
        title: "Payment Terms",
        content:
          "We require a 50% upfront deposit to commence work, with the remaining 50% due upon project completion and before the final handover or deployment. We accept bank transfers and major credit cards.",
      },
      {
        title: "Delivery Policy",
        content:
          "Project timelines are established during the initial strategy phase. Standard landing pages take 1-2 weeks, while full web applications can take 4-12 weeks depending on complexity. All deliverables are subject to client review.",
      },
      {
        title: "Revision Limits",
        content:
          "Each project phase includes up to two rounds of major revisions. Additional revisions may incur an hourly rate charge. We ensure you are fully satisfied with the design before moving to development.",
      },
      {
        title: "Refund Policy",
        content:
          "The initial 50% deposit is non-refundable once work has commenced. If a project is cancelled midway, any completed work will be handed over to the client.",
      },
    ],
  },
  contact: {
    eyebrow: "Let us Talk",
    title: "Start a",
    highlight: "Project.",
    description:
      "Ready to build your brand, website, campaign, or complete digital presence? Tell YJ DEVELOPERS what you want to launch.",
  },
  vision: {
    prefix: "Our mission is to help",
    highlight: "1000+ businesses",
    suffix: "build brands people trust.",
  },
};
