import { MolecularExperiment } from "@/components/experiments/molecular/MolecularExperiment";

export const metadata = {
  title: "Molecular Viewer | Virtuos Lab",
  description: "Interactive 3D molecular visualization with rotation and zoom.",
};

export default function MolecularViewerPage() {
  return <MolecularExperiment />;
}
