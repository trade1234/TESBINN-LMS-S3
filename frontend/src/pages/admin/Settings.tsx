import { Link } from "react-router-dom";
import { ArrowLeft, Settings, ShieldCheck, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminSettings = () => (
  <DashboardLayout role="admin">
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Settings</p>
          <h1 className="text-2xl font-semibold">Platform controls</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust permissions, notifications, and security defaults.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-xl border border-border/70 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-semibold">General</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Control platform name, brand colors, and default language for your academy.
          </p>
          <Button variant="outline" size="sm">
            Edit branding
          </Button>
        </div>

        <div className="glass-card rounded-xl border border-border/70 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-success" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Require MFA, rotate API keys, and review audit logs for admin actions.
          </p>
          <Button variant="outline" size="sm">
            Configure security
          </Button>
        </div>

        <div className="glass-card rounded-xl border border-border/70 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-warning" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose what alerts the admin team receives by email, SMS, or Slack.
          </p>
          <Button variant="outline" size="sm">
            Update preferences
          </Button>
        </div>

        <div className="glass-card rounded-xl border border-border/70 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Integrations
          </div>
          <p className="text-sm text-muted-foreground">
            Connect analytics, CRM, or custom webhooks for richer insights.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/analytics">View analytics</Link>
          </Button>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminSettings;
