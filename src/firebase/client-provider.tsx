
'use client';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { FirebaseProvider, FirebaseContextType } from './provider';

// This is a mock config, replace it with your actual Firebase config.
// IMPORTANT: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIza-...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseContextValue = useMemo(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    if (process.env.NEXT_PUBLIC_USE_EMULATORS) {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    
    return {
      app,
      auth,
      firestore,
    };
  }, []);

  return (
    <FirebaseProvider
      app={firebaseContextValue.app}
      auth={firebaseContextValue.auth}
      firestore={firebaseContextValue.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};
