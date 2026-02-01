
'use client';

import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseContext } from '../provider';
import { useGuest } from '@/context/guest-context';
import { useTranslation } from '@/context/language-context';

const guestUserBase = {
  uid: 'guest',
  email: 'guest@example.com',
  photoURL: 'https://picsum.photos/seed/guest/40/40',
  emailVerified: true,
  isAnonymous: true,
  providerData: [],
  // These functions are required by the User type but can be empty for a mock user.
  delete: async () => {},
  getIdToken: async () => 'guest-token',
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
  metadata: {},
  tenantId: null,
  refreshToken: 'guest-refresh-token',
} as User;

export function useUser() {
  const { auth } = useContext(FirebaseContext);
  const { isGuest } = useGuest();
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isGuest) {
      const guestUser = {
        ...guestUserBase,
        displayName: t('Dashboard.guestUser'),
      };
      setUser(guestUser);
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Prevent setting a real user if we've just entered guest mode
      if (!isGuest) {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, isGuest, t]);

  return { user, loading };
}
