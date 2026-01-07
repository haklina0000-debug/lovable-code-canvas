import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { NtflyLogo } from "@/components/ui/NtflyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FirebaseWebConfig,
  firebaseWebConfigSchema,
  saveFirebaseConfigToLocalStorage,
} from "@/firebase/config";

const field = (label: string) => z.string().trim().min(1, `${label} مطلوب`);

const setupSchema = z.object({
  apiKey: field("apiKey"),
  authDomain: field("authDomain"),
  projectId: field("projectId"),
  storageBucket: z.string().trim().optional().default(""),
  messagingSenderId: z.string().trim().optional().default(""),
  appId: z.string().trim().optional().default(""),
});

export default function SetupFirebase() {
  const navigate = useNavigate();
  const [raw, setRaw] = useState<FirebaseWebConfig>({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  });
  const [error, setError] = useState<string | null>(null);

  const canSave = useMemo(() => setupSchema.safeParse(raw).success, [raw]);

  const onSave = () => {
    setError(null);
    const parsed = setupSchema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid config");
      return;
    }
    const validated = firebaseWebConfigSchema.parse(parsed.data);
    saveFirebaseConfigToLocalStorage(validated);
    navigate("/auth", { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-orb bg-orb-primary w-96 h-96 -top-20 -right-20" />
        <div className="bg-orb bg-orb-accent w-80 h-80 bottom-20 -left-20" />
      </div>

      <main className="w-full max-w-md px-4 relative z-10">
        <div className="glass-card glow-border p-6">
          <div className="flex justify-center mb-6">
            <NtflyLogo size="lg" />
          </div>

          <h1 className="text-xl font-bold text-center mb-2">إعداد Firebase</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            انسخ إعدادات Web App من Firebase Console → Project settings.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
              {error}
            </div>
          )}

          <section className="space-y-4">
            <div className="space-y-2">
              <Label>apiKey</Label>
              <Input dir="ltr" value={raw.apiKey} onChange={(e) => setRaw({ ...raw, apiKey: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>authDomain</Label>
              <Input dir="ltr" value={raw.authDomain} onChange={(e) => setRaw({ ...raw, authDomain: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>projectId</Label>
              <Input dir="ltr" value={raw.projectId} onChange={(e) => setRaw({ ...raw, projectId: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>storageBucket (optional)</Label>
              <Input dir="ltr" value={raw.storageBucket ?? ""} onChange={(e) => setRaw({ ...raw, storageBucket: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>messagingSenderId (optional)</Label>
              <Input dir="ltr" value={raw.messagingSenderId ?? ""} onChange={(e) => setRaw({ ...raw, messagingSenderId: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>appId (optional)</Label>
              <Input dir="ltr" value={raw.appId ?? ""} onChange={(e) => setRaw({ ...raw, appId: e.target.value })} />
            </div>
          </section>

          <Button className="w-full mt-6" onClick={onSave} disabled={!canSave}>
            حفظ الإعدادات
          </Button>

          <p className="text-xs text-muted-foreground mt-4 leading-5">
            ملاحظة: هذه القيم ليست "سرية" لكنها ضرورية لربط التطبيق بمشروع Firebase.
          </p>
        </div>
      </main>
    </div>
  );
}
