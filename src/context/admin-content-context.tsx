
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
    { id: 'user123', email: 'user@example.com', role: 'उपयोगकर्ता', joined: '2024-07-20' },
    { id: 'admin456', email: 'admin@example.com', role: 'एडमिन', joined: '2024-07-15' },
    { id: 'user456', email: 'user456@example.com', role: 'उपयोगकर्ता', joined: '2024-07-24' },
];

const initialPublishedContent: ContentItem[] = [
    { id: 1, title: 'अर्जेंटीना में नया कानून पारित', type: 'अपडेट', user: 'admin456', date: '2024-07-22', status: 'approved', description: 'अर्जेंटीना की कांग्रेस ने उत्पीड़न के खिलाफ कार्यस्थल सुरक्षा का विस्तार करने वाला एक नया विधेयक पारित किया।', photo: null },
    { id: 2, title: 'वैश्विक धन उगाहने वाले की शुरूआत', type: 'अपडेट', user: 'admin456', date: '2024-07-20', status: 'approved', description: 'हमारा वार्षिक वैश्विक धन उगाहने वाला शुरू हो गया है, जिसका लक्ष्य उत्तरजीवी सहायता कार्यक्रमों के लिए $10M जुटाना है।', photo: null },
    { id: 3, title: 'सहमति को समझना', type: 'article', user: 'admin456', date: '2024-07-19', status: 'approved', description: 'स्वस्थ संबंधों की आधारशिला।', url: '/education/consent-article' },
    { id: 4, title: 'स्थानीय सुरक्षा और सहायता केंद्र', type: 'पहल', user: 'admin456', date: '2024-07-18', status: 'approved', description: 'मुफ्त परामर्श और कानूनी सहायता प्रदान करना।', targetAudience: 'सभी', kpi: '1000 लोगों की सहायता' },
];


export const AdminContentProvider = ({ children }: { children: ReactNode }) => {
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([
    { id: 101, title: 'पार्क में असुरक्षित प्रकाश व्यवस्था', type: 'घटना रिपोर्ट', user: 'user123', date: '2024-07-25', status: 'pending' },
    { id: 102, title: 'नया जागरूकता लेख', type: 'article', user: 'user456', date: '2024-07-24', status: 'pending', description: 'डिजिटल सुरक्षा और ऑनलाइन उत्पीड़न से कैसे बचें।' },
  ]);
  
  const [publishedContent, setPublishedContent] = useState<ContentItem[]>(initialPublishedContent);
  const [users, setUsers] = useState<User[]>(initialUsers);

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
      reportedIncidents: pendingContent.filter(c => c.type === 'घटना रिपोर्ट').length,
      activeInitiatives: publishedContent.filter(c => c.type === 'पहल').length + pendingContent.filter(c => c.type === 'पहल').length,
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
