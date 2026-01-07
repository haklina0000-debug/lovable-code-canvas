import { Link } from "react-router-dom";
import {
  Plus,
  FolderOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpLeft,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/StatCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { QuickAction } from "@/components/ui/QuickAction";

// Mock data for projects
const recentProjects = [
  { id: 1, name: "موقع شركة التقنية", date: "2024-01-05", status: "completed" as const },
  { id: 2, name: "متجر إلكتروني", date: "2024-01-04", status: "inProgress" as const },
  { id: 3, name: "صفحة هبوط", date: "2024-01-03", status: "pending" as const },
];

const stats = {
  total: 3,
  completed: 1,
  inProgress: 1,
  pending: 1,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              مرحباً، مستخدم Google 👋
            </h1>
            <p className="text-muted-foreground">لوحة التحكم</p>
          </div>

          {/* New Project Button */}
          <div className="mb-8 flex justify-end animate-fade-in">
            <Link to="/project/new">
              <Button className="bg-gradient-to-l from-primary to-blue-500 hover:opacity-90 gap-2">
                <Plus className="w-4 h-4" />
                مشروع جديد
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={CheckCircle}
              value={stats.completed}
              label="مكتملة"
              variant="success"
              className="animate-fade-in"
            />
            <StatCard
              icon={FolderOpen}
              value={stats.total}
              label="إجمالي المشاريع"
              className="animate-fade-in"
            />
            <StatCard
              icon={AlertCircle}
              value={stats.pending}
              label="معلقة"
              variant="pending"
              className="animate-fade-in"
            />
            <StatCard
              icon={Clock}
              value={stats.inProgress}
              label="قيد التنفيذ"
              variant="warning"
              className="animate-fade-in"
            />
          </div>

          {/* Recent Projects */}
          <div className="glass-card glow-border p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">المشاريع الأخيرة</h2>
              <Link
                to="/projects"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                مشاريعي
                <ArrowUpLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  date={project.date}
                  status={project.status}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card glow-border p-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-6 text-center">إجراءات سريعة</h2>
            <div className="space-y-3">
              <QuickAction
                icon={Plus}
                label="موقع جديد"
                variant="primary"
                onClick={() => {}}
              />
              <QuickAction
                icon={FolderOpen}
                label="عرض القوالب"
                onClick={() => {}}
              />
              <QuickAction
                icon={Sparkles}
                label="مساعد الذكاء الاصطناعي"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
