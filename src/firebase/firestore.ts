import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { ADMIN_CONFIG } from "@/lib/constants";
import { getFirestoreDb } from "./client";

export type AppRole = "admin" | "user";
export type ProviderLabel = "google" | "github" | "email" | "unknown";

export interface UserDoc {
  uid: string;
  email: string;
  provider: ProviderLabel;
  role: AppRole;
  createdAt: Timestamp;
  displayName?: string;
  photoURL?: string;
}

function mapProviderIdToLabel(providerId?: string | null): ProviderLabel {
  if (!providerId) return "unknown";
  if (providerId === "google.com") return "google";
  if (providerId === "github.com") return "github";
  if (providerId === "password") return "email";
  return "unknown";
}

export function computeRoleFromUser(user: User): AppRole {
  const email = user.email?.toLowerCase() ?? "";
  if (email === ADMIN_CONFIG.immutableAdminEmail.toLowerCase()) return "admin";
  return "user";
}

export async function ensureUserDocument(user: User): Promise<UserDoc> {
  const db = getFirestoreDb();
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  const providerId = user.providerData?.[0]?.providerId ?? null;
  const provider = mapProviderIdToLabel(providerId);
  const role = computeRoleFromUser(user);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email ?? "",
      provider,
      role,
      displayName: user.displayName ?? "",
      photoURL: user.photoURL ?? "",
      createdAt: serverTimestamp(),
    });
  } else {
    // Keep createdAt as-is; ensure email/provider fields stay updated.
    const current = snap.data() as Partial<UserDoc>;
    const updates: Record<string, unknown> = {};

    if ((current.email ?? "") !== (user.email ?? "")) updates.email = user.email ?? "";
    if ((current.provider ?? "unknown") !== provider) updates.provider = provider;
    if ((current.displayName ?? "") !== (user.displayName ?? "")) updates.displayName = user.displayName ?? "";
    if ((current.photoURL ?? "") !== (user.photoURL ?? "")) updates.photoURL = user.photoURL ?? "";

    // Only ever elevate to admin for the immutable admin email.
    if ((current.role ?? "user") !== role) updates.role = role;

    if (Object.keys(updates).length) await updateDoc(ref, updates);
  }

  const after = await getDoc(ref);
  return after.data() as UserDoc;
}

export async function writeLoginLog(params: {
  uid: string;
  email: string;
  role: AppRole;
  provider: ProviderLabel;
}) {
  const db = getFirestoreDb();
  await addDoc(collection(db, "login_logs"), {
    uid: params.uid,
    email: params.email,
    role: params.role,
    provider: params.provider,
    timestamp: serverTimestamp(),
  });
}

export async function createProject(params: {
  ownerId: string;
  name: string;
}) {
  const db = getFirestoreDb();
  const res = await addDoc(collection(db, "projects"), {
    ownerId: params.ownerId,
    name: params.name,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return res.id;
}
