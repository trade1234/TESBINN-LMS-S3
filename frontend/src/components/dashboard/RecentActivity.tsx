import { BookOpen, CheckCircle, PlayCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "enrolled" | "completed" | "lesson" | "achievement";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "lesson",
    title: "Completed Lesson",
    description: "Introduction to React Hooks",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "enrolled",
    title: "New Enrollment",
    description: "Advanced TypeScript Patterns",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "achievement",
    title: "Achievement Unlocked",
    description: "Fast Learner - Complete 5 lessons in a day",
    time: "1 day ago",
  },
  {
    id: "4",
    type: "completed",
    title: "Course Completed",
    description: "JavaScript Fundamentals",
    time: "2 days ago",
  },
  {
    id: "5",
    type: "lesson",
    title: "Completed Lesson",
    description: "CSS Grid Masterclass",
    time: "3 days ago",
  },
];

const iconMap = {
  enrolled: BookOpen,
  completed: CheckCircle,
  lesson: PlayCircle,
  achievement: Award,
};

const colorMap = {
  enrolled: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  lesson: "bg-secondary/10 text-secondary",
  achievement: "bg-warning/10 text-warning",
};

const RecentActivity = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 animate-fade-in",
                index !== activities.length - 1 && "pb-4 border-b border-border"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-2 rounded-lg flex-shrink-0", colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
