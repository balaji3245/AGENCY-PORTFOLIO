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
    members: {
      name: string;
      role: string;
      intro?: string;
      image: string;
      skills?: string[];
      portfolio?: string;
      github?: string;
      email?: string;
    }[];
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
      "Specializing in Brand Design, Web Development, Digital Marketing, and Cloud Software. Four core pillars to scale your business with premium digital solutions.",
    primaryCta: "View Our Work",
    secondaryCta: "Book a Call",
  },
  about: {
    eyebrow: "About YJ DEVELOPERS",
    title: "We mix strategy, design and code for growing brands.",
    highlightedWord: "strategy, design and code",
    paragraphs: [
      "YJ DEVELOPERS is a specialized digital agency focused on four core pillars: Branding, Development, Marketing, and Software Solutions. We don't just build websites; we create scalable ecosystems that drive business growth.",
      "Whether you need a striking visual identity, a high-performance web platform, or complex cloud-based software, our team delivers premium results that help your brand stand out and scale effectively.",
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
        title: "Brand Strategy & Design",
        description:
          "We create iconic identities, logos, and visual systems that make your brand unforgettable and market-ready.",
        icon: "penTool",
      },
      {
        title: "Web & App Development",
        description:
          "Fast, responsive, and conversion-ready digital platforms built with modern technologies like React and Next.js.",
        icon: "monitor",
      },
      {
        title: "Digital Marketing & SEO",
        description:
          "Data-driven campaigns and technical SEO strategies designed to scale your reach and maximize ROI.",
        icon: "megaphone",
      },
      {
        title: "Cloud & Software Solutions",
        description:
          "Scalable backend systems, enterprise dashboards, and custom SaaS platforms built for complex business needs.",
        icon: "server",
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
        category: "Brand Strategy & Design",
        description:
          "A complete identity system with logo direction, visual language, launch creatives, and a conversion-focused website for a modern local brand.",
        tech: ["Brand Strategy", "Identity", "Logo Design"],
        color: "from-blue-900/40 to-black",
      },
      {
        title: "DineFlow Platform",
        category: "Web & App Development",
        description:
          "A comprehensive restaurant management platform with real-time reservation flows, menu control, and mobile-first ordering.",
        tech: ["Next.js", "CMS", "Payments"],
        color: "from-orange-900/40 to-black",
      },
      {
        title: "GrowthLab Campaign",
        category: "Digital Marketing & SEO",
        description:
          "Full-funnel marketing strategy and technical SEO overhaul that increased client conversion rates by 150% in 6 months.",
        tech: ["SEO", "Performance Marketing", "Analytics"],
        color: "from-emerald-900/40 to-black",
      },
      {
        title: "Insight Enterprise Dashboard",
        category: "Cloud & Software Solutions",
        description:
          "A custom enterprise dashboard for data visualization, user role management, and real-time backend synchronization.",
        tech: ["Software Architecture", "GraphQL", "SaaS"],
        color: "from-cyan-900/40 to-black",
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
    eyebrow: "Meet the Team",
    title: "The people building your next big project.",
    description:
      "We are a passionate team of designers, developers, and strategists dedicated to delivering world-class digital experiences.",
    members: [
      { 
        name: "Yash Joshi", 
        role: "Founder & Full Stack Developer",
        intro: "Yash leads the agency with 5+ years of experience building high-performance web apps. He architects solutions that are fast, scalable, and beautiful.",
        image: "from-cyan-400 to-blue-500",
        skills: ["Next.js", "React", "Node.js", "System Design"],
        portfolio: "https://yjdevelopers.com",
        github: "https://github.com/yjdeveloper",
        email: "yash@yjdevelopers.com"
      },
      { 
        name: "Jai Sharma", 
        role: "UI/UX Designer",
        intro: "Jai crafts pixel-perfect interfaces and seamless user experiences. He turns complex ideas into intuitive, beautiful designs that users love.",
        image: "from-fuchsia-400 to-rose-500",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
        portfolio: "https://jaisharmdesigns.com",
        github: "",
        email: "jai@yjdevelopers.com"
      },
      { 
        name: "Priya Verma", 
        role: "Frontend Developer",
        intro: "Priya specializes in building fast, responsive, and animated interfaces. She brings designs to life with clean code and attention to detail.",
        image: "from-amber-300 to-orange-500",
        skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
        portfolio: "",
        github: "https://github.com/priyaverma",
        email: "priya@yjdevelopers.com"
      },
      { 
        name: "Arjun Mehta", 
        role: "Backend Developer",
        intro: "Arjun builds the engine behind every product — APIs, databases, integrations, and automation pipelines that keep everything running smoothly.",
        image: "from-emerald-400 to-teal-500",
        skills: ["Node.js", "PostgreSQL", "AWS", "REST APIs"],
        portfolio: "",
        github: "https://github.com/arjunmehta",
        email: "arjun@yjdevelopers.com"
      },
      { 
        name: "Sneha Patil", 
        role: "SEO & Digital Marketing",
        intro: "Sneha drives organic growth through strategic SEO, content planning, and performance analytics. She ensures every site ranks and converts.",
        image: "from-violet-400 to-indigo-500",
        skills: ["SEO", "Google Analytics", "Content Strategy", "SEM"],
        portfolio: "",
        github: "",
        email: "sneha@yjdevelopers.com"
      },
      { 
        name: "Rohan Gupta", 
        role: "Project Manager",
        intro: "Rohan keeps every project on track, on time, and on budget. He acts as the bridge between clients and the team to ensure smooth delivery.",
        image: "from-lime-300 to-green-500",
        skills: ["Agile", "Jira", "Client Relations", "Delivery"],
        portfolio: "",
        github: "",
        email: "rohan@yjdevelopers.com"
      },
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
