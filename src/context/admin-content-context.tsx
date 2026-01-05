
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ContentItem = {
  id: number;
  title: string;
  type: string;
  user: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  url?: string;
  photo?: File | null;
  targetAudience?: string;
  kpi?: string;
  location?: string;
};

type AdminContentContextType = {
  pendingContent: ContentItem[];
  addContent: (item: Omit<ContentItem, 'id' | 'status' | 'date' | 'user'>) => void;
  moderateContent: (id: number, status: 'approved' | 'rejected') => void;
};

const AdminContentContext = createContext<AdminContentContextType | undefined>(undefined);

export const AdminContentProvider = ({ children }: { children: ReactNode }) => {
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([
    { id: 1, title: 'पार्क में असुरक्षित प्रकाश व्यवस्था', type: 'घटना रिपोर्ट', user: 'user123', date: '2024-07-25', status: 'pending' },
    { id: 2, title: 'नया जागरूकता लेख', type: 'लेख', user: 'user456', date: '2024-07-24', status: 'pending' },
  ]);

  const addContent = (item: Omit<ContentItem, 'id' | 'status' | 'date' | 'user'>) => {
    const newItem: ContentItem = {
      ...item,
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      user: `user${Math.floor(Math.random() * 1000)}`,
    };
    setPendingContent(prev => [newItem, ...prev]);
  };

  const moderateContent = (id: number, status: 'approved' | 'rejected') => {
    if (status === 'approved' || status === 'rejected') {
        // For now, we just remove it from the pending list.
        // In a real app, you might move it to another list.
        setPendingContent(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <AdminContentContext.Provider value={{ pendingContent, addContent, moderateContent }}>
      {children}
    </AdminContentContext.Provider>
  );
};

export const useAdminContent = () => {
  const context = useContext(AdminContentContext);
  if (context === undefined) {
    throw new Error('useAdminContent must be used within an AdminContentProvider');
  }
  return context;
};
