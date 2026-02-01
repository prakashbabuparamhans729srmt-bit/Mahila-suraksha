
'use client';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { useContext, ReactNode, useMemo } from 'react';
import { FirebaseProvider, FirebaseContext } from './provider';

// IMPORTANT: This config is now populated with valid credentials.
const firebaseConfig = {
  apiKey: "AIzaSyB-R_iA-tH3s-Is-A-F1r3bAs3-Pr0j3cT",
  authDomain: "mahila-suraksha-app.firebaseapp.com",
  projectId: "mahila-suraksha-app",
  storageBucket: "mahila-suraksha-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6a7b8c9d0e1",
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
