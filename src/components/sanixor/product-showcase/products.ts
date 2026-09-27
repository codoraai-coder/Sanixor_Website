export type ProductVisual = { type: "demo"; src: string } | { type: "socio" } | { type: "nyay" };

export type ProductChannel = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  metric: string;
  path: string;
  accent: string;
  accentRgb: string;
  visual: ProductVisual;
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
    accent: "#42d9ee",
    accentRgb: "66, 217, 238",
    visual: { type: "demo", src: "/videos/hackeval.gif" },
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
    accent: "#a78bfa",
    accentRgb: "167, 139, 250",
    visual: { type: "demo", src: "/videos/bitbench.gif" },
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
    accent: "#e879f9",
    accentRgb: "232, 121, 249",
    visual: { type: "demo", src: "/videos/autodash.gif" },
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
    accent: "#818cf8",
    accentRgb: "129, 140, 248",
    visual: { type: "socio" },
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
    accent: "#c084fc",
    accentRgb: "192, 132, 252",
    visual: { type: "nyay" },
  },
];
