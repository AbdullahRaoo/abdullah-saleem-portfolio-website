/**
 * Capabilities render as three pipeline lanes, not a pill grid. Each lane is a
 * wire with its tools as nodes along it, so the skills read as a system that
 * flows rather than a wall of badges.
 *
 * Full-stack leads because most of the shipped work is full-stack. Computer
 * vision sits second as the differentiator rather than the whole practice.
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
    id: "full-stack-systems",
    title: "Full-Stack & Product",
    summary:
      "The software a team runs the business on: admin platforms and ERP, B2B catalogs and quote flows, storefronts, dashboards and internal tools. Built to be handed over and extended, not demoed once.",
    nodes: ["Next.js", "React", "TypeScript", "Supabase / PostgreSQL", "Laravel", "Tailwind"],
  },
  {
    id: "vision-edge",
    title: "Computer Vision & Edge AI",
    summary:
      "Detection and tracking that has to hit frame-rate on constrained hardware. Training and data through to quantized models running on the device itself, not a round-trip to a server.",
    nodes: ["YOLO / YOLOv8", "PyTorch", "OpenCV", "ONNX", "TensorRT", "Jetson / Raspberry Pi"],
  },
  {
    id: "automation-deploy",
    title: "Automation & Deployment",
    summary:
      "The plumbing that removes manual work and keeps things running unattended: inbound-to-CRM pipelines, LLM routing, containers, and the infrastructure underneath.",
    nodes: ["n8n", "LLM routing", "Docker", "ROS 2", "nginx / Redis", "AWS / Vercel"],
  },
];
