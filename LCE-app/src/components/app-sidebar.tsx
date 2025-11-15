import { useAuth } from "@/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  FileText,
  Calendar,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AppSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onToggle,
}: AppSidebarProps) {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground bg-indigo-700">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h2
              className="text-xl font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              LCE
            </h2>
            <p className="text-sm text-muted-foreground">Startup Dashboard</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 lg:hidden"
          onClick={onToggle}
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-6">
        <SidebarMenu className="space-y-6">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onSectionChange("profile")}
              className={`w-full justify-start text-lg font-semibold ${
                activeSection === "profile"
                  ? "bg-indigo-100 text-indigo-700"
                  : ""
              }`}
            >
              <Building2 className="mr-3 h-5 w-5" />
              My Profile
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onSectionChange("reports")}
              className={`w-full justify-start text-lg font-semibold ${
                activeSection === "reports"
                  ? "bg-indigo-100 text-indigo-700"
                  : ""
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Reports
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onSectionChange("events")}
              className={`w-full justify-start text-lg font-semibold ${
                activeSection === "events"
                  ? "bg-indigo-100 text-indigo-700"
                  : ""
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              My Events
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback>{email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">{email}</span>
                <span className="text-xs text-muted-foreground">Startup</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
