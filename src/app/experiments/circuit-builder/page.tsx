import { CircuitExperiment } from "@/components/experiments/circuit/CircuitExperiment";

export const metadata = {
  title: "Circuit Builder | Virtuos Lab",
  description: "Build electric circuits with draggable components and live current flow.",
};

export default function CircuitBuilderPage() {
  return <CircuitExperiment />;
}
