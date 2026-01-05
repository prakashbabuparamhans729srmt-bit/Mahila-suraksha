
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';

export default function ContentPage() {
  const { pendingContent, moderateContent } = useAdminContent();
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    moderateContent(id, 'approved');
    toast({
      title: "स्वीकृत",
      description: "सामग्री को सफलतापूर्वक स्वीकृत किया गया है।",
    });
  };
  
  const handleReject = (id: number) => {
    moderateContent(id, 'rejected');
    toast({
      variant: 'destructive',
      title: "अस्वीकृत",
      description: "सामग्री को अस्वीकृत कर दिया गया है।",
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
              {pendingContent.length > 0 ? pendingContent.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(item.title)}>देखें</Button>
                    <Button variant="default" size="sm" onClick={() => handleApprove(item.id)}>स्वीकार करें</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>अस्वीकार</Button>
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
