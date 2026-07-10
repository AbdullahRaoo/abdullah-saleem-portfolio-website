/**
 * Capabilities render as three pipeline lanes, not a pill grid. Each lane is a
 * wire with its tools as nodes along it, so the skills read as a system that
 * flows rather than a wall of badges.
 *
 * Everything listed here is drawn from work that actually shipped.
 */
export type Lane = {
  id: string;
  title: string;
  summary: string;
  nodes: string[];
};

export const capabilities: Lane[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    summary:
      "Agents that read, decide and act across your stack. LLM reasoning where it adds value, deterministic logic where it has to be exact, and an audit trail throughout.",
    nodes: ["LangChain", "n8n", "RAG + pgvector", "OpenAI / Anthropic", "Agents & tool-use", "Python"],
  },
  {
    id: "full-stack",
    title: "Full-Stack",
    summary:
      "Authenticated platforms, admin panels and storefronts. Not landing pages: products your team can extend long after I hand them over.",
    nodes: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Laravel"],
  },
  {
    id: "cloud-deployment",
    title: "Cloud & Deployment",
    summary:
      "The part that decides whether a system survives contact with real traffic. Containers, load balancing, observability and failure alerting.",
    nodes: ["Docker", "AWS", "Kubernetes", "nginx", "Redis", "Vercel"],
  },
];
