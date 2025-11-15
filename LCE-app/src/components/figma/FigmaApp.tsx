import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./components/ui/sidebar";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  FileText,
  Settings,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { DashboardHeader } from "./components/DashboardHeader";
import { OverviewPage } from "./components/pages/OverviewPage";
import { PortfolioPage } from "./components/pages/PortfolioPage";
import { MentorsPage } from "./components/pages/MentorsPage";
import { EventsPage } from "./components/pages/EventsPage";
import { ResourcesPage } from "./components/pages/ResourcesPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Building2, label: "Portfolio" },
  { icon: Users, label: "Mentors" },
  { icon: Calendar, label: "Events" },
  { icon: FileText, label: "Resources" },
  { icon: TrendingUp, label: "Analytics" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings" },
];

export default function App() {
  const [activePage, setActivePage] = useState("Overview");

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return <OverviewPage />;
      case "Portfolio":
        return <PortfolioPage />;
      case "Mentors":
        return <MentorsPage />;
      case "Events":
        return <EventsPage />;
      case "Resources":
        return <ResourcesPage />;
      case "Analytics":
        return <AnalyticsPage />;
      case "Settings":
        return (
          <div>
            <h1 className="text-gray-900 mb-1">Settings</h1>
            <p className="text-sm text-gray-600">Manage your account and preferences</p>
          </div>
        );
      default:
        return <OverviewPage />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="bg-black p-2 rounded-lg">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-black">Incubator Pro</h2>
                <p className="text-xs text-gray-500">Batch 2025-Q4</p>
              </div>
            </div>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-gray-500 px-3">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        onClick={() => setActivePage(item.label)}
                        isActive={activePage === item.label}
                        className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        onClick={() => setActivePage(item.label)}
                        isActive={activePage === item.label}
                        className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
