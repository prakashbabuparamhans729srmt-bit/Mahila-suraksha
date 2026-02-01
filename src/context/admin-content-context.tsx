
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useTranslation } from './language-context';

export type ContentType = 'incident_report' | 'update' | 'initiative' | 'article' | 'video' | 'quiz' | 'resource';
export type UserRole = 'user' | 'admin' | 'moderator';

export type ContentItem = {
  id: number;
  title: string;
  type: ContentType | string;
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
  role: UserRole;
  joined: string;
};

type AdminContentContextType = {
  pendingContent: ContentItem[];
  publishedContent: ContentItem[];
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
    { id: 'user123', email: 'user@example.com', role: 'user', joined: '2024-07-20' },
    { id: 'admin456', email: 'admin@example.com', role: 'admin', joined: '2024-07-15' },
    { id: 'user456', email: 'user456@example.com', role: 'user', joined: '2024-07-24' },
];


export const AdminContentProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const initialPublishedContent: ContentItem[] = useMemo(() => [
    { id: 1, title: t('AdminContent.published.1.title'), type: 'update', user: 'admin456', date: '2024-07-22', status: 'approved', description: t('AdminContent.published.1.description'), photo: null },
    { id: 2, title: t('AdminContent.published.2.title'), type: 'update', user: 'admin456', date: '2024-07-20', status: 'approved', description: t('AdminContent.published.2.description'), photo: null },
    { id: 3, title: t('AdminContent.published.3.title'), type: 'article', user: 'admin456', date: '2024-07-19', status: 'approved', description: t('AdminContent.published.3.description'), url: '/education/consent-article' },
    { id: 4, title: t('AdminContent.published.4.title'), type: 'initiative', user: 'admin456', date: '2024-07-18', status: 'approved', description: t('AdminContent.published.4.description'), targetAudience: t('AdminContent.published.4.targetAudience'), kpi: t('AdminContent.published.4.kpi') },
  ], [t]);

  const initialPendingContent: ContentItem[] = useMemo(() => [
    { id: 101, title: t('AdminContent.pending.1.title'), type: 'incident_report', user: 'user123', date: '2024-07-25', status: 'pending' },
    { id: 102, title: t('AdminContent.pending.2.title'), type: 'article', user: 'user456', date: '2024-07-24', status: 'pending', description: t('AdminContent.pending.2.description') },
  ], [t]);

  const [pendingContent, setPendingContent] = useState<ContentItem[]>(initialPendingContent);
  const [publishedContent, setPublishedContent] = useState<ContentItem[]>(initialPublishedContent);
  const [users, setUsers] = useState<User[]>(initialUsers);

  // Sync state with translations when language changes
  React.useEffect(() => {
    setPublishedContent(initialPublishedContent);
    setPendingContent(initialPendingContent);
  }, [initialPublishedContent, initialPendingContent]);


  const addContent = (item: Omit<ContentItem, 'id' | 'status' | 'date' | 'user'>) => {
    // For simplicity, we'll assign a random existing user. In a real app, this would be the logged-in user.
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const newItem: ContentItem = {
      ...item,
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      user: randomUser.id,
    };
    
    setPendingContent(prev => [newItem, ...prev]);
  };

  const moderateContent = (id: number, status: 'approved' | 'rejected') => {
    const itemToModerate = pendingContent.find(item => item.id === id);
    if (!itemToModerate) return;

    if (status === 'approved') {
        const approvedItem = { ...itemToModerate, status: 'approved' };
        setPublishedContent(prev => [approvedItem, ...prev]);
    }
    
    // Whether approved or rejected, remove from pending list.
    setPendingContent(prev => prev.filter(item => item.id !== id));
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
      reportedIncidents: pendingContent.filter(c => c.type === 'incident_report').length,
      activeInitiatives: publishedContent.filter(c => c.type === 'initiative').length + pendingContent.filter(c => c.type === 'initiative').length,
      totalContent: pendingContent.length,
  };


  return (
    <AdminContentContext.Provider value={{ 
        pendingContent, publishedContent, addContent, moderateContent, 
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
