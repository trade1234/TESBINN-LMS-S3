import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

const AdminAnalytics = () => {
  const stats = [
    {
      title: "Active learners",
      value: "4,128",
      change: "+12% vs last month",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "primary" as const,
    },
    {
      title: "New enrollments",
      value: "1,042",
      change: "+230 this week",
      changeType: "positive" as const,
      icon: BarChart3,
      iconColor: "secondary" as const,
    },
    {
      title: "Revenue insight",
      value: "$68.4k",
      change: "Tracking in progress",
      changeType: "neutral" as const,
      icon: DollarSign,
      iconColor: "accent" as const,
    },
  ];

  const insights = [
    "Learner time-on-platform is up 8% month over month.",
    "Mobile enrollments now represent 42% of all sign-ups.",
    "Pending approvals are delaying 3 live launches this cycle.",
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 max-w-5xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Analytics</p>
            <h1 className="text-2xl font-semibold">Platform pulse</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Key metrics to keep TESBINN running smoothly.
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((metric) => (
            <StatsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        <div className="glass-card rounded-xl border border-border/70 p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-success" />
              <span>Actionable insights</span>
            </div>
            <p className="text-xs text-muted-foreground">Focus on the metrics that unlock growth.</p>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {insights.map((insight) => (
              <li key={insight} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              Export report
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
