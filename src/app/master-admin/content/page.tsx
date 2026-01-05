
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const initialContent = [
  { id: 1, title: 'पार्क में असुरक्षित प्रकाश व्यवस्था', type: 'घटना रिपोर्ट', user: 'user123', date: '2024-07-25', status: 'pending' },
  { id: 2, title: 'नया जागरूकता लेख', type: 'लेख', user: 'user456', date: '2024-07-24', status: 'pending' },
];

export default function ContentPage() {
  const [contentItems, setContentItems] = useState(initialContent);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setContentItems(contentItems.filter(item => item.id !== id));
    toast({
      title: "स्वीकृत",
      description: "सामग्री को सफलतापूर्वक स्वीकृत किया गया है।",
    });
  };

  const handleView = (title: string) => {
    toast({
      title: "देखा जा रहा है...",
      description: `आप "${title}" देख रहे हैं।`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">सामग्री मॉडरेशन</h1>
      <Card>
        <CardHeader>
          <CardTitle>लंबित सामग्री</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>शीर्षक</TableHead>
                <TableHead>प्रकार</TableHead>
                <TableHead>उपयोगकर्ता</TableHead>
                <TableHead>तिथि</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.length > 0 ? contentItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleView(item.title)}>देखें</Button>
                    <Button variant="default" size="sm" onClick={() => handleApprove(item.id)}>स्वीकार करें</Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center">कोई लंबित सामग्री नहीं है।</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
