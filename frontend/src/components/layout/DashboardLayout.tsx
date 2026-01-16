import { useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  PlusCircle,
  BarChart3,
  UserCheck,
  FolderOpen,
  Bell,
  Search,
  ChevronDown,
  Home,
  User,
  Layers,
  Megaphone,
  Award,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { authStorage } from "@/lib/auth";
import type { MeResponse } from "@/lib/types";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  role: "student" | "teacher" | "admin";
  children?: React.ReactNode;
}

const studentNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
  { icon: BookOpen, label: "My Courses", href: "/student/courses" },
  { icon: GraduationCap, label: "Browse Courses", href: "/student/browse" },
  { icon: Award, label: "Certificates", href: "/student/certificates" },
  { icon: BarChart3, label: "Progress", href: "/student/progress" },
  { icon: Settings, label: "Settings", href: "/student/settings" },
];

const teacherNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/teacher" },
  { icon: BookOpen, label: "My Courses", href: "/teacher/courses" },
  { icon: PlusCircle, label: "Create Course", href: "/teacher/courses/create" },
  { icon: Layers, label: "Modules & Lessons", href: "/teacher/modules" },
  { icon: Users, label: "Students", href: "/teacher/students" },
  { icon: BarChart3, label: "Analytics", href: "/teacher/analytics" },
  { icon: Settings, label: "Settings", href: "/teacher/settings" },
];

const adminNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Teacher Approvals", href: "/admin/approvals" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: GraduationCap, label: "Certificates", href: "/admin/certificates" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: Megaphone, label: "Adverts", href: "/admin/adverts" },
  { icon: Calendar, label: "Schedules", href: "/admin/schedules" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MeResponse["data"] | null>(null);

  const navItems = role === "admin" ? adminNav : role === "teacher" ? teacherNav : studentNav;
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const displayName = profile?.name || "John Doe";
  const avatarInitials = (displayName || "John Doe")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const firstName = displayName.split(" ")[0];
  const settingsPath = `/${role}/settings`;

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      const token = authStorage.getToken();
      if (!token) {
        setProfile(null);
        return;
      }

      try {
        const res = await api.get<MeResponse>("/auth/me");
        if (!active) {
          return;
        }
        setProfile(res.data.data);
      } catch (error) {
        console.error("Could not load profile", error);
      }
    };

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const handleSignOut = () => {
    authStorage.clearAll();
    navigate("/login");
  };

  const mobileNavItems = [
    { icon: Home, label: "Home", href: `/${role}` },
    { icon: BookOpen, label: "Courses", href: `/${role}/courses` },
    { icon: Search, label: "Search", href: `/${role}/browse` },
    { icon: User, label: "Profile", href: `/${role}/settings` },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-border">
            <Logo size="sm" />
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.profileImage || ""} />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {avatarInitials || "JD"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : roleLabel}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 lg:h-20 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">{roleLabel} Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : roleLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              {/* User Menu */}
              <Button variant="ghost" size="icon" asChild>
                <Link to={settingsPath} title="Open profile settings">
                  <Avatar className="h-9 w-9 cursor-pointer" title={displayName}>
                    <AvatarImage src={profile?.profileImage || ""} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                      {avatarInitials || "JD"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          {children || <Outlet />}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border lg:hidden">
          <div className="flex items-center justify-around h-16">
            {mobileNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
