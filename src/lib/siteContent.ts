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
  | "sparkles"
  | "code"
  | "paintbrush"
  | "shoppingCart"
  | "cloud";

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
    items: {
      title: string;
      description: string;
      icon: IconName;
      features: string[];
    }[];
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
      artstation?: string;
      linkedin?: string;
      email?: string;
    }[];
  };
  testimonials: { 
    client: string; 
    company: string; 
    content: string; 
    rating: number;
    date?: string;
    helpfulCount?: number;
    avatar?: string;
    isApproved?: boolean;
    images?: string[];
  }[];
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
    email: "yjdevelopers21@gmail.com",
    phone: "84375 14417",
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
        title: "Web Development",
        description: "We build fast, secure and modern websites that deliver exceptional performance.",
        icon: "code",
        features: ["Custom Website Development", "CMS Development", "E-Commerce Solutions", "Website Maintenance"]
      },
      {
        title: "UI/UX Design",
        description: "We design intuitive and engaging interfaces that enhance user experience and satisfaction.",
        icon: "paintbrush",
        features: ["User Research", "Wireframing & Prototyping", "UI/UX Design", "Usability Testing"]
      },
      {
        title: "Graphic Design",
        description: "We create visually stunning designs that communicate your brand's message effectively and leave a lasting impression.",
        icon: "paintbrush",
        features: ["Brand Identity & Logo Design", "Marketing & Ad Creatives", "Social Media Graphics", "Print & Packaging Design"]
      },
      {
        title: "Video Editing",
        description: "Professional video editing and post-production to create engaging and cinematic visual stories.",
        icon: "monitor",
        features: ["Cinematic Editing", "Color Grading", "Sound Design & Mixing", "Social Media Ads"]
      },
      {
        title: "Mobile App Development",
        description: "We create powerful mobile apps for iOS and Android that drive engagement and growth.",
        icon: "smartphone",
        features: ["iOS App Development", "Android App Development", "Cross-Platform Apps", "App UI/UX Design"]
      },
      {
        title: "Digital Marketing",
        description: "We help you reach the right audience and grow your brand online.",
        icon: "megaphone",
        features: ["SEO (Search Engine Optimization)", "Social Media Marketing", "Google Ads Management", "Content Marketing"]
      },
      {
        title: "E-Commerce Solutions",
        description: "We build secure and scalable online stores that convert visitors into customers.",
        icon: "shoppingCart",
        features: ["Shopify Development", "WooCommerce Development", "Payment Gateway Integration", "Store Optimization"]
      },
      {
        title: "Cloud & DevOps",
        description: "We offer reliable cloud solutions and DevOps services to scale your business.",
        icon: "cloud",
        features: ["Cloud Deployment", "Server Management", "CI/CD Pipeline", "Performance Monitoring"]
      },
      {
        title: "Motion Graphics",
        description: "We bring your brand ideas to life with stunning 2D/3D motion design and dynamic animations.",
        icon: "zap",
        features: ["Logo Animation", "Explainer Videos", "UI Transitions", "3D Product Renders"]
      },
      {
        title: "Photo Editing",
        description: "High-end photo manipulation, retouching, and color correction to showcase your products beautifully.",
        icon: "paintbrush",
        features: ["Product Retouching", "Background Removal", "Color Correction", "Image Manipulation"]
      },
      {
        title: "VFX",
        description: "We craft stunning visual effects and compositing that elevate your videos and productions to a cinematic level.",
        icon: "sparkles",
        features: ["Visual Effects Compositing", "Green Screen & Chroma Key", "Particle & Simulation FX", "3D VFX Integration"]
      }
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
        category: "Graphic Design",
        description:
          "A complete identity system with logo direction and visual language for a modern local brand.",
        tech: ["Brand Strategy", "Identity", "Logo Design"],
        image: "/projects/branding.png",
        link: "https://urbanedge.yjdevelopers.com",
        color: "from-blue-900/40 to-black",
      },
      {
        title: "Smashic Unisex Jordan",
        category: "Graphic Design",
        description: "A premium sneaker advertisement design focusing on minimalist aesthetics and brand heritage.",
        tech: ["Ad Design", "Typography", "Visual Arts"],
        image: "/projects/graphic-1.jpg",
        link: "#",
        color: "from-yellow-500/20 to-black",
      },
      {
        title: "Purple Sweet Cupcake",
        category: "Graphic Design",
        description: "Vibrant and appetizing social media creative for a bakery brand, featuring custom illustrations.",
        tech: ["Social Media", "Product Design", "Illustration"],
        image: "/projects/graphic-2.jpg",
        link: "#",
        color: "from-purple-500/20 to-black",
      },
      {
        title: "Rise and Fall of Hungama",
        category: "Graphic Design",
        description: "Engaging YouTube thumbnail and editorial graphic exploring the history of iconic cartoon channels.",
        tech: ["Thumbnail Design", "Storytelling", "Digital Art"],
        image: "/projects/graphic-3.jpg",
        link: "#",
        color: "from-red-500/20 to-black",
      },
      {
        title: "XO - Hurry Up Tomorrow",
        category: "Graphic Design",
        description: "A dark, atmospheric custom sneaker design concept inspired by The Weeknd's musical era.",
        tech: ["Concept Art", "Texturing", "Branding"],
        image: "/projects/graphic-4.jpg",
        link: "#",
        color: "from-zinc-800/40 to-black",
      },
      {
        title: "DineFlow Platform",
        category: "Web Development",
        description:
          "A comprehensive restaurant management platform with real-time reservation flows.",
        tech: ["Next.js", "CMS", "Payments"],
        image: "/projects/restaurant.png",
        link: "https://dineflow.yjdevelopers.com",
        color: "from-orange-900/40 to-black",
      },
      {
        title: "GrowthLab Campaign",
        category: "Digital Marketing",
        description:
          "Full-funnel marketing strategy and technical SEO overhaul that increased conversion rates.",
        tech: ["SEO", "Performance Marketing", "Analytics"],
        image: "/projects/marketing.png",
        link: "https://growthlab.yjdevelopers.com",
        color: "from-emerald-900/40 to-black",
      },
      {
        title: "Insight Enterprise Dashboard",
        category: "Cloud & DevOps",
        description:
          "A custom enterprise dashboard for data visualization and real-time backend sync.",
        tech: ["Software Architecture", "GraphQL", "SaaS"],
        image: "/projects/dashboard.png",
        link: "https://insight.yjdevelopers.com",
        color: "from-cyan-900/40 to-black",
      },
      {
        title: "Shree Sai Creation Logo",
        category: "Graphic Design",
        description: "Premium golden diamond logo design with a textured emerald background for a luxury brand.",
        tech: ["Logo Design", "Branding", "Graphic Design"],
        image: "/projects/shree-sai-logo.jpg",
        link: "#",
        color: "from-emerald-900/40 to-black",
      },
      {
        title: "The YJ Brand Identity",
        category: "Graphic Design",
        description: "Minimalist circular red emblem design focused on modern typography and bold brand recognition.",
        tech: ["Minimalist Design", "Typography", "Vector Art"],
        image: "/projects/the-yj-logo.jpg",
        link: "#",
        color: "from-red-900/40 to-black",
      },
      {
        title: "Sai Creation Chandelier Identity",
        category: "Graphic Design",
        description: "Elegant and sophisticated golden chandelier logo for a premium home décor and lighting brand.",
        tech: ["Luxury Branding", "Illustration", "Graphic Design"],
        image: "/projects/chandelier-logo.jpg",
        link: "#",
        color: "from-amber-900/40 to-black",
      },
      {
        title: "Hot & Delicious Burger Campaign",
        category: "Graphic Design",
        description: "Dynamic food promotion poster with high-impact visuals and vibrant color contrast.",
        tech: ["Ad Design", "Photo Manipulation", "Marketing"],
        image: "/projects/burger-poster.jpg",
        link: "#",
        color: "from-orange-900/40 to-black",
      },
      {
        title: "Peppermint Bliss Drink Poster",
        category: "Graphic Design",
        description: "Cool and refreshing seasonal drink advertisement with a clean, modern aesthetic.",
        tech: ["Product Poster", "Visual Design", "Advertising"],
        image: "/projects/drink-poster.jpg",
        link: "#",
        color: "from-green-900/40 to-black",
      },
      {
        title: "Modern Portfolio Concept",
        category: "UI/UX Design",
        description: "High-fidelity website layouts focused on minimalist aesthetics and user conversion.",
        tech: ["Figma", "Web Design", "UI Design"],
        image: "/projects/web-design.png",
        link: "#",
        color: "from-blue-900/40 to-black",
      },
      {
        title: "E-commerce Engine",
        category: "Web Development",
        description: "High-performance web store built with Next.js and optimized for rapid scaling.",
        tech: ["Next.js", "React", "Node.js"],
        image: "/projects/web-dev.png",
        link: "#",
        color: "from-indigo-900/40 to-black",
      },
      {
        title: "Brand Motion Identity",
        category: "Motion Graphics",
        description: "Dynamic logo animations and visual effects that bring brand elements to life.",
        tech: ["After Effects", "Animation", "VFX"],
        image: "/projects/motion.png",
        link: "#",
        color: "from-purple-900/40 to-black",
      },
      {
        title: "Cinematic Commercial",
        category: "Video Editing",
        description: "Professional video editing and post-production for high-impact brand commercials.",
        tech: ["Premiere Pro", "Color Grading", "Sound Design"],
        image: "/projects/video.png",
        link: "#",
        color: "from-red-900/40 to-black",
      },
      {
        title: "Product Retouching Pro",
        category: "Photo Editing",
        description: "Expert photo manipulation and retouching for high-end product photography.",
        tech: ["Photoshop", "Retouching", "Color Grading"],
        image: "/projects/photo.png",
        link: "#",
        color: "from-pink-900/40 to-black",
      },
      {
        title: "Corporate Identity System",
        category: "Graphic Design",
        description: "Complete visual branding systems including logo, typography, and color guides.",
        tech: ["Branding", "Logo Design", "Strategy"],
        image: "/projects/branding-creative.png",
        link: "#",
        color: "from-amber-900/40 to-black",
      },
      {
        title: "SaaS Platform UI",
        category: "UI/UX Design",
        description: "User-centric interface design for complex software-as-a-service platforms.",
        tech: ["Figma", "User Research", "Prototyping"],
        image: "/projects/uiux.png",
        link: "#",
        color: "from-teal-900/40 to-black",
      },
      {
        title: "Engagement Booster Pack",
        category: "Graphic Design",
        description: "Set of eye-catching social media assets designed to increase brand interaction.",
        tech: ["Social Media", "Graphic Design", "Ad Design"],
        image: "/projects/social.png",
        link: "#",
        color: "from-sky-900/40 to-black",
      },
      {
        title: "Native Mobile App",
        category: "Mobile App Development",
        description: "Custom iOS and Android applications focused on performance and seamless UX.",
        tech: ["React Native", "iOS", "Android"],
        image: "/projects/app-dev.png",
        link: "#",
        color: "from-rose-900/40 to-black",
      },
      {
        title: "Marketing Ad Suite",
        category: "Graphic Design",
        description: "Strategic marketing materials for digital and print advertising campaigns.",
        tech: ["Ad Design", "Marketing", "Print"],
        image: "/projects/marketing-assets.png",
        link: "#",
        color: "from-lime-900/40 to-black",
      },
      {
        title: "Brand Storytelling Series",
        category: "Graphic Design",
        description: "High-quality creative content tailored for multi-channel brand storytelling.",
        tech: ["Content", "Copywriting", "Visuals"],
        image: "/projects/content.png",
        link: "#",
        color: "from-orange-900/40 to-black",
      },
      {
        title: "Artistic Vision Roadmap",
        category: "Graphic Design",
        description: "Comprehensive creative direction and artistic vision for large-scale projects.",
        tech: ["Direction", "Vision", "Art"],
        image: "/projects/direction.png",
        link: "#",
        color: "from-violet-900/40 to-black",
      },
      {
        title: "Digital Growth Blueprint",
        category: "Digital Marketing",
        description: "Strategic content planning and data-driven roadmaps for digital growth.",
        tech: ["Strategy", "SEO", "Planning"],
        image: "/projects/strategy.png",
        link: "#",
        color: "from-gray-900/40 to-black",
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
        name: "Asad Ali", 
        role: "CTO",
        intro: "Asad Ali is a software engineer focused on backend systems, scalable architectures, and modern web technologies. He works primarily with Node.js, Next.js, MySQL, Docker, Prisma, and microservice-based systems, with strong interest in building reliable and high-performance applications.",
        image: "from-emerald-600 to-teal-700",
        skills: ["Node.js", "TypeScript", "JavaScript", "MongoDB", "PostgreSQL", "Redis", "Docker", "Prisma", "AWS S3", "GCP"],
        github: "https://github.com/Asadali00000",
        email: "itsasadali3@gmail.com"
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
      { 
        name: "Sanjeev Singh", 
        role: "Video editing, 3d artist",
        intro: "Hi, my name is Sanjeev Singh. I am a B.Sc. Animation and VFX student with skills in video editing, graphic design, and VFX animation.",
        image: "from-red-600 to-orange-700",
        skills: ["Editing", "ai creation", "3d"],
        portfolio: "https://www.behance.net/sanjeevsingh69",
        artstation: "https://www.artstation.com/sanjeevsingh990",
        linkedin: "https://www.linkedin.com/in/sanjeev-singh-14114a334?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        email: "sanjeevsinghdl923@gmail.com"
      },
    ],
  },
  testimonials: [
    {
      client: "Ritesh M.",
      company: "UrbanEdge Retail",
      content:
        "YJ DEVELOPERS gave our business a clear brand identity and a fast website that finally feels premium on mobile. Their attention to detail in the motion graphics phase was exceptional. We've seen a 40% increase in mobile conversions since the launch.",
      rating: 5,
      date: "2024-05-10",
      helpfulCount: 12,
      isApproved: true,
    },
    {
      client: "Sana K.",
      company: "DineFlow Kitchen",
      content:
        "They handled creative, website, SEO and launch assets together. It felt like one team owned the whole digital presence. The process was transparent and they actually delivered ahead of schedule. Highly recommended for any serious business looking to scale.",
      rating: 5,
      date: "2024-04-28",
      helpfulCount: 8,
      isApproved: true,
    },
    {
      client: "Amit P.",
      company: "ScaleUp Services",
      content:
        "The landing pages and campaign creatives helped us explain our services better and bring in more qualified leads. The UI/UX is clean and intuitive, exactly what we needed for our enterprise dashboard. Great communication throughout the project.",
      rating: 5,
      date: "2024-04-15",
      helpfulCount: 15,
      isApproved: true,
    },
    {
      client: "Vikram S.",
      company: "TechNova Inc",
      content:
        "Extremely professional and technically sound. They converted our complex requirements into a simple, beautiful interface. The performance of the site is top-notch. Truly world-class engineering.",
      rating: 5,
      date: "2024-03-20",
      helpfulCount: 5,
      isApproved: true,
    },
    {
      client: "Neha G.",
      company: "Aura Lifestyle",
      content:
        "Loved the branding work! They really understood our vibe and translated it perfectly into the visual identity. The website design is stunning and receives compliments from our customers daily.",
      rating: 4,
      date: "2024-03-12",
      helpfulCount: 3,
      isApproved: true,
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

