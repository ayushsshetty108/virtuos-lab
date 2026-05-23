import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "Dashboard | Virtuos Lab",
  description: "Track your virtual laboratory progress and achievements.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardView />
    </ProtectedRoute>
  );
}
