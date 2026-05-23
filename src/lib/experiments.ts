import {
  Atom,
  Beaker,
  CircuitBoard,
  FlaskConical,
  Orbit,
  type LucideIcon,
} from "lucide-react";

export interface ExperimentMeta {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "physics" | "chemistry" | "ai";
  icon: LucideIcon;
  color: "cyan" | "violet" | "pink" | "emerald";
  duration: string;
}

export const EXPERIMENTS: ExperimentMeta[] = [
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    description: "Launch objects and visualize parabolic trajectories with live physics.",
    href: "/experiments/projectile-motion",
    category: "physics",
    icon: Atom,
    color: "cyan",
    duration: "15 min",
  },
  {
    id: "pendulum",
    title: "Pendulum Simulation",
    description: "Realistic swinging pendulum with gravity and adjustable parameters.",
    href: "/experiments/pendulum",
    category: "physics",
    icon: Orbit,
    color: "violet",
    duration: "12 min",
  },
  {
    id: "circuit-builder",
    title: "Circuit Builder",
    description: "Drag components, connect wires, and watch current flow in real time.",
    href: "/experiments/circuit-builder",
    category: "physics",
    icon: CircuitBoard,
    color: "cyan",
    duration: "20 min",
  },
  {
    id: "chemistry-lab",
    title: "Chemistry Lab",
    description: "Mix reagents in 3D beakers with glowing reactions and smoke effects.",
    href: "/experiments/chemistry-lab",
    category: "chemistry",
    icon: Beaker,
    color: "violet",
    duration: "18 min",
  },
  {
    id: "molecular-viewer",
    title: "Molecular Viewer",
    description: "Interactive 3D molecules with bonds, rotation, and zoom controls.",
    href: "/experiments/molecular-viewer",
    category: "chemistry",
    icon: FlaskConical,
    color: "emerald",
    duration: "10 min",
  },
];

export const NAV_LINKS = [
  { label: "Experiments", href: "/#experiments" },
  { label: "Physics", href: "/experiments/projectile-motion" },
  { label: "Chemistry", href: "/experiments/chemistry-lab" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Lab", href: "/ai-assistant" },
];
