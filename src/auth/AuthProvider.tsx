import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { ensureFirebase, FirebaseNotConfiguredError } from "@/firebase/client";
import {
  ProviderLabel,
  UserDoc,
  computeRoleFromUser,
  ensureUserDocument,
  writeLoginLog,
} from "@/firebase/firestore";
import { isFirebaseConfigured } from "@/firebase/config";
import { useIsMobile } from "@/hooks/use-mobile";

type AuthAction = { provider: ProviderLabel; startedAt: number } | null;

export interface AuthContextValue {
  firebaseReady: boolean;
  user: User | null;
  userDoc: UserDoc | null;
  role: "admin" | "user" | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signInGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_ACTION_KEY = "ntfly_auth_action_v1";

function setAuthAction(action: Exclude<AuthAction, null>) {
  sessionStorage.setItem(AUTH_ACTION_KEY, JSON.stringify(action));
}

function popAuthAction(): AuthAction {
  try {
    const raw = sessionStorage.getItem(AUTH_ACTION_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(AUTH_ACTION_KEY);
    const parsed = JSON.parse(raw);
    if (!parsed?.provider || !parsed?.startedAt) return null;
    return parsed as AuthAction;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [firebaseReady, setFirebaseReady] = useState<boolean>(isFirebaseConfigured());
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subscriptionRef = useRef<(() => void) | null>(null);

  const refreshFirebaseReady = useCallback(() => {
    setFirebaseReady(isFirebaseConfigured());
  }, []);

  useEffect(() => {
    refreshFirebaseReady();

    if (!isFirebaseConfigured()) {
      setLoading(false);
      setUser(null);
      setUserDoc(null);
      return;
    }

    try {
      const { auth } = ensureFirebase();
      subscriptionRef.current?.();
      const unsub = onAuthStateChanged(auth, async (u) => {
        setUser(u);
        setError(null);

        if (!u) {
          setUserDoc(null);
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          const doc = await ensureUserDocument(u);
          setUserDoc(doc);

          const action = popAuthAction();
          if (action && Date.now() - action.startedAt < 2 * 60 * 1000) {
            await writeLoginLog({
              uid: u.uid,
              email: u.email ?? "",
              role: computeRoleFromUser(u),
              provider: action.provider,
            });
          }
        } catch (e: any) {
          setError(e?.message ?? "Auth error");
        } finally {
          setLoading(false);
        }
      });

      subscriptionRef.current = () => unsub();
      return () => unsub();
    } catch (e) {
      setLoading(false);
      if (e instanceof FirebaseNotConfiguredError) {
        setFirebaseReady(false);
      }
    }
  }, [refreshFirebaseReady]);

  const api = useMemo<AuthContextValue>(() => {
    const role = user ? computeRoleFromUser(user) : null;
    const isAdmin = role === "admin";

    const signUpEmailFn = async (email: string, password: string) => {
      setError(null);
      const { auth } = ensureFirebase();
      setAuthAction({ provider: "email", startedAt: Date.now() });
      await createUserWithEmailAndPassword(auth, email, password);
    };

    const signInEmailFn = async (email: string, password: string) => {
      setError(null);
      const { auth } = ensureFirebase();
      setAuthAction({ provider: "email", startedAt: Date.now() });
      await signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogleFn = async () => {
      setError(null);
      const { auth } = ensureFirebase();
      const provider = new GoogleAuthProvider();
      setAuthAction({ provider: "google", startedAt: Date.now() });

      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch {
          await signInWithRedirect(auth, provider);
        }
      }
    };

    const signInGithubFn = async () => {
      setError(null);
      const { auth } = ensureFirebase();
      const provider = new GithubAuthProvider();
      setAuthAction({ provider: "github", startedAt: Date.now() });

      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch {
          await signInWithRedirect(auth, provider);
        }
      }
    };

    const signOutFn = async () => {
      setError(null);
      const { auth } = ensureFirebase();
      await signOut(auth);
    };

    return {
      firebaseReady,
      user,
      userDoc,
      role,
      isAdmin,
      loading,
      error,
      signUpEmail: signUpEmailFn,
      signInEmail: signInEmailFn,
      signInGoogle: signInGoogleFn,
      signInGithub: signInGithubFn,
      signOut: signOutFn,
    };
  }, [firebaseReady, user, userDoc, loading, error, isMobile]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}
