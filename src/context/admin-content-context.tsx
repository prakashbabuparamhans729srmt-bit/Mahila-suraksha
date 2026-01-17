
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

export type User = {
  id: string;
  email: string;
  role: 'उपयोगकर्ता' | 'एडमिन' | 'मॉडरेटर';
  joined: string;
};

type AdminContentContextType = {
  pendingContent: ContentItem[];
  addContent: (item: Omit<ContentItem, 'id' | 'status' | 'date' | 'user'>) => void;
  moderateContent: (id: number, status: 'approved' | 'rejected') => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'joined'>) => void;
  deleteUser: (userId: string) => void;
  stats: {
    totalUsers: number;
    reportedIncidents: number;
    activeInitiatives: number;
    totalContent: number;
  };
};

const AdminContentContext = createContext<AdminContentContextType | undefined>(undefined);

const initialUsers: User[] = [
    { id: 'user123', email: 'user@example.com', role: 'उपयोगकर्ता', joined: '2024-07-20' },
    { id: 'admin456', email: 'admin@example.com', role: 'एडमिन', joined: '2024-07-15' },
    { id: 'user456', email: 'user456@example.com', role: 'उपयोगकर्ता', joined: '2024-07-24' },
];

export const AdminContentProvider = ({ children }: { children: ReactNode }) => {
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([
    { id: 1, title: 'पार्क में असुरक्षित प्रकाश व्यवस्था', type: 'घटना रिपोर्ट', user: 'user123', date: '2024-07-25', status: 'pending' },
    { id: 2, title: 'नया जागरूकता लेख', type: 'लेख', user: 'user456', date: '2024-07-24', status: 'pending' },
  ]);
  
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addContent = (item: Omit<ContentItem, 'id' | 'status' | 'date' | 'user'>) => {
    const newUserEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
    const newUser: User = {
        id: `user${Date.now()}`,
        email: newUserEmail,
        role: 'उपयोगकर्ता',
        joined: new Date().toISOString().split('T')[0],
    };

    const newItem: ContentItem = {
      ...item,
      id: Date.now(),
      status: 'pending',
      date: newUser.joined,
      user: newUser.id,
    };
    
    setUsers(prev => [newUser, ...prev]);
    setPendingContent(prev => [newItem, ...prev]);
  };

  const moderateContent = (id: number, status: 'approved' | 'rejected') => {
    if (status === 'approved' || status === 'rejected') {
        // For now, we just remove it from the pending list.
        // In a real app, you might move it to another list.
        setPendingContent(prev => prev.filter(item => item.id !== id));
    }
  };

  const addUser = (user: Omit<User, 'id' | 'joined'>) => {
    const newUser: User = {
        ...user,
        id: `user${Date.now()}`,
        joined: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };
  
  const stats = {
      totalUsers: users.length,
      reportedIncidents: pendingContent.filter(c => c.type === 'घटना रिपोर्ट').length,
      activeInitiatives: pendingContent.filter(c => c.type === 'पहल').length,
      totalContent: pendingContent.length,
  };


  return (
    <AdminContentContext.Provider value={{ 
        pendingContent, addContent, moderateContent, 
        users, addUser, deleteUser, stats
    }}>
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
