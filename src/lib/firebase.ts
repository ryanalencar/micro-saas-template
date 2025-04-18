import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('Environment variable FIREBASE_PRIVATE_KEY is required');
}

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
});

if (!getApps().length) {
  initializeApp({ credential: firebaseCert });
}

export const db = getFirestore();
