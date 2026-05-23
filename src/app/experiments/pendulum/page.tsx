import { PendulumExperiment } from "@/components/experiments/pendulum/PendulumExperiment";

export const metadata = {
  title: "Pendulum | Virtuos Lab",
  description: "Interactive pendulum physics simulation with realistic swinging motion.",
};

export default function PendulumPage() {
  return <PendulumExperiment />;
}
