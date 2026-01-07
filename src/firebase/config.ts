import { z } from "zod";

export const firebaseWebConfigSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().optional().default(""),
  messagingSenderId: z.string().optional().default(""),
  appId: z.string().optional().default(""),
});

export type FirebaseWebConfig = z.infer<typeof firebaseWebConfigSchema>;

const LS_KEY = "ntfly_firebase_web_config_v1";

export function getFirebaseConfigFromEnv(): Partial<FirebaseWebConfig> {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  };
}

export function getFirebaseConfigFromLocalStorage(): FirebaseWebConfig | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const res = firebaseWebConfigSchema.safeParse(parsed);
    if (!res.success) return null;
    return res.data;
  } catch {
    return null;
  }
}

export function saveFirebaseConfigToLocalStorage(cfg: FirebaseWebConfig) {
  localStorage.setItem(LS_KEY, JSON.stringify(cfg));
}

export function clearFirebaseConfigFromLocalStorage() {
  localStorage.removeItem(LS_KEY);
}

export function getFirebaseConfig(): FirebaseWebConfig | null {
  const env = getFirebaseConfigFromEnv();
  const envRes = firebaseWebConfigSchema.safeParse(env);
  if (envRes.success) return envRes.data;

  return getFirebaseConfigFromLocalStorage();
}

export function isFirebaseConfigured(): boolean {
  return !!getFirebaseConfig();
}
