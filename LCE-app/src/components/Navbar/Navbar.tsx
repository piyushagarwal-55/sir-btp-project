import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  Users,
  BookOpen,
  Mail,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
//import { motion } from "framer-motion";
import { useAuth } from "../../auth/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, isStartup, email, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [location.pathname]);

  const navItems = [
    {
      title: "About",
      href: "/aboutus",
      icon: <Users className="w-5 h-5 mr-2" />,
      items: [
        {
          title: "About Us",
          href: "/aboutus",
          icon: <Home className="w-4 h-4 mr-2" />,
        },
        {
          title: "What do we offer",
          href: "/aboutus",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
        },
        {
          title: "Alumni",
          href: "/alumni",
          icon: <Users className="w-4 h-4 mr-2" />,
        },
        {
          title: "Team",
          href: "/aboutus",
          icon: <Users className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      title: "Events",
      href: "/events",
      icon: <Calendar className="w-5 h-5 mr-2" />,
      items: [
        {
          title: "Upcoming",
          href: "/events",
          icon: <Calendar className="w-4 h-4 mr-2" />,
        },

        {
          title: "Workshops",
          href: "/events",
          icon: <Users className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      title: "Programs",
      href: "/programs",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: <BookOpen className="w-5 h-5 mr-2" />,
    },
    {
      title: "Community",
      href: "/community",
      icon: <Mail className="w-5 h-5 mr-2" />,
    },
  ];

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed w-screen z-50 transition-all duration-300 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-15 w-[90%]" src="/LCE-removebg-preview.png" />
            </Link>
          </div>

          <div className="hidden md:flex md:flex-1">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex justify-evenly flex-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-800">
                          <span className="flex items-center">
                            {item.icon}
                            {item.title}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href || "/"}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="flex items-center text-sm font-medium leading-none">
                                      {subItem.icon}
                                      <span>{subItem.title}</span>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link to={item.href || "/"}>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          <span className="flex items-center text-gray-800">
                            {item.icon}
                            {item.title}
                          </span>
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-black text-white">
                      {email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admindashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  {isStartup && (
                    <DropdownMenuItem
                      onClick={() => navigate("/startupdashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Startup Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="secondary"
                className="text-gray-800 hover:text-cyan"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
            <Button
              className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              onClick={() => {
                navigate("/register");
              }}
            >
              Apply Now
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-cyan hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Rest of the mobile menu code remains unchanged */}
    </nav>
  );
};

export default Navbar;
