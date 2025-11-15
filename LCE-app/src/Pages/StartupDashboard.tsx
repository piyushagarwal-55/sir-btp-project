import * as React from "react";
import { useAuth } from "@/auth/AuthProvider";
import { AppSidebar } from "@/components/app-sidebar";
import { ProfileSection } from "@/components/profile-section";
import { ReportsSection } from "@/components/reports-section";
import { RegisteredEventsSection } from "@/components/registered-events-section";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

export type StartupProfile = {
  user_id: string;
  name: string;
  entity_name: string;
  sector: string;
  categories: string;
  year: number;
  brand_name: string | null;
  entityRegistrationStatus: boolean | null;
  stage: string | null;
  detailsText: string | null;
  size: number;
  incubation_status: boolean;
  isApproved: boolean;
  startupIndiaRegister: boolean;
};

export default function StartupDashboard() {
  const { email } = useAuth();
  const [activeSection, setActiveSection] = React.useState("profile");
  const [startup, setStartup] = React.useState<StartupProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (email) {
      fetchStartupDetails();
    }
  }, [email]);

  const fetchStartupDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/startups/current?email=${encodeURIComponent(
          email
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch startup details");
      }
      const data = await response.json();
      setStartup(data.data || data);
    } catch (error) {
      console.error("Error fetching startup details:", error);
      setError("Failed to fetch startup details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />
        <div className="flex-1 transition-all duration-300 ease-in-out">
          <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm lg:hidden">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Startup Dashboard</h1>
          </header>
          <SidebarInset>
            <main className="p-4 lg:p-8 w-full">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="ml-2">Loading startup details...</p>
                </div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : startup ? (
                <>
                  {activeSection === "profile" && (
                    <ProfileSection
                      startup={startup}
                      onUpdate={(updatedStartup) => setStartup(updatedStartup)}
                    />
                  )}
                  {activeSection === "reports" && <ReportsSection />}
                  {activeSection === "events" && (
                    <RegisteredEventsSection email={email} />
                  )}
                </>
              ) : (
                <div>No startup data available.</div>
              )}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
