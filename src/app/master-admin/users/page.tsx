
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function UsersPage() {
  const { toast } = useToast();
  
  const handleEdit = (userId: string) => {
    toast({
      title: 'उपयोगकर्ता संपादित करें',
      description: `आप उपयोगकर्ता ${userId} को संपादित कर रहे हैं। यह सुविधा जल्द ही आएगी।`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">उपयोगकर्ता प्रबंधित करें</h1>
      <Card>
        <CardHeader>
          <CardTitle>सभी उपयोगकर्ता</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>उपयोगकर्ता आईडी</TableHead>
                <TableHead>ईमेल</TableHead>
                <TableHead>भूमिका</TableHead>
                <TableHead>शामिल हुए</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>user123</TableCell>
                <TableCell>user@example.com</TableCell>
                <TableCell>उपयोगकर्ता</TableCell>
                <TableCell>2024-07-20</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit('user123')}>संपादित करें</Button>
                </TableCell>
              </TableRow>
               <TableRow>
                <TableCell>admin456</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>एडमिन</TableCell>
                <TableCell>2024-07-15</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit('admin456')}>संपादित करें</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
