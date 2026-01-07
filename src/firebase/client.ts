import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getFirebaseConfig } from "./config";

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super("Firebase is not configured");
    this.name = "FirebaseNotConfiguredError";
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export function ensureFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
} {
  const cfg = getFirebaseConfig();
  if (!cfg) throw new FirebaseNotConfiguredError();

  if (!app) {
    app = getApps().length ? getApp() : initializeApp(cfg);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }

  return { app: app!, auth: auth!, db: db!, storage: storage! };
}

export function getFirebaseAuth(): Auth {
  return ensureFirebase().auth;
}

export function getFirestoreDb(): Firestore {
  return ensureFirebase().db;
}

export function getFirebaseStorage(): FirebaseStorage {
  return ensureFirebase().storage;
}
