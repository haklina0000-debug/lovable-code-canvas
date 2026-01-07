import { Link } from "react-router-dom";
import { ArrowLeft, Play, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { STATS, APP_CONFIG } from "@/lib/constants";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="bg-orb bg-orb-primary w-96 h-96 -top-20 -right-20" />
            <div className="bg-orb bg-orb-accent w-80 h-80 top-1/3 -left-20" />
            <div className="bg-orb bg-orb-primary w-64 h-64 bottom-20 right-1/4 opacity-20" />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">
                  منصة الذكاء الاصطناعي #1
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                أنشئ موقعك الاحترافي
                <br />
                <span className="text-gradient">بالذكاء الاصطناعي</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
                حوّل أفكارك إلى مواقع ويب مذهلة في دقائق. لا تحتاج لخبرة برمجية -
                فقط صف ما تريد ودع الذكاء الاصطناعي يفعل الباقي.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
                <Link to="/auth">
                  <Button
                    size="lg"
                    className="bg-gradient-to-l from-primary to-blue-500 hover:opacity-90 text-primary-foreground px-8 gap-2"
                  >
                    ابدأ مجاناً
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Play className="w-4 h-4" />
                  شاهد العرض
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {STATS.totalSites}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    موقع تم إنشاؤه
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {STATS.activeUsers}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    مستخدم نشط
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary flex items-center justify-center gap-1">
                    {STATS.userRating}
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    تقييم المستخدمين
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Preview Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="glass-card glow-border p-8 md:p-12 max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                معاينة منشئ المواقع
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                جرب قوة الذكاء الاصطناعي في إنشاء مواقع ويب احترافية. صف موقعك
                وسنقوم بتحويله إلى واقع.
              </p>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-l from-primary to-blue-500 hover:opacity-90"
                >
                  جرب الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
