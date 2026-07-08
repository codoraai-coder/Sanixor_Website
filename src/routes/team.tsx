import React from "react";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Layout } from "@/components/sanixor/Layout";
import { Link } from "react-router-dom";

interface HierarchyNode {
  name?: string;
  role?: string;
  hue?: number;
  children?: HierarchyNode[];
  title?: string;
  color?: string;
}

const hierarchy: HierarchyNode = {
  title: "Leadership",
  color: "primary",
  children: [
    {
      name: "Aditi Rao",
      role: "Founder & CEO",
      hue: 200,
      children: [
        {
          name: "Kabir Sen",
          role: "CTO",
          hue: 230,
          children: [
            { name: "Nia Verma", role: "Head of AI Research", hue: 280 },
            { name: "Saanvi P.", role: "Lead Engineer — HackEval", hue: 210 },
            { name: "Arjun M.", role: "Lead Engineer — BitBench", hue: 260 },
          ],
        },
        {
          name: "Vikram J.",
          role: "Head of Design",
          hue: 170,
        },
        {
          name: "Riya N.",
          role: "Growth & Partnerships",
          hue: 190,
        },
        { name: "Dev S.", role: "AI Trainer", hue: 240 },
      ],
    },
  ],
};

function TreeNode({ node, level = 0 }: { node: HierarchyNode; level?: number }) {
  const hue = node.hue ?? 200;
  return (
    <div className="flex flex-col items-center">
      <div className="group relative flex flex-col items-center">
        <div
          className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 clip-diamond shadow-elegant transition-all duration-300 group-hover:shadow-glow group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, oklch(0.7 0.15 ${hue}), oklch(0.3 0.1 ${hue + 30}))`,
          }}
        >
          <div
            className="absolute inset-0.5 sm:inset-1 clip-diamond"
            style={{
              background: `radial-gradient(circle at 50% 40%, oklch(0.85 0.1 ${hue + 20}), transparent 60%)`,
            }}
          />
        </div>
        <div className="mt-2 sm:mt-3 text-center">
          <h3 className="text-xs sm:text-sm font-semibold">{node.name ?? node.title ?? ""}</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{node.role ?? ""}</p>
        </div>
        <div className="mt-1 sm:mt-2 flex gap-0.5 sm:gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {[Linkedin, Twitter, Github].map((Icon, k) => (
            <a
              key={k}
              href="#"
              className="grid h-5 w-5 sm:h-6 sm:w-6 place-items-center rounded-full glass hover:text-primary"
            >
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </a>
          ))}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <>
          <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-primary to-transparent" />
          <div className="flex gap-2 sm:gap-3">
            {node.children.map((child: HierarchyNode, index) => (
              <div
                key={child.name ?? child.title ?? String(index)}
                className="flex flex-col items-center"
              >
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          The <span className="text-gradient">people</span> behind it.
        </h1>
        <p className="mx-auto mt-4 sm:mt-5 max-w-xl sm:max-w-2xl text-base sm:text-lg text-muted-foreground">
          Our organizational hierarchy — building the bias-free AI future together.
        </p>
      </section>

      {/* Org Chart - Horizontal scroll on mobile */}
      <section className="mx-auto overflow-x-auto pb-12 sm:pb-24 px-4">
        <div className="min-w-[600px] sm:min-w-[700px] md:min-w-[800px] px-2">
          <TreeNode node={hierarchy} />
        </div>
      </section>

      {/* CTA 
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-2xl sm:rounded-3xl glass-strong p-6 sm:p-8 md:p-10 text-center shadow-elegant">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Join Our Team</h3>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            We're always looking for talented individuals. Check our{" "}
            <Link to="/hiring" className="text-primary hover:underline">
              open positions
            </Link>
            .
          </p>
          <Link
            to="/hiring"
            className="inline-flex items-center gap-2 mt-4 sm:mt-6 rounded-full bg-gradient-primary px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
          >
            View Openings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      */}
    </Layout>
  );
}
