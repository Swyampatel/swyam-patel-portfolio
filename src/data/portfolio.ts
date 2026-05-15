export const profile = {
  name: 'Swyam Patel',
  initials: 'SP',
  headline: 'Engineering leader building AI-native products.',
  sub: 'Currently Head of Engineering @ Mondai · Co-Founder @ Nanny Linkup. Previously Tech Director @ ML Capital, AI Researcher @ NJCU.',
  location: 'Jersey City, NJ',
  email: 'patelswyam80@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1jvJkDYZW1TOxPZtghd-yWGaHaubeSSnI/view?usp=sharing',
  socials: {
    github: 'https://github.com/Swyampatel',
    linkedin: 'https://linkedin.com/in/swyampatel',
  },
};

export type Experience = {
  company: string;
  role: string;
  type?: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
  stack?: string[];
};

export const experiences: Experience[] = [
  {
    company: 'Mondai by Rita',
    role: 'Head of Engineering',
    type: 'Full-time',
    start: 'Jan 2026',
    end: 'Present',
    location: 'Remote · Jersey City, NJ',
    bullets: [
      'Leading engineering org and product platform direction.',
      'Driving AI-native architecture across the product surface.',
    ],
    stack: ['React Native', 'Next.js', 'AWS'],
  },
  {
    company: 'Nanny Linkup',
    role: 'Co-Founder',
    type: 'Full-time',
    start: 'May 2025',
    end: 'Present',
    location: 'Jersey City, NJ',
    bullets: [
      'Architected cloud-native childcare marketplace on GCP using Cloud Run and Firestore for real-time provider matching.',
      'Engineered WebSocket chat with Socket.io and Redis caching — instant messaging with presence and persistence.',
      'Hit 95+ PageSpeed scores on a vanilla JS + modern CSS stack.',
    ],
    stack: ['GCP', 'Cloud Run', 'Firestore', 'Socket.io', 'Redis'],
  },
  {
    company: 'Mondai by Rita',
    role: 'Fullstack Engineer',
    type: 'Internship',
    start: 'May 2025',
    end: 'Jan 2026',
    location: 'Remote',
    bullets: [
      'Shipped core full-stack features end-to-end across the product platform.',
      'Promoted to Head of Engineering after 9 months.',
    ],
    stack: ['React Native', 'Next.js', 'AWS'],
  },
  {
    company: 'New Jersey City University',
    role: 'AI Researcher',
    type: 'Internship',
    start: 'May 2025',
    end: 'Jul 2025',
    location: 'Jersey City, NJ',
    bullets: [
      '99.9% classification accuracy on a 15K+ image dataset using ResNet50 transfer learning.',
      'Built edge-compatible CV system holding 30 FPS at sub-100ms inference.',
      'Compressed neural net footprint by 75% while preserving 99.5% accuracy.',
    ],
    stack: ['PyTorch', 'Computer Vision', 'ResNet50'],
  },
  {
    company: 'ML Capital',
    role: 'Tech Director',
    start: 'Oct 2024',
    end: 'Apr 2025',
    location: 'Remote',
    bullets: [
      'Delivered full-stack reporting platform serving 500+ institutional investors with secure document access.',
      'Cut report generation from 48 hours to 3 hours via Python + LaTeX automation.',
      'Built D3/Chart.js dashboard — drove 45% engagement lift, 200+ weekly downloads.',
    ],
    stack: ['React.js', 'Node.js', 'D3.js', 'Python'],
  },
  {
    company: 'Mobilinq',
    role: 'Cloud Engineer',
    type: 'Internship',
    start: 'Apr 2024',
    end: 'Sep 2024',
    location: 'Remote · Toronto, ON',
    bullets: [
      'Held 99.95% uptime SLA across multi-service GCP (Compute Engine, BigQuery, Cloud Storage).',
      'Cut GCP spend 33% ($18K → $12K monthly) via resource optimization and committed-use agreements.',
      'Established GitOps workflow with Terraform — eliminated 80% of deploy failures, 15-minute RTO.',
    ],
    stack: ['GCP', 'Terraform', 'BigQuery', 'GitOps'],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  stack: string[];
  metrics?: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Nanny Linkup',
    blurb: 'Cloud-native childcare marketplace.',
    description:
      'Real-time marketplace connecting families with verified childcare providers. WebSocket chat with presence, GCP-native architecture, 95+ PageSpeed.',
    stack: ['GCP', 'Cloud Run', 'Firestore', 'Socket.io', 'Redis'],
    metrics: ['95+ PageSpeed', 'Real-time chat', 'GCP-native'],
    live: 'https://www.nannylinkup.com/',
    featured: true,
  },
  {
    title: 'Finance Tracker',
    blurb: 'Full-stack financial reporting platform.',
    description:
      'Secure document access for institutional investors. Built on Kotlin, React, and Spring Boot with Chart.js visualizations.',
    stack: ['Kotlin', 'React', 'Spring Boot', 'Chart.js'],
    metrics: ['500+ users', '45% engagement lift'],
    github: 'https://github.com/Swyampatel/ai_expense_tracker',
    featured: true,
  },
  {
    title: 'AI Stock Price Prediction',
    blurb: 'LSTM time-series forecasting on real market data.',
    description:
      'LSTM model trained on Yahoo Finance historical data, visualizing actual vs predicted prices for backtesting.',
    stack: ['Python', 'TensorFlow', 'LSTM', 'Time-Series'],
    github: 'https://github.com/Swyampatel/ai-stock-price-prediction',
    featured: true,
  },
  {
    title: 'Resume Screening',
    blurb: 'NLP-driven resume to job-role matching.',
    description:
      'AI-powered resume screening using keyword matching and BERT-based classification to match candidates to job roles.',
    stack: ['Python', 'Flask', 'NLP', 'BERT'],
    github: 'https://github.com/Swyampatel/automated-resume-screening',
  },
  {
    title: 'Book Recommendation',
    blurb: 'Personalized book recs via TF-IDF.',
    description:
      'Recommendation system using TF-IDF vectorization with optimized web scraping for catalog enrichment.',
    stack: ['Python', 'TF-IDF', 'ML', 'Web Scraping'],
    github: 'https://github.com/Swyampatel/BookBuddy-AI-Powered-Book-Recommendation-System',
  },
  {
    title: 'News Sentiment Analyzer',
    blurb: 'Sentiment analysis over news headlines.',
    description:
      'Headline scraping with BeautifulSoup, sentiment scoring with TextBlob, visualization with Matplotlib.',
    stack: ['Python', 'BeautifulSoup', 'TextBlob'],
    github: 'https://github.com/Swyampatel/News-Sentiment-Analyzer',
  },
];

export const education = {
  school: 'New Jersey City University',
  degree: "Bachelor's, Computer Science",
  start: 'Sep 2024',
  end: 'May 2026',
  honors: ["Dean's List — Spring 2025, Fall 2025"],
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  highlight?: boolean;
};

export const certifications: Certification[] = [
  {
    title: 'Outstanding Scientific Research & Presentation',
    issuer: 'New Jersey City University',
    date: 'Jul 2025',
    highlight: true,
  },
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: 'Aug 2025',
    credentialId: 'b8jdow286eyi',
    highlight: true,
  },
  {
    title: 'Wharton Global High School Investment Competition',
    issuer: 'Wharton Global Youth Program',
    date: 'Jan 2022',
  },
  {
    title: 'Introduction to Programming Using Python',
    issuer: 'LinkedIn',
    date: 'Jan 2025',
  },
];

export const skills = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'Swift', 'SQL'],
  Frameworks: ['React', 'Node.js', 'Next.js', 'Flask', 'Spring Boot', 'TailwindCSS'],
  AI: ['PyTorch', 'TensorFlow', 'Computer Vision', 'NLP', 'LSTM', 'Transfer Learning'],
  Cloud: ['GCP', 'Cloud Run', 'Firestore', 'BigQuery', 'Docker', 'Kubernetes', 'Terraform'],
  Data: ['MongoDB', 'Redis', 'PostgreSQL', 'D3.js', 'Chart.js'],
};

export const now = [
  {
    label: 'Building',
    text: 'AI-native architecture across Mondai',
    tone: 'violet' as const,
  },
  {
    label: 'Shipping',
    text: 'Real-time presence on Nanny Linkup',
    tone: 'emerald' as const,
  },
  {
    label: 'Studying',
    text: 'Multi-agent systems · LangGraph',
    tone: 'sky' as const,
  },
  {
    label: 'Reading',
    text: 'Designing Data-Intensive Applications',
    tone: 'amber' as const,
  },
];

export const navSections = ['work', 'projects', 'stack', 'credentials', 'contact'] as const;
