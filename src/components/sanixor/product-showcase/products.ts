export type ProductFootage =
  | { type: "video"; webm: string; mp4: string; poster: string }
  | { type: "socio" }
  | { type: "nyay" };

export type ProductChannel = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  metric: string;
  path: string;
  /** Channel tint — taken from each product page's own brand colour. */
  accent: string;
  accentRgb: string;
  footage: ProductFootage;
};

export const PRODUCT_CHANNELS: ProductChannel[] = [
  {
    id: "hackeval",
    name: "HackEval",
    category: "AI evaluation platform",
    description:
      "Multi-agent hackathon judging that turns project assessment, scoring, and feedback into a fair, real-time system.",
    features: ["Multi-agent judging", "Bias-free scoring", "Live leaderboards"],
    metric: "98% evaluation accuracy",
    path: "/hackeval",
    accent: "#22d3ee",
    accentRgb: "34, 211, 238",
    footage: {
      type: "video",
      webm: "/videos/hackeval.webm",
      mp4: "/videos/hackeval.mp4",
      poster: "/videos/hackeval-poster.jpg",
    },
  },
  {
    id: "bitbench",
    name: "BitBench",
    category: "Performance intelligence",
    description:
      "Standardized AI model and infrastructure benchmarking, with automated evaluation and actionable performance insights.",
    features: ["Model benchmarking", "Comparative analytics", "Regression monitoring"],
    metric: "One benchmark. Every model.",
    path: "/bitbench",
    accent: "#34d399",
    accentRgb: "52, 211, 153",
    footage: {
      type: "video",
      webm: "/videos/bitbench.webm",
      mp4: "/videos/bitbench.mp4",
      poster: "/videos/bitbench-poster.jpg",
    },
  },
  {
    id: "autodash",
    name: "AutoDash",
    category: "AI analytics",
    description:
      "A next-generation BI platform that transforms complex datasets into real-time interactive dashboards—without code.",
    features: ["Instant dashboards", "Predictive analytics", "Anomaly detection"],
    metric: "Raw data to decisions",
    path: "/autodash",
    accent: "#c084fc",
    accentRgb: "192, 132, 252",
    footage: {
      type: "video",
      webm: "/videos/autodash.webm",
      mp4: "/videos/autodash.mp4",
      poster: "/videos/autodash-poster.jpg",
    },
  },
  {
    id: "socioai",
    name: "Socio AI",
    category: "Social media CRM",
    description:
      "Connect, manage, and automate every social channel from one intelligent customer relationship workspace.",
    features: ["Omnichannel linking", "Unified profiles", "Automated engagement"],
    metric: "Every conversation, unified",
    path: "/socioai",
    accent: "#e879f9",
    accentRgb: "232, 121, 249",
    footage: { type: "socio" },
  },
  {
    id: "nyayai",
    name: "Nyay AI",
    category: "Legal intelligence",
    description:
      "Enterprise legal and compliance intelligence that finds risk, monitors obligations, and accelerates document review.",
    features: ["Contract analysis", "Compliance monitoring", "Legal knowledge graph"],
    metric: "Risk surfaced in context",
    path: "/nyayai",
    accent: "#818cf8",
    accentRgb: "129, 140, 248",
    footage: { type: "nyay" },
  },
];

export const channelNumber = (index: number) => String(index + 1).padStart(2, "0");
