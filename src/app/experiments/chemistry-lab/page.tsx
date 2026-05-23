import { ChemistryExperiment } from "@/components/experiments/chemistry/ChemistryExperiment";

export const metadata = {
  title: "Chemistry Lab | Virtuos Lab",
  description: "3D chemistry experiments with glowing liquids and animated reactions.",
};

export default function ChemistryLabPage() {
  return <ChemistryExperiment />;
}
