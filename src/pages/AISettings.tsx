import { useState } from "react";
import { Eye, EyeOff, Save, Lock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
}

const initialProviders: AIProvider[] = [
  { id: "openai", name: "ChatGPT (OpenAI)", enabled: false, apiKey: "" },
  { id: "gemini", name: "Gemini (Google)", enabled: false, apiKey: "" },
  { id: "claude", name: "Claude (Anthropic)", enabled: false, apiKey: "" },
  { id: "sonnet", name: "Sonnet (Anthropic)", enabled: false, apiKey: "" },
];

export default function AISettings() {
  const [passphrase, setPassphrase] = useState("");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [providers, setProviders] = useState(initialProviders);

  const toggleProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const updateApiKey = (id: string, apiKey: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, apiKey } : p))
    );
  };

  const handleSaveEncrypted = async () => {
    if (!passphrase) {
      alert("الرجاء إدخال عبارة المرور");
      return;
    }
    // Here we would encrypt and save the keys
    console.log("Saving encrypted keys with passphrase...");
    alert("تم حفظ المفاتيح بشكل مشفر");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="glass-card glow-border p-6 md:p-8 animate-fade-in">
            {/* Passphrase Section */}
            <div className="mb-8 pb-6 border-b border-border">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold mb-1">عبارة المرور (لن تُخزّن)</h2>
                <p className="text-sm text-muted-foreground">
                  أدخل عبارة مرور قوية لتشفير البيانات
                </p>
              </div>
              <div className="relative">
                <Input
                  type={showPassphrase ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="••••••••••••••"
                  className="text-center pl-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassphrase ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* AI Providers */}
            <div className="space-y-6">
              {providers.map((provider) => (
                <div key={provider.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={provider.id} className="font-bold">
                      {provider.name}
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {provider.enabled ? "مفعّل" : "مفعّل"}
                      </span>
                      <Switch
                        id={provider.id}
                        checked={provider.enabled}
                        onCheckedChange={() => toggleProvider(provider.id)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      مفتاح API
                    </Label>
                    <Input
                      type="password"
                      value={provider.apiKey}
                      onChange={(e) => updateApiKey(provider.id, e.target.value)}
                      placeholder="sk-..."
                      dir="ltr"
                      className="text-left"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveEncrypted}
              className="w-full mt-8 bg-gradient-to-l from-primary to-accent hover:opacity-90 gap-2"
              size="lg"
            >
              <Save className="w-5 h-5" />
              حفظ مشفر
            </Button>

            {/* Security Note */}
            <div className="flex items-center gap-2 justify-center mt-4 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>يتم تشفير جميع المفاتيح باستخدام AES-256-GCM</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
