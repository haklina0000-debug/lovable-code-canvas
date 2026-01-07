import { useState } from "react";
import {
  BarChart3,
  Users,
  FolderOpen,
  MessageSquare,
  Sparkles,
  Flame,
  Clock,
  Shield,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ADMIN_CONFIG } from "@/lib/constants";

type TabId =
  | "overview"
  | "users"
  | "projects"
  | "feedback"
  | "ai"
  | "firebase"
  | "logs";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "overview", label: "نظرة عامة", icon: BarChart3 },
  { id: "users", label: "المستخدمين", icon: Users },
  { id: "projects", label: "المشاريع", icon: FolderOpen },
  { id: "feedback", label: "الآراء والاقتراحات", icon: MessageSquare },
  { id: "ai", label: "إعدادات AI", icon: Sparkles },
  { id: "firebase", label: "إعدادات Firebase", icon: Flame },
  { id: "logs", label: "سجل الدخول", icon: Clock },
];

// Mock login logs
const mockLogs = [
  {
    id: 1,
    email: ADMIN_CONFIG.immutableAdminEmail,
    date: "2026/1/7",
    time: "4:14:12 م",
    page: "صفحة الأدمن",
  },
  {
    id: 2,
    email: ADMIN_CONFIG.immutableAdminEmail,
    date: "2026/1/7",
    time: "4:22:27 م",
    page: "صفحة الأدمن",
  },
  {
    id: 3,
    email: ADMIN_CONFIG.immutableAdminEmail,
    date: "2026/1/7",
    time: "5:00:20 م",
    page: "صفحة الأدمن",
  },
  {
    id: 4,
    email: ADMIN_CONFIG.immutableAdminEmail,
    date: "2026/1/7",
    time: "5:03:15 م",
    page: "صفحة الأدمن",
  },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("logs");

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">المشاريع</h3>
            <p className="text-muted-foreground">قائمة جميع المشاريع...</p>
          </div>
        );

      case "feedback":
        return (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">الآراء والاقتراحات</h3>
            <p className="text-muted-foreground">آراء واقتراحات المستخدمين...</p>
          </div>
        );

      case "logs":
        return (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">سجل الدخول</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockLogs.length} سجل دخول
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-muted-foreground"
              >
                <Trash2 className="w-4 h-4" />
                مسح السجل
              </Button>
            </div>

            <div className="space-y-3">
              {mockLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{log.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.time} {log.date}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-warning/20 text-warning border border-warning/30">
                    {log.page}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h3>
            <p className="text-muted-foreground">محتوى القسم قيد التطوير...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Admin Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>
              <p className="text-sm text-muted-foreground">
                {ADMIN_CONFIG.immutableAdminEmail}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">{renderTabContent()}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
