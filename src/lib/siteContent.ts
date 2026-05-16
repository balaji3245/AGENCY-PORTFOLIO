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
    logo: string;
    mark: string;
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
      image: string;
      link: string;
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
  testimonials: { client: string; company: string; content: string; rating: number }[];
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
  theme: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
    fontFamily: string;
  };
};


export const defaultSiteContent: SiteContent = {
  brand: {
    name: "YJ DEVELOPERS",
    email: "hello@yjdevelopers.com",
    phone: "+91 98765 43210",
    footerDescription:
      "A digital agency helping businesses build premium websites and iconic brands.",
    logo: "/yj-logo.svg",
    mark: "/yj-mark.svg",
  },
  hero: {
    badge: "Digital Creative Agency",
    title: "YJ DEVELOPERS",
    highlight: "Building Brands that Win.",
    description:
      "We craft premium websites, branding, and digital solutions to help your business scale faster.",
    primaryCta: "View Our Work",
    secondaryCta: "Book a Call",
  },
  about: {
    eyebrow: "About YJ DEVELOPERS",
    title: "Strategy, Design & Code for Growth.",
    highlightedWord: "Strategy, Design & Code",
    paragraphs: [
      "YJ DEVELOPERS helps brands scale with focused branding, web development, and digital marketing.",
      "We don't just build websites; we create digital experiences that drive real results for your business.",
    ],
    stats: [
      { value: "45+", label: "Projects Done" },
      { value: "6", label: "Core Skills" },
    ],
  },
  services: {
    eyebrow: "Our Expertise",
    title: "Digital, Creative",
    mutedTitle: "and Branding.",
    description:
      "Focused digital solutions to help your brand grow from strategy to launch.",
    items: [
      {
        title: "Website Design",
        description: "Modern, high-converting layouts designed to captivate your audience and reflect your brand identity.",
        icon: "monitor",
      },
      {
        title: "Website Development",
        description: "Fast, secure, and scalable web solutions built with cutting-edge technologies like React and Next.js.",
        icon: "server",
      },
      {
        title: "Motion Graphics",
        description: "Dynamic visual elements and animations that bring your brand to life with fluid movement.",
        icon: "zap",
      },
      {
        title: "Video Editing",
        description: "Professional post-production that transforms raw footage into compelling cinematic stories.",
        icon: "megaphone",
      },
      {
        title: "Graphic Design",
        description: "Stunning visual assets, from marketing materials to digital graphics, tailored for your brand.",
        icon: "penTool",
      },
      {
        title: "Photo Editing",
        description: "Expert retouching and color grading to ensure your brand imagery looks polished and professional.",
        icon: "palette",
      },
      {
        title: "Branding & Creative Solutions",
        description: "Comprehensive brand identities including logos, color palettes, and full visual systems.",
        icon: "sparkles",
      },
      {
        title: "UI/UX Design",
        description: "User-centric interface designs focused on providing intuitive and seamless digital experiences.",
        icon: "smartphone",
      },
      {
        title: "Social Media Creative Design",
        description: "Eye-catching content designed to boost engagement and consistency across all social platforms.",
        icon: "megaphone",
      },
      {
        title: "App Development",
        description: "Custom mobile applications built for performance, scalability, and exceptional user experience.",
        icon: "smartphone",
      },
      {
        title: "Marketing Design Assets",
        description: "Strategic design materials including banners, ads, and presentations to fuel your growth.",
        icon: "megaphone",
      },
      {
        title: "Content Creation",
        description: "High-quality digital content that tells your brand story and resonates with your target audience.",
        icon: "penTool",
      },
      {
        title: "Creative Direction",
        description: "Guided artistic vision to ensure consistency and excellence across all your creative projects.",
        icon: "sparkles",
      },
      {
        title: "Content Strategy",
        description: "Data-driven roadmaps to help you plan, create, and manage content that drives real business results.",
        icon: "search",
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
          "A complete identity system with logo direction and visual language for a modern local brand.",
        tech: ["Brand Strategy", "Identity", "Logo Design"],
        image: "/projects/branding.png",
        link: "https://urbanedge.yjdevelopers.com",
        color: "from-blue-900/40 to-black",
      },
      {
        title: "DineFlow Platform",
        category: "Web & App Development",
        description:
          "A comprehensive restaurant management platform with real-time reservation flows.",
        tech: ["Next.js", "CMS", "Payments"],
        image: "/projects/restaurant.png",
        link: "https://dineflow.yjdevelopers.com",
        color: "from-orange-900/40 to-black",
      },
      {
        title: "GrowthLab Campaign",
        category: "Digital Marketing & SEO",
        description:
          "Full-funnel marketing strategy and technical SEO overhaul that increased conversion rates.",
        tech: ["SEO", "Performance Marketing", "Analytics"],
        image: "/projects/marketing.png",
        link: "https://growthlab.yjdevelopers.com",
        color: "from-emerald-900/40 to-black",
      },
      {
        title: "Insight Enterprise Dashboard",
        category: "Cloud & Software Solutions",
        description:
          "A custom enterprise dashboard for data visualization and real-time backend sync.",
        tech: ["Software Architecture", "GraphQL", "SaaS"],
        image: "/projects/dashboard.png",
        link: "https://insight.yjdevelopers.com",
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
        name: "Yuvi Jain", 
        role: "Founder & CEO",
        intro: "Yuvi is the Founder & CEO with 2 years of experience in creative digital media. He specializes in video editing, photo editing, web design, graphic design, AI creation, and social media content editing. Passionate about storytelling through visuals, he creates cinematic videos, engaging YouTube content, and high-performing Instagram Reels & Shorts that blend creativity with modern digital aesthetics.",
        image: "from-blue-600 to-indigo-700",
        skills: ["Video Editing", "Photo Editing", "Web Design", "Graphic Design", "Content Marketing", "AI Creation", "Social Media Marketing"],
        portfolio: "https://youtube.com/@theyj28?si=waF4zD2iEepWI3YM",
        email: "karmajain1995@gmail.com"
      },
      { 
        name: "Ajay Barman", 
        role: "COO & Co-Founder",
        intro: "Creative graphic and 3D artist skilled in Adobe Illustrator, Autodesk Maya, Unreal Engine, and 3ds Max. Passionate about designing high-quality visuals, creating immersive 3D environments, and bringing creative ideas to life through modern digital art and animation tools.",
        image: "from-purple-600 to-pink-700",
        skills: ["Web Design", "Graphic Design", "3D Art Work", "Adobe Illustrator", "Autodesk Maya", "Unreal Engine"],
        portfolio: "https://www.behance.net/ajaybarman13",
        email: "barmanajay4606@gmail.com"
      },
      { 
        name: "Chaughule Balaji", 
        role: "Full Stack Developer",
        intro: "Balaji Chaughule is a dynamic Full Stack Developer and BCS student with a deep-seated passion for backend architecture and immersive web technologies like Three.js. Leveraging a versatile toolkit including React, TypeScript, and PocketBase, he builds high-performance applications and impactful digital experiences.",
        image: "from-cyan-500 to-blue-600",
        skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Three.js", "Tailwind CSS", "PocketBase", "Git"],
        portfolio: "https://portfolio-balaji-chaughule.vercel.app/",
        github: "https://github.com/balaji3245",
        email: "chaughulebalaji09@gmail.com"
      },
      { 
        name: "Asad Ali", 
        role: "Software Engineer",
        intro: "Asad Ali is a software engineer focused on backend systems, scalable architectures, and modern web technologies. He works primarily with Node.js, Next.js, MySQL, Docker, Prisma, and microservice-based systems, with strong interest in building reliable and high-performance applications.",
        image: "from-emerald-600 to-teal-700",
        skills: ["Node.js", "TypeScript", "JavaScript", "MongoDB", "PostgreSQL", "Redis", "Docker", "Prisma", "AWS S3", "GCP"],
        github: "https://github.com/Asadali00000",
        email: "itsasadali3@gmail.com"
      },
      { 
        name: "Vipin Yadav", 
        role: "Professional Video Editor",
        intro: "Creative and detail-oriented Video Editor producing engaging and visually impactful content for YouTube, Instagram, and digital platforms. Passionate about storytelling, cinematic visual, and creating high-retention edits that capture audience attention. Skilled at transforming raw footage into professional-quality videos with smooth transitions, clean pacing, sound synchronization, and modern editing styles.",
        image: "from-amber-500 to-orange-600",
        skills: ["Cinematic Video Editing", "YouTube Video Editing", "Color Correction", "Motion Graphics", "Adobe Premiere Pro", "After Effects"],
        portfolio: "https://youtu.be/P_0WgvDQC6o?si=IefZQhpJhTp6fKlV",
        email: "vipinyadav200428@gmail.com"
      },
      { 
        name: "Vasu", 
        role: "Marketing Strategist",
        intro: "Passionate creator works with AI. Owns a YouTube channel with over 1.45k subscribers and maintains the studynation.online platform.",
        image: "from-violet-600 to-purple-700",
        skills: ["Video Editing", "Content Creation", "Graphic Designing", "Photo Editing", "Content Writing", "Creative Problem Solving"],
        portfolio: "https://youtube.com/@googlymon7593?si=J4iupjCdqfL_4KaU",
        email: "vasu08921@gmail.com"
      },
    ],
  },
  testimonials: [
    {
      client: "Ritesh M.",
      company: "UrbanEdge Retail",
      content:
        "YJ DEVELOPERS gave our business a clear brand identity and a fast website that finally feels premium on mobile.",
      rating: 5,
    },
    {
      client: "Sana K.",
      company: "DineFlow Kitchen",
      content:
        "They handled creative, website, SEO and launch assets together. It felt like one team owned the whole digital presence.",
      rating: 5,
    },
    {
      client: "Amit P.",
      company: "ScaleUp Services",
      content:
        "The landing pages and campaign creatives helped us explain our services better and bring in more qualified leads.",
      rating: 5,
    },
  ],
  process: [
    { num: "01", title: "Discovery", desc: "We learn about your business goals and audience." },
    { num: "02", title: "Strategy", desc: "We plan the brand direction and technical roadmap." },
    { num: "03", title: "Design", desc: "We create beautiful UI/UX designs for your approval." },
    { num: "04", title: "Development", desc: "We build your platform with modern tech and SEO." },
    { num: "05", title: "Launch", desc: "We test and deploy your project for the world to see." },
    { num: "06", title: "Support & Growth", desc: "We provide ongoing support and strategic updates to keep your brand scaling." },
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
      "Ready to scale your digital presence? Tell us about your project.",
  },
  vision: {
    prefix: "Our mission is to help",
    highlight: "1000+ businesses",
    suffix: "build brands people trust.",
  },
  theme: {
    primary: "#4B7DFF",
    accent: "#A15BFF",
    background: "#030612",
    foreground: "#ffffff",
    card: "#060b19",
    border: "#141d33",
    fontFamily: "Inter",
  },
};

